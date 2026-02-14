"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getAdminsApi, getUsersApi } from "../../api/users";
import { createRoomApi } from "../../api/rooms";
import { getMessagesHistoryApi } from "../../api/messages";
import { connectSocket, disconnectSocket } from "../socket";
import { logout } from "../auth";
import type { ChatMessage, Message, Presence, Role, User } from "../types/chat";

type Status = "connected" | "reconnecting" | "disconnected";

export function useChatPage() {
  const router = useRouter();
  const token = useMemo(() => (typeof window === "undefined" ? null : localStorage.getItem("token")), []);
  const scrollRef = useRef<HTMLDivElement>(null);
  const roomIdRef = useRef<string>();
  const userIdRef = useRef<string | null>(null);
  const sendAudioRef = useRef<HTMLAudioElement | null>(null);

  const [status, setStatus] = useState<Status>("disconnected");
  const [users, setUsers] = useState<User[]>([]);
  const [admins, setAdmins] = useState<User[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [presence, setPresence] = useState<Presence[]>([]);
  const [input, setInput] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string>();
  const [roomId, setRoomId] = useState<string>();
  const [role, setRole] = useState<Role | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [typingUserId, setTypingUserId] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);

  roomIdRef.current = roomId;
  userIdRef.current = userId;

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
    setRole(localStorage.getItem("role") as Role | null);
    setUserId(localStorage.getItem("userId"));
  }, [router, token]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const audio = new Audio("/sounds/post_success.mp3");
    audio.preload = "auto";
    sendAudioRef.current = audio;
    return () => {
      sendAudioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!token) return;
    const socket = connectSocket(token);
    socket.on("connect", () => setStatus("connected"));
    socket.on("connect_error", (err) => {
      if (err.message?.toLowerCase().includes("unauthorized")) {
        logout();
      }
    });
    socket.on("disconnect", () => setStatus("disconnected"));
    socket.io.on("reconnect_attempt", () => setStatus("reconnecting"));
    socket.io.on("reconnect", () => setStatus("connected"));
    socket.on("presence_update", (list: Presence[]) => setPresence(list));
    socket.on("typing", (p: { senderId: string; roomId: string; isTyping: boolean }) => {
      if (p.roomId !== roomIdRef.current || p.senderId === userIdRef.current) return;
      setTypingUserId(p.isTyping ? p.senderId : null);
    });
    socket.on("message", (msg: Message) => onSocketMessage(msg));
    socket.on("room_seen", (payload: { roomId: string; viewerId: string }) => {
      if (payload.roomId !== roomIdRef.current || payload.viewerId === userIdRef.current) return;
      setMessages((prev) =>
        prev.map((item) =>
          item.roomId === payload.roomId && item.senderId === userIdRef.current ? { ...item, deliveryStatus: "delivered" } : item
        )
      );
    });
    socket.on("message_status", (payload: { messageId: string; roomId: string; status: "delivered" }) => {
      if (payload.roomId !== roomIdRef.current) return;
      if (payload.status !== "delivered") return;
      setMessages((prev) => prev.map((item) => (item.id === payload.messageId ? { ...item, deliveryStatus: "delivered" } : item)));
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("disconnect");
      socket.off("presence_update");
      socket.off("typing");
      socket.off("message");
      socket.off("room_seen");
      socket.off("message_status");
      socket.io.off("reconnect_attempt");
      socket.io.off("reconnect");
      disconnectSocket();
    };
  }, [token]);

  const onSocketMessage = (msg: Message) => {
    if (msg.roomId !== roomIdRef.current) return;

    setMessages((prev) => {
      const own = msg.senderId === userIdRef.current;
      const byId = prev.findIndex((item) => item.id === msg.id);
      if (byId >= 0) {
        const next = [...prev];
        next[byId] = { ...next[byId], ...msg, deliveryStatus: own ? next[byId].deliveryStatus ?? "sent" : undefined };
        return next;
      }

      if (own) {
        const optimisticIndex = prev.findIndex(
          (item) => item.optimistic && item.content === msg.content && item.receiverId === msg.receiverId
        );
        if (optimisticIndex >= 0) {
          const next = [...prev];
          next[optimisticIndex] = { ...msg, deliveryStatus: "sent" };
          return next;
        }
      }

      return [...prev, own ? { ...msg, deliveryStatus: "sent" } : msg];
    });
  };

  useEffect(() => {
    if (!token || !role) return;
    const run = async () => {
      if (role === "ADMIN") {
        const res = await getUsersApi(token);
        setUsers(res.data || []);
      } else {
        const res = await getAdminsApi(token);
        const list = res.data || [];
        setAdmins(list);
        if (!selectedUserId && list.length > 0) setSelectedUserId(list[0].id);
      }
    };
    void run();
  }, [role, token, selectedUserId]);

  useEffect(() => {
    if (!token || !userId || !selectedUserId) return;
    const run = async () => {
      const payload = role === "ADMIN" ? { userId: selectedUserId, adminId: userId } : { userId, adminId: selectedUserId };
      const res = await createRoomApi(token, payload);
      setRoomId(res.data.id);
      setTypingUserId(null);
      setMessages([]);
      setIsHistoryLoading(true);
    };
    void run();
  }, [role, selectedUserId, token, userId]);

  useEffect(() => {
    if (!token || !roomId) return;
    const run = async () => {
      const startedAt = Date.now();
      setIsHistoryLoading(true);
      try {
        const res = await getMessagesHistoryApi(token, roomId, 50);
        const list: ChatMessage[] = (res.data || []).slice().reverse().map((item) => {
          const deliveryStatus: ChatMessage["deliveryStatus"] =
            item.senderId === userIdRef.current ? "sent" : undefined;
          return { ...item, deliveryStatus };
        });
        setMessages(list);
      } finally {
        const elapsed = Date.now() - startedAt;
        const remaining = Math.max(0, 1000 - elapsed);
        if (remaining > 0) {
          await new Promise((resolve) => setTimeout(resolve, remaining));
        }
        setIsHistoryLoading(false);
      }
    };
    void run();
  }, [roomId, token]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isHistoryLoading]);

  useEffect(() => {
    if (!token || !roomId || status !== "connected") return;
    connectSocket(token).emit("room_active", { roomId });
  }, [roomId, status, token]);

  const isSelectedPeerConnected = useMemo(() => {
    if (!selectedUserId) return false;
    return presence.some((p) => p.userId === selectedUserId && p.status === "connected");
  }, [presence, selectedUserId]);

  const sendMessage = () => {
    if (status !== "connected") return;
    if (!token || !roomId || !selectedUserId || !input.trim() || !userIdRef.current) return;
    if (!isSelectedPeerConnected) return;
    const socket = connectSocket(token);
    if (!socket.connected) return;
    const clientId = `tmp-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const content = input.trim();

    setMessages((prev) => [
      ...prev,
      {
        id: clientId,
        clientId,
        optimistic: true,
        content,
        senderId: userIdRef.current as string,
        receiverId: selectedUserId,
        roomId,
        timestamp: new Date().toISOString(),
        deliveryStatus: "sending",
      },
    ]);

    socket.emit(
      "sendMessage",
      { content, receiverId: selectedUserId, roomId, clientId },
      (ack: { status: string; message?: Message; delivered?: boolean }) => {
        if (ack.status !== "ok" || !ack.message) return;
        const audio = sendAudioRef.current;
        if (audio) {
          audio.currentTime = 0;
          void audio.play().catch(() => {});
        }
        setMessages((prev) =>
          prev.map((item) =>
            item.clientId === clientId
              ? ({ ...ack.message, deliveryStatus: ack.delivered ? "delivered" : "sent" } as ChatMessage)
              : item
          )
        );
      }
    );

    socket.emit("typing", { receiverId: selectedUserId, roomId, isTyping: false });
    setInput("");
  };

  const handleLogout = () => logout();

  return {
    token, status, users, admins, messages, presence, input, selectedUserId, roomId, role, userId,
    typingUserId, sidebarCollapsed, scrollRef, isHistoryLoading, isSelectedPeerConnected,
    setInput, setSelectedUserId, setSidebarCollapsed, sendMessage, logout: handleLogout,
  };
}
