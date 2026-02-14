import ConnectionStatus from "./ConnectionStatus";
import { Button } from "./ui/button";

type ChatHeaderProps = {
  status: "connected" | "reconnecting" | "disconnected";
  onLogout: () => void;
};

export function ChatHeader(props: ChatHeaderProps) {
  const { status, onLogout } = props;

  return (
    <header className="relative z-40 flex shrink-0 items-center justify-between border-b border-slate/10 bg-white/70 px-3 py-3 backdrop-blur sm:px-6 sm:py-4">
      <div className="min-w-0">
        <h1 className="truncate text-base font-semibold sm:text-xl">RealTime Chat App</h1>
        <p className="hidden text-xs text-slate sm:block">Secure messaging with live status</p>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <Button variant="outline" onClick={onLogout} className="rounded-full px-3 text-[11px] sm:px-4 sm:text-xs">Logout</Button>
        <ConnectionStatus status={status} />
      </div>
    </header>
  );
}
