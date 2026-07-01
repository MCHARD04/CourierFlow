import { useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({ title, subtitle, onClose, children, width = "max-w-lg" }) {
  useEffect(() => {
    const h = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0B2545]/40 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative z-10 w-full ${width} rounded-2xl bg-white border border-[#0B2545]/8 shadow-[0_40px_80px_-24px_rgba(11,37,69,0.28)] overflow-hidden animate-[popIn_200ms_ease-out]`}>
        <div className="flex items-start justify-between px-6 py-5 border-b border-[#0B2545]/8">
          <div>
            <h3 className="font-display font-semibold text-[#0B2545] text-[1.05rem]">{title}</h3>
            {subtitle && <p className="mt-0.5 text-[0.84rem] text-[#0B2545]/50">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="h-8 w-8 rounded-full hover:bg-[#0B2545]/8 flex items-center justify-center text-[#0B2545]/45 hover:text-[#0B2545] transition-colors cursor-pointer shrink-0 ml-4" aria-label="Close">
            <X size={16} />
          </button>
        </div>
        <div className="px-6 py-6">{children}</div>
      </div>
    </div>
  );
}
