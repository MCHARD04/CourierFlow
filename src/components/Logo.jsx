export default function Logo({ light = false }) {
  return (
    <div className="flex items-center gap-2 select-none">
      <svg width="30" height="30" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M14 8 L14 20 Q14 26 20 26 L34 26" stroke="#E63946" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M22 40 L22 30 Q22 26 26 26 L40 26" stroke={light ? "#FFFFFF" : "#0B2545"} strokeWidth="6" strokeLinecap="round" fill="none" />
      </svg>
      <span
        className={`font-display font-bold text-[1.25rem] tracking-tight ${light ? "text-white" : "text-[#0B2545]"}`}
      >
        Courier<span className="text-[#E63946]">Flow</span>
      </span>
    </div>
  );
}
