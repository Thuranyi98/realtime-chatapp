import { ScrollArea } from "./ui/scroll-area";

type User = { id: string; email: string; role: "ADMIN" | "USER" };

type Presence = { userId: string; status: "connected" | "disconnected" };

const presenceMeta = {
  connected: {
    label: "Connected",
    ring: "from-emerald-500 via-emerald-400 to-emerald-200",
    glow: "shadow-[0_0_14px_rgba(16,185,129,0.5)]",
  },
  disconnected: {
    label: "Disconnected",
    ring: "from-red-600 via-red-500 to-red-300",
    glow: "shadow-[0_0_16px_rgba(220,38,38,0.6)]",
  },
};

export default function UserSidebar({
  users,
  selectedUserId,
  onSelect,
  presence,
  collapsed,
  onToggle,
}: {
  users: User[];
  selectedUserId?: string;
  onSelect: (id: string) => void;
  presence: Presence[];
  collapsed: boolean;
  onToggle: () => void;
}) {
  const presenceMap = new Map(presence.map((p) => [p.userId, p.status]));

  return (
    <aside
      className={`flex shrink-0 flex-col overflow-hidden border-b border-slate/10 bg-white/70 backdrop-blur lg:min-h-0 lg:self-stretch lg:border-b-0 lg:border-r ${
        collapsed ? "w-full lg:w-20" : "w-full lg:w-80"
      }`}
      style={{
        background:
          "linear-gradient(155deg, rgba(255,255,255,0.92) 0%, rgba(230,245,255,0.92) 42%, rgba(255,236,217,0.9) 100%)",
        transition: "width 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div className="flex items-center p-3 pb-2 sm:p-4 sm:pb-2">
        <div
          className="min-w-0 flex-1 overflow-hidden transition-[opacity] duration-200"
          style={{ opacity: collapsed ? 0 : 1, transitionDelay: collapsed ? "0ms" : "120ms" }}
        >
          <h2 className="truncate text-base font-semibold sm:text-lg">Users</h2>
          <p className="truncate text-[11px] text-slate sm:text-xs">Admin view</p>
        </div>
        <button
          onClick={onToggle}
          className="hidden shrink-0 rounded-full border border-slate/20 bg-white px-3 py-1 text-xs font-medium text-slate transition-colors hover:border-slate/40 hover:bg-slate/5 lg:inline-flex"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? "››" : "‹‹"}
        </button>
      </div>
      <ScrollArea className="px-3 pb-3 lg:hidden" viewportClassName="no-scrollbar overflow-x-auto overflow-y-hidden pb-1">
        <div className="flex w-max gap-2">
          {users.length === 0 ? (
            <p className="text-sm text-slate">No users found.</p>
          ) : (
            users.map((user) => {
              const status = presenceMap.get(user.id) || "disconnected";
              const meta = presenceMeta[status];
              return (
                <button
                  key={user.id}
                  onClick={() => onSelect(user.id)}
                  className={`min-w-[138px] max-w-[160px] rounded-xl border px-2.5 py-2 text-left ${
                    selectedUserId === user.id
                      ? "border-ink bg-ink text-white"
                      : "border-transparent bg-white/75"
                  }`}
                >
                  <p className="truncate text-xs font-semibold">{user.email}</p>
                  <span className={`mt-1 inline-flex items-center gap-1.5 text-[11px] ${selectedUserId === user.id ? "text-white/80" : "text-slate"}`}>
                    <span className={`h-2 w-2 rounded-full bg-gradient-to-br ${meta.ring} ${meta.glow}`} />
                    {meta.label}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </ScrollArea>
      <div className="hidden min-h-0 flex-1 space-y-2 overflow-x-hidden overflow-y-auto px-4 pb-4 lg:block">
        {users.length === 0 ? (
          <p
            className="text-sm text-slate"
            style={{
              opacity: collapsed ? 0 : 1,
              transition: "opacity 0.2s ease",
              transitionDelay: collapsed ? "0ms" : "100ms",
            }}
          >
            No users found.
          </p>
        ) : (
          users.map((user) => {
            const status = presenceMap.get(user.id) || "disconnected";
            const meta = presenceMeta[status];
            return (
              <button
                key={user.id}
                onClick={() => onSelect(user.id)}
                className={`flex w-full flex-col rounded-xl border px-3 py-2 text-left transition ${
                  selectedUserId === user.id
                    ? "border-ink bg-ink text-white shadow-glow"
                    : "border-transparent bg-white/75 hover:border-slate/20"
                }`}
              >
                {collapsed ? (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">
                      {(user.email || "U").slice(0, 1).toUpperCase()}
                    </span>
                    <span
                      className={`h-2 w-2 rounded-full bg-gradient-to-br ${meta.ring} ${meta.glow}`}
                      aria-hidden="true"
                    />
                  </div>
                ) : (
                  <>
                    <span className="text-sm font-medium">{user.email}</span>
                    <span
                      className={`mt-1 flex items-center gap-2 text-xs ${
                        selectedUserId === user.id ? "text-white/80" : "text-slate"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full bg-gradient-to-br ${meta.ring} ${meta.glow}`}
                        aria-hidden="true"
                      />
                      {meta.label}
                    </span>
                  </>
                )}
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
}
