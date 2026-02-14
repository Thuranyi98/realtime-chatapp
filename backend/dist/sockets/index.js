"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSocketHandlers = void 0;
const jwt_1 = require("../utils/jwt");
const userRepository_1 = require("../repositories/userRepository");
const messageService_1 = require("../services/messageService");
const connectedUsers = new Map();
const activeRoomBySocket = new Map();
const roomViewers = new Map();
const getPresenceList = () => {
    return Array.from(connectedUsers.entries()).map(([userId, count]) => ({
        userId,
        status: count > 0 ? "connected" : "disconnected",
    }));
};
const notifyPresenceAll = (io) => {
    io.emit("presence_update", getPresenceList());
};
const authenticateSocket = async (socket) => {
    const tokenFromAuth = socket.handshake.auth?.token;
    const authHeader = socket.handshake.headers.authorization;
    const tokenFromHeader = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : undefined;
    const token = tokenFromAuth || tokenFromHeader;
    if (!token) {
        throw new Error("Unauthorized");
    }
    const decoded = (0, jwt_1.verifyToken)(token);
    const userId = decoded.id;
    if (!userId) {
        throw new Error("Unauthorized");
    }
    const user = await (0, userRepository_1.findUserById)(userId);
    if (!user) {
        throw new Error("Unauthorized");
    }
    socket.data.user = { id: user.id, role: user.role };
};
const registerSocketHandlers = (io) => {
    io.use(async (socket, next) => {
        try {
            await authenticateSocket(socket);
            next();
        }
        catch (err) {
            next(err);
        }
    });
    io.on("connection", (socket) => {
        const userId = socket.data.user?.id;
        const role = socket.data.user?.role;
        let joinedRoomChannel = null;
        socket.join(`user:${userId}`);
        socket.join(`role:${role}`);
        connectedUsers.set(userId, (connectedUsers.get(userId) || 0) + 1);
        notifyPresenceAll(io);
        socket.emit("presence_update", getPresenceList());
        socket.on("room_active", (payload) => {
            const roomId = payload?.roomId;
            if (!roomId)
                return;
            const previousRoomId = activeRoomBySocket.get(socket.id);
            if (previousRoomId) {
                const previousViewers = roomViewers.get(previousRoomId);
                previousViewers?.delete(userId);
                if (previousViewers && previousViewers.size === 0) {
                    roomViewers.delete(previousRoomId);
                }
            }
            if (joinedRoomChannel) {
                socket.leave(joinedRoomChannel);
            }
            activeRoomBySocket.set(socket.id, roomId);
            const viewers = roomViewers.get(roomId) ?? new Set();
            viewers.add(userId);
            roomViewers.set(roomId, viewers);
            joinedRoomChannel = `room:${roomId}`;
            socket.join(joinedRoomChannel);
            socket.to(joinedRoomChannel).emit("room_seen", { roomId, viewerId: userId });
        });
        socket.on("sendMessage", async (payload, ack) => {
            try {
                const { content, receiverId, roomId } = payload || {};
                if (!content || !receiverId || !roomId) {
                    throw new Error("content, receiverId, and roomId are required");
                }
                const message = await (0, messageService_1.sendMessage)({
                    content,
                    senderId: userId,
                    receiverId,
                    roomId,
                });
                io.to(`user:${receiverId}`).emit("message", message);
                io.to(`user:${userId}`).emit("message", message);
                const receiverViewingRoom = roomViewers.get(roomId)?.has(receiverId) ?? false;
                if (receiverViewingRoom) {
                    io.to(`user:${userId}`).emit("message_status", {
                        messageId: message.id,
                        roomId,
                        status: "delivered",
                    });
                }
                if (typeof ack === "function") {
                    ack({ status: "ok", message, delivered: receiverViewingRoom });
                }
            }
            catch (err) {
                if (typeof ack === "function") {
                    ack({ status: "error", error: err.message });
                }
            }
        });
        socket.on("typing", (payload) => {
            const { receiverId, roomId, isTyping } = payload || {};
            if (!receiverId || !roomId)
                return;
            io.to(`user:${receiverId}`).emit("typing", {
                senderId: userId,
                roomId,
                isTyping: Boolean(isTyping),
            });
        });
        socket.on("disconnect", (reason) => {
            const activeRoomId = activeRoomBySocket.get(socket.id);
            if (activeRoomId) {
                const viewers = roomViewers.get(activeRoomId);
                viewers?.delete(userId);
                if (viewers && viewers.size === 0) {
                    roomViewers.delete(activeRoomId);
                }
                activeRoomBySocket.delete(socket.id);
            }
            const current = connectedUsers.get(userId) || 0;
            if (current <= 1) {
                connectedUsers.delete(userId);
            }
            else {
                connectedUsers.set(userId, current - 1);
            }
            notifyPresenceAll(io);
            socket.emit("connection_status", { status: "disconnected", reason });
        });
    });
};
exports.registerSocketHandlers = registerSocketHandlers;
