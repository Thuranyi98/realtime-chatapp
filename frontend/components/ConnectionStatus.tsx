type Status = "connected" | "reconnecting" | "disconnected";

const statusMeta: Record<Status, { label: string; ring: string; glow: string }> = {
  connected: {
    label: "Connected",
    ring: "from-emerald-500 via-emerald-400 to-emerald-200",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.5)]",
  },
  reconnecting: {
    label: "Reconnecting",
    ring: "from-amber-500 via-amber-400 to-amber-200",
    glow: "shadow-[0_0_20px_rgba(245,158,11,0.5)]",
  },
  disconnected: {
    label: "Disconnected",
    ring: "from-red-600 via-red-500 to-red-300",
    glow: "shadow-[0_0_22px_rgba(220,38,38,0.6)]",
  },
};

export default function ConnectionStatus({ status }: { status: Status }) {
  const meta = statusMeta[status];

  return (
    <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium shadow">
      <span
        className={`h-2.5 w-2.5 rounded-full bg-gradient-to-br ${meta.ring} ${meta.glow}`}
        aria-hidden="true"
      />
      <span>{meta.label}</span>
    </div>
  );
}
