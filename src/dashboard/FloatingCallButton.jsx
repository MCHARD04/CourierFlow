import { useEffect, useRef, useState } from "react";
import { Phone, MessageCircle, X } from "lucide-react";

export default function FloatingCallButton({ t }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="fixed bottom-6 right-5 sm:right-7 z-40 flex flex-col items-end gap-3">
      {open && (
        <div className="rounded-2xl bg-white border border-[#0B2545]/8 shadow-[0_24px_48px_-16px_rgba(11,37,69,0.28)] p-3 w-64 animate-[popIn_180ms_ease-out]">
          <p className="px-2.5 pt-1 pb-2 text-[0.74rem] font-mono uppercase tracking-wider text-[#0B2545]/40">{t.support.title}</p>
          <a
            href="tel:+255700000000"
            className="flex items-center gap-3 rounded-xl px-2.5 py-2.5 hover:bg-[#0B2545]/5 transition-colors cursor-pointer"
          >
            <span className="h-9 w-9 rounded-full bg-[#0B2545]/6 flex items-center justify-center shrink-0">
              <Phone size={16} className="text-[#0B2545]" />
            </span>
            <span className="min-w-0">
              <span className="block text-[0.86rem] font-medium text-[#0B2545]">{t.support.call}</span>
              <span className="block text-[0.74rem] font-mono text-[#0B2545]/45">+255 700 000 000</span>
            </span>
          </a>
          <a
            href="https://wa.me/255700000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl px-2.5 py-2.5 hover:bg-[#0B2545]/5 transition-colors cursor-pointer"
          >
            <span className="h-9 w-9 rounded-full bg-[#16A34A]/10 flex items-center justify-center shrink-0">
              <MessageCircle size={16} className="text-[#16A34A]" />
            </span>
            <span className="text-[0.86rem] font-medium text-[#0B2545]">{t.support.whatsapp}</span>
          </a>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={t.support.title}
        aria-expanded={open}
        className="relative h-14 w-14 rounded-full bg-[#E63946] text-white shadow-[0_16px_32px_-8px_rgba(230,57,70,0.5)] flex items-center justify-center hover:bg-[#D62C39] active:scale-95 transition-all cursor-pointer"
      >
        <span className="absolute inset-0 rounded-full bg-[#E63946]/50 motion-safe:animate-[callPulse_2.4s_ease-out_3]" aria-hidden="true" />
        {open ? <X size={22} /> : <Phone size={20} />}
      </button>
    </div>
  );
}
