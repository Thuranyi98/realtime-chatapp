export type Role = "ADMIN" | "USER";

export type User = {
  id: string;
  email: string;
  role: Role;
};

export type Message = {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  roomId: string;
  timestamp: string;
};

export type ChatMessage = Message & {
  clientId?: string;
  optimistic?: boolean;
  deliveryStatus?: "sending" | "sent" | "delivered";
};

export type Presence = {
  userId: string;
  status: "connected" | "disconnected";
};
