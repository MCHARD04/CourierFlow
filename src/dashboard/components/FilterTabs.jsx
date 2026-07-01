export default function FilterTabs({ tabs, active, onChange }) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[0.82rem] font-medium transition-colors cursor-pointer ${
            active === tab.key ? "bg-[#0B2545] text-white" : "bg-white border border-[#0B2545]/10 text-[#0B2545]/60 hover:text-[#0B2545] hover:border-[#0B2545]/20"
          }`}
        >
          {tab.label}
          <span className={`text-[0.74rem] font-mono ${active === tab.key ? "text-white/60" : "text-[#0B2545]/35"}`}>{tab.count}</span>
        </button>
      ))}
    </div>
  );
}
