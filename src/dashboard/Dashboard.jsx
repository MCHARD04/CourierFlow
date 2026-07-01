import { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import TopBar from "./TopBar.jsx";
import Overview from "./Overview.jsx";
import Shipments from "./Shipments.jsx";
import Fleet from "./Fleet.jsx";
import Drivers from "./Drivers.jsx";
import Tracking from "./Tracking.jsx";
import Payments from "./Payments.jsx";
import Reports from "./Reports.jsx";
import SettingsPanel from "./SettingsPanel.jsx";
import FloatingCallButton from "./FloatingCallButton.jsx";
import { DASH_COPY } from "./copy.js";

export default function Dashboard({ lang, setLang, navigate }) {
  const [active, setActive] = useState("overview");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const t = DASH_COPY[lang];

  const handleLogout = () => navigate("home");

  return (
    <div className="min-h-screen bg-[#F7F8FA] font-sans antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }
        @keyframes dropdownIn { from { opacity: 0; transform: translateY(-4px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes popIn { from { opacity: 0; transform: translateY(6px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes callPulse { 0% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(1.8); opacity: 0; } }
      `}</style>

      <Sidebar active={active} setActive={setActive} mobileOpen={mobileNavOpen} setMobileOpen={setMobileNavOpen} t={t} onLogout={handleLogout} />

      <div className="lg:pl-60 flex flex-col min-h-screen">
        <TopBar
          title={t.nav[active] ?? t.nav.overview}
          onMenuClick={() => setMobileNavOpen(true)}
          lang={lang}
          setLang={setLang}
          onSettings={() => setActive("settings")}
          onLogout={handleLogout}
          t={t}
        />
        <main className="flex-1 px-5 sm:px-8 py-7 max-w-[1400px] w-full mx-auto">
          {active === "overview" && <Overview t={t} onNavigate={setActive} />}
          {active === "settings" && <SettingsPanel t={t} lang={lang} setLang={setLang} onLogout={handleLogout} />}
          {active === "shipments" && <Shipments t={t} />}
          {active === "fleet" && <Fleet t={t} />}
          {active === "drivers" && <Drivers t={t} />}
          {active === "tracking" && <Tracking t={t} />}
          {active === "payments" && <Payments t={t} />}
          {active === "reports" && <Reports t={t} />}
        </main>
      </div>

      <FloatingCallButton t={t} />
    </div>
  );
}
