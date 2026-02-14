import { apiRequest } from "./base";
import type { Message } from "../lib/types/chat";

type HistoryResponse = {
  data: Message[];
  nextCursor?: string;
};

export function getMessagesHistoryApi(token: string, roomId: string, limit = 50) {
  return apiRequest<HistoryResponse>(`/api/messages/history?roomId=${roomId}&limit=${limit}`, { token });
}
