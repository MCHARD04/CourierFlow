import { Search } from "lucide-react";

export default function SearchBox({ value, onChange, placeholder }) {
  return (
    <div className="relative w-full sm:w-64 shrink-0">
      <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0B2545]/35" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-[10px] border border-[#0B2545]/12 bg-white pl-9 pr-3.5 py-2.5 text-[0.86rem] text-[#0B2545] placeholder:text-[#0B2545]/35 outline-none transition-colors focus:border-[#E63946]/50 focus:ring-2 focus:ring-[#E63946]/10"
      />
    </div>
  );
}
