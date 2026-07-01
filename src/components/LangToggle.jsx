export default function LangToggle({ lang, setLang, light }) {
  return (
    <div
      className={`flex items-center rounded-full border p-0.5 text-[0.78rem] font-mono font-medium ${
        light ? "border-white/20" : "border-[#0B2545]/15"
      }`}
    >
      {["en", "sw"].map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-2.5 py-1 rounded-full uppercase transition-all cursor-pointer ${
            lang === l
              ? "bg-[#E63946] text-white"
              : light
              ? "text-white/60 hover:text-white"
              : "text-[#0B2545]/50 hover:text-[#0B2545]"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
