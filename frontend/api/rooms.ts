import { apiRequest } from "./base";

type RoomResponse = { data: { id: string } };

export function createRoomApi(token: string, payload: { userId: string; adminId: string }) {
  return apiRequest<RoomResponse>("/api/rooms", {
    method: "POST",
    token,
    body: payload,
  });
}
