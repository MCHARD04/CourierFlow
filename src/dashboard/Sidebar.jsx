import { LayoutDashboard, Package, Truck, Users, MapPin, Wallet, FileText, Settings, LogOut, X } from "lucide-react";
import Logo from "../components/Logo.jsx";

const NAV = [
  { key: "overview", icon: LayoutDashboard },
  { key: "shipments", icon: Package },
  { key: "fleet", icon: Truck },
  { key: "drivers", icon: Users },
  { key: "tracking", icon: MapPin },
  { key: "payments", icon: Wallet },
  { key: "reports", icon: FileText },
];

function NavButton({ icon: Icon, label, active, onClick, danger = false }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 rounded-[10px] px-3.5 py-2.5 text-[0.88rem] font-medium transition-colors cursor-pointer ${
        active
          ? "bg-[#E63946] text-white"
          : danger
          ? "text-white/45 hover:text-[#FF8189] hover:bg-[#E63946]/10"
          : "text-white/55 hover:text-white hover:bg-white/8"
      }`}
    >
      <Icon size={18} className="shrink-0" />
      {label}
    </button>
  );
}

export default function Sidebar({ active, setActive, mobileOpen, setMobileOpen, t, onLogout }) {
  const go = (key) => {
    setActive(key);
    setMobileOpen(false);
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#0B2545]/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-60 bg-[#0B2545] flex flex-col transition-transform duration-300 ease-out lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/10 shrink-0">
          <button onClick={() => go("overview")} aria-label="CourierFlow overview" className="cursor-pointer">
            <Logo light />
          </button>
          <button
            className="lg:hidden text-white/60 hover:text-white cursor-pointer"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          {NAV.map((item) => (
            <NavButton
              key={item.key}
              icon={item.icon}
              label={t.nav[item.key]}
              active={active === item.key}
              onClick={() => go(item.key)}
            />
          ))}
        </nav>

        <div className="px-3 pb-5 pt-3 border-t border-white/10 space-y-1 shrink-0">
          <NavButton icon={Settings} label={t.nav.settings} active={active === "settings"} onClick={() => go("settings")} />
          <NavButton icon={LogOut} label={t.nav.logout} active={false} danger onClick={onLogout} />
        </div>
      </aside>
    </>
  );
}
