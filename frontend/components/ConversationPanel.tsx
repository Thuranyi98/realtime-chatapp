"use client";

import { RefObject, useEffect, useMemo, useRef, useState } from "react";
import MessageList from "./MessageList";
import EmptyConversation from "./EmptyConversation";
import ConversationSkeleton from "./loading/ConversationSkeleton";
import { connectSocket } from "../lib/socket";
import { conversationThemes, applyConversationTheme } from "../lib/themes/conversationThemes";
import { SettingsIcon } from "../assets/icons/SettingsIcon";
import { SendIcon } from "../assets/icons/SendIcon";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select } from "./ui/select";
import type { ChatMessage, Role, User } from "../lib/types/chat";

type Props = {
  scrollRef: RefObject<HTMLDivElement>;
  messages: ChatMessage[];
  currentUserId: string | null;
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
  isDisconnected: boolean;
  typingUserId: string | null;
  typingName: string | undefined;
  role: Role | null;
  token: string | null;
  roomId: string | undefined;
  selectedUserId: string | undefined;
  setSelectedUserId: (id: string) => void;
  admins: User[];
  isHistoryLoading: boolean;
  connectionStatus: "connected" | "reconnecting" | "disconnected";
  isSelectedPeerConnected: boolean;
};

export default function ConversationPanel(props: Props) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { role, currentUserId, token, roomId, selectedUserId } = props;
  const selectedAdmin = props.admins.find((admin) => admin.id === props.selectedUserId);
  const quickPrompts = [
    "Hello, I need account support.",
    "Can you help me with recent transactions?",
    "I want to talk to an admin.",
  ];
  const canSend =
    !props.isDisconnected &&
    props.isSelectedPeerConnected &&
    Boolean(props.input.trim()) &&
    Boolean(props.roomId) &&
    Boolean(props.selectedUserId);

  const themeKey = useMemo(() => {
    if (role && currentUserId) return `chat_surface_theme_${role.toLowerCase()}_${currentUserId}`;
    return "chat_surface_theme";
  }, [role, currentUserId]);

  useEffect(() => {
    const stored = localStorage.getItem(themeKey);
    const theme = conversationThemes.find((item) => item.id === stored) || conversationThemes[0];
    applyConversationTheme(theme.vars);
  }, [themeKey]);

  const emitTyping = () => {
    if (props.connectionStatus !== "connected") return;
    if (!token || !roomId || !selectedUserId) return;
    const socket = connectSocket(token);
    socket.emit("typing", { receiverId: selectedUserId, roomId, isTyping: true });
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("typing", { receiverId: selectedUserId, roomId, isTyping: false });
    }, 1200);
  };

  return (
    <div className="relative z-10 flex min-h-0 flex-1 flex-col px-2 py-2 sm:px-4 sm:py-3 lg:px-6 lg:py-4">
      <div className="conversation-surface relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-3xl">
        <div className="absolute right-4 top-4 z-10">
          <button onClick={() => setSettingsOpen((prev) => !prev)} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 shadow" aria-label="Conversation settings">
            <SettingsIcon className="h-5 w-5 text-ink" />
          </button>
          {settingsOpen && (
            <div className="mt-2 w-56 rounded-2xl border border-slate/10 bg-white/90 p-3 shadow-xl backdrop-blur">
              <div className="mb-2 text-xs font-semibold text-slate">Surface theme</div>
              <div className="space-y-2">
                {conversationThemes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => {
                      applyConversationTheme(theme.vars);
                      localStorage.setItem(themeKey, theme.id);
                      setSettingsOpen(false);
                    }}
                    className="flex w-full items-center justify-between rounded-xl border border-slate/10 bg-white/80 px-3 py-2 text-left text-xs font-medium text-slate hover:border-slate/20"
                  >
                    {theme.label}
                    <span className="h-3 w-10 rounded-full" style={{ background: `linear-gradient(90deg, ${theme.vars["--conv-grad-1"]}, ${theme.vars["--conv-grad-2"]}, ${theme.vars["--conv-grad-3"]})` }} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div ref={props.scrollRef} className="min-h-0 flex-1 overflow-y-auto p-3 pb-2 sm:p-4 sm:pb-2 lg:p-6 lg:pb-3">
          <div className="mb-2 text-xs">
            {props.connectionStatus === "reconnecting" && (
              <p className="rounded-xl border border-amber-200/80 bg-amber-50/75 px-3 py-1.5 text-amber-700">
                Reconnecting. Sending is temporarily disabled.
              </p>
            )}
            {props.connectionStatus === "disconnected" && (
              <p className="rounded-xl border border-rose-200/80 bg-rose-50/75 px-3 py-1.5 text-rose-700">
                Disconnected. Please check your network to continue messaging.
              </p>
            )}
            {props.connectionStatus === "connected" && !props.isSelectedPeerConnected && props.selectedUserId && (
              <p className="rounded-xl border border-slate-200/80 bg-slate-50/80 px-3 py-1.5 text-slate-600">
                User is offline. Sending is disabled until they reconnect.
              </p>
            )}
          </div>
          {props.role === "USER" && (
            <div className="mb-3 rounded-2xl border border-sky-100/70 bg-gradient-to-r from-sky-500/12 via-cyan-400/12 to-amber-300/18 px-3 py-3 sm:px-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate/70">User Workspace</p>
                  <h3 className="text-sm font-semibold text-ink sm:text-base">Direct Admin Support</h3>
                </div>
                <span className="rounded-full border border-white/60 bg-white/75 px-2 py-1 text-[11px] text-slate shadow-sm">
                  {selectedAdmin?.email || "No admin selected"}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => props.setInput(prompt)}
                    className="rounded-full border border-slate/15 bg-white/80 px-3 py-1 text-[11px] font-medium text-slate transition hover:border-slate/30 hover:bg-white"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}
          {props.isHistoryLoading ? (
            <ConversationSkeleton />
          ) : props.messages.length === 0 ? (
            <EmptyConversation />
          ) : (
            <MessageList messages={props.messages} currentUserId={props.currentUserId ?? undefined} />
          )}
        </div>

        <div className="shrink-0 border-t border-slate/10 bg-white/50 backdrop-blur-sm">
          {props.typingUserId && props.typingName && (
            <div className="flex items-center gap-2 px-4 pb-0.5 pt-2 text-xs text-slate/90">
              <span className="font-medium text-ink">{props.typingName}</span>
              <span>is typing</span>
            </div>
          )}
          <div className="p-2 pt-2 sm:p-3 lg:p-4 lg:pt-2">
            <div className={`flex flex-col gap-2 rounded-2xl px-3 py-2 sm:flex-row sm:items-end sm:px-4 ${props.role === "USER" ? "border border-sky-200/60 bg-gradient-to-r from-white/95 via-sky-50/90 to-cyan-50/80" : "border border-slate/10 bg-white/90"}`}>
              {props.role === "USER" && (
                <Select
                  value={props.selectedUserId}
                  onChange={(e) => props.setSelectedUserId(e.target.value)}
                  className="h-10 w-full shrink-0 border border-slate/10 bg-white/85 text-xs sm:w-[200px] sm:text-sm"
                >
                  {props.admins.length === 0 ? (
                    <option value="">No admins</option>
                  ) : (
                    props.admins.map((admin) => (
                      <option key={admin.id} value={admin.id}>
                        {admin.email}
                      </option>
                    ))
                  )}
                </Select>
              )}
              <Input
                placeholder={props.isDisconnected ? "Socket disconnected" : "Type a message..."}
                value={props.input}
                onChange={(e) => props.setInput(e.target.value)}
                disabled={props.isDisconnected || !props.isSelectedPeerConnected}
                onKeyDown={(e) => e.key === "Enter" && canSend && props.onSend()}
                onInput={emitTyping}
                className="min-h-[40px] border-0 bg-transparent"
              />
              <Button
                type="button"
                onClick={props.onSend}
                disabled={!canSend}
                className={`h-10 w-full rounded-xl px-0 text-white shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 sm:h-11 sm:w-11 ${
                  props.role === "USER"
                    ? "bg-cyan-600 hover:bg-cyan-500"
                    : "bg-slate-800 hover:bg-slate-700"
                }`}
              >
                <SendIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
