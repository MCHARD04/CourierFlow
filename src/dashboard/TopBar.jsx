import { useEffect, useRef, useState } from "react";
import { Menu, Search, Bell, ChevronDown, Settings, LogOut } from "lucide-react";
import LangToggle from "../components/LangToggle.jsx";
import Avatar from "../components/Avatar.jsx";

export default function TopBar({ title, onMenuClick, lang, setLang, onSettings, onLogout, t }) {
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
    <header className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur border-b border-[#0B2545]/8 flex items-center gap-3 px-5 sm:px-8 shrink-0">
      <button
        className="lg:hidden text-[#0B2545]/60 hover:text-[#0B2545] cursor-pointer"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>

      <h1 className="font-display font-semibold text-[#0B2545] text-[1.1rem] sm:text-[1.2rem] tracking-tight flex-1 min-w-0 truncate">
        {title}
      </h1>

      <div className="hidden md:block">
        <LangToggle lang={lang} setLang={setLang} />
      </div>

      <button
        className="hidden sm:flex items-center justify-center h-9 w-9 rounded-full text-[#0B2545]/50 hover:text-[#0B2545] hover:bg-[#0B2545]/5 transition-colors cursor-pointer"
        aria-label="Search"
      >
        <Search size={18} />
      </button>

      <button
        className="relative flex items-center justify-center h-9 w-9 rounded-full text-[#0B2545]/50 hover:text-[#0B2545] hover:bg-[#0B2545]/5 transition-colors cursor-pointer"
        aria-label="Notifications"
      >
        <Bell size={18} />
        <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-[#E63946]" aria-hidden="true" />
      </button>

      <div className="h-6 w-px bg-[#0B2545]/10 hidden sm:block" />

      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2.5 pl-1 pr-1.5 sm:pr-2 py-1 rounded-full hover:bg-[#0B2545]/5 transition-colors cursor-pointer"
          aria-haspopup="true"
          aria-expanded={open}
        >
          <Avatar name={t.profile.name} size={32} />
          <span className="hidden sm:block text-[0.86rem] font-medium text-[#0B2545]">{t.profile.name.split(" ")[0]}</span>
          <ChevronDown size={15} className={`hidden sm:block text-[#0B2545]/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div
            role="menu"
            className="absolute right-0 mt-2 w-60 rounded-xl bg-white border border-[#0B2545]/8 shadow-[0_20px_40px_-12px_rgba(11,37,69,0.18)] py-2 origin-top-right animate-[dropdownIn_160ms_ease-out]"
          >
            <div className="px-4 py-2.5 border-b border-[#0B2545]/8">
              <p className="text-[0.86rem] font-medium text-[#0B2545]">{t.profile.name}</p>
              <p className="text-[0.78rem] text-[#0B2545]/45 truncate">{t.profile.email}</p>
            </div>
            <button
              role="menuitem"
              onClick={() => {
                onSettings();
                setOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[0.86rem] text-[#0B2545]/75 hover:bg-[#0B2545]/5 transition-colors cursor-pointer"
            >
              <Settings size={16} /> {t.profile.settings}
            </button>
            <div className="my-1 border-t border-[#0B2545]/8" />
            <button
              role="menuitem"
              onClick={() => {
                onLogout();
                setOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[0.86rem] text-[#E63946] hover:bg-[#E63946]/8 transition-colors cursor-pointer"
            >
              <LogOut size={16} /> {t.profile.logout}
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
