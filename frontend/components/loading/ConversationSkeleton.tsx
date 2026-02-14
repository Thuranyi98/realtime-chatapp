export default function ConversationSkeleton() {
  const rows = [
    { mine: false, width: "w-[71%]", lines: ["w-full", "w-4/5"], time: "w-16" },
    { mine: true, width: "w-[54%]", lines: ["w-full"], time: "w-14" },
    { mine: false, width: "w-[63%]", lines: ["w-full", "w-[72%]", "w-[46%]"], time: "w-12" },
    { mine: true, width: "w-[46%]", lines: ["w-full", "w-[58%]"], time: "w-14" },
    { mine: false, width: "w-[76%]", lines: ["w-full", "w-5/6"], time: "w-16" },
  ];

  return (
    <div className="w-full space-y-3 px-1 py-1 opacity-70">
      {rows.map((row, index) => (
        <div
          key={`${row.mine}-${index}`}
          className={`flex items-end gap-2 ${row.mine ? "justify-end" : "justify-start"}`}
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <div
            className={`max-w-[86%] ${row.width} rounded-[24px] px-4 py-3 ${
              row.mine
                ? "rounded-br-lg bg-gradient-to-br from-[#0B84FF] via-[#3A9BFF] to-[#0B84FF]"
                : "rounded-bl-lg border border-slate/15 bg-white/95"
            }`}
          >
            <div className="mb-2 space-y-1.5">
              {row.lines.map((line, lineIndex) => (
                <div
                  key={`${index}-${lineIndex}`}
                  className={`${line} ${row.mine ? "skeleton-shimmer-strong bg-white/35" : "skeleton-shimmer bg-slate-200/70"} h-3 rounded-full`}
                />
              ))}
            </div>
            <div
              className={`${row.time} ${row.mine ? "skeleton-shimmer-strong ml-auto bg-white/30" : "skeleton-shimmer bg-slate-200/60"} h-2.5 rounded-full`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
