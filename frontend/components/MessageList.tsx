import { cn } from "../lib/utils";
import type { ChatMessage } from "../lib/types/chat";

function formatTime(timestamp: string) {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function MessageList({
  messages,
  currentUserId,
}: {
  messages: ChatMessage[];
  currentUserId?: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      {messages.map((msg, index) => {
        const isMine = msg.senderId === currentUserId;

        return (
          <div
            key={msg.id}
            className={cn("bubble-enter flex", isMine ? "justify-end" : "justify-start")}
            style={{ animationDelay: `${Math.min(index, 12) * 22}ms` }}
          >
            <div
              className={cn(
                "bubble-card max-w-[76%] rounded-3xl px-4 py-3",
                isMine
                  ? "rounded-br-lg bg-gradient-to-br from-[#0B84FF] via-[#3A9BFF] to-[#0B84FF] text-white"
                  : "rounded-bl-lg border border-slate/15 bg-white/95 text-[#1B2430]"
              )}
            >
              <p className="whitespace-pre-wrap break-words text-[15px] leading-relaxed">{msg.content}</p>
              <p className={cn("mt-1.5 text-right text-[11px]", isMine ? "text-white/80" : "text-slate/60")}>
                {formatTime(msg.timestamp)}
                {isMine && msg.deliveryStatus ? ` · ${msg.deliveryStatus[0].toUpperCase()}${msg.deliveryStatus.slice(1)}` : ""}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
