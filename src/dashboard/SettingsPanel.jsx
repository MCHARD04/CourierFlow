import { useState } from "react";
import { Check, LogOut } from "lucide-react";
import FormField from "../components/FormField.jsx";
import LangToggle from "../components/LangToggle.jsx";
import Reveal from "../components/Reveal.jsx";

function Switch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63946] ${
        checked ? "bg-[#E63946]" : "bg-[#0B2545]/15"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
          checked ? "translate-x-[1.375rem]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

function Card({ title, children }) {
  return (
    <div className="rounded-2xl bg-white border border-[#0B2545]/8 p-6 sm:p-7">
      <h3 className="font-display font-semibold text-[#0B2545] text-[1.02rem]">{title}</h3>
      <div className="mt-5 space-y-5">{children}</div>
    </div>
  );
}

function NotifRow({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 py-1">
      <span className="text-[0.88rem] text-[#0B2545]/75">{label}</span>
      <Switch checked={checked} onChange={onChange} label={label} />
    </div>
  );
}

export default function SettingsPanel({ t, lang, setLang, onLogout }) {
  const [profile, setProfile] = useState({
    name: t.profile.name,
    company: "Highway Cargo Ltd",
    email: t.profile.email,
    phone: "+255 712 345 678",
  });
  const [notif, setNotif] = useState({ shipment: true, payment: true, driver: false });
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [saved, setSaved] = useState(false);

  const update = (k) => (e) => setProfile({ ...profile, [k]: e.target.value });
  const updatePw = (k) => (e) => setPw({ ...pw, [k]: e.target.value });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  return (
    <div className="space-y-6 max-w-[760px]">
      <Reveal>
        <div>
          <h2 className="font-display font-bold text-[#0B2545] text-[1.45rem] sm:text-[1.65rem] tracking-tight">{t.settings.title}</h2>
          <p className="mt-1 text-[#0B2545]/50 text-[0.92rem]">{t.settings.sub}</p>
        </div>
      </Reveal>

      <form onSubmit={handleSave} className="space-y-6">
        <Reveal delay={60}>
          <Card title={t.settings.profileTitle}>
            <div className="grid sm:grid-cols-2 gap-5">
              <FormField label={t.settings.name} value={profile.name} onChange={update("name")} />
              <FormField label={t.settings.company} value={profile.company} onChange={update("company")} />
              <FormField label={t.settings.email} type="email" value={profile.email} onChange={update("email")} />
              <FormField label={t.settings.phone} type="tel" value={profile.phone} onChange={update("phone")} />
            </div>
          </Card>
        </Reveal>

        <Reveal delay={120}>
          <Card title={t.settings.prefsTitle}>
            <div className="flex items-center justify-between py-1">
              <span className="text-[0.88rem] text-[#0B2545]/75">{t.settings.language}</span>
              <LangToggle lang={lang} setLang={setLang} />
            </div>
            <div className="pt-3 border-t border-[#0B2545]/8 space-y-3">
              <p className="text-[0.78rem] font-mono uppercase tracking-wider text-[#0B2545]/35">{t.settings.notifTitle}</p>
              <NotifRow label={t.settings.notifShipment} checked={notif.shipment} onChange={(v) => setNotif({ ...notif, shipment: v })} />
              <NotifRow label={t.settings.notifPayment} checked={notif.payment} onChange={(v) => setNotif({ ...notif, payment: v })} />
              <NotifRow label={t.settings.notifDriver} checked={notif.driver} onChange={(v) => setNotif({ ...notif, driver: v })} />
            </div>
          </Card>
        </Reveal>

        <Reveal delay={180}>
          <Card title={t.settings.securityTitle}>
            <div className="grid sm:grid-cols-2 gap-5">
              <FormField label={t.settings.currentPw} type="password" value={pw.current} onChange={updatePw("current")} placeholder="••••••••" />
              <div className="hidden sm:block" />
              <FormField label={t.settings.newPw} type="password" value={pw.next} onChange={updatePw("next")} placeholder="••••••••" />
              <FormField label={t.settings.confirmPw} type="password" value={pw.confirm} onChange={updatePw("confirm")} placeholder="••••••••" />
            </div>
          </Card>
        </Reveal>

        <Reveal delay={220}>
          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-[10px] bg-[#0B2545] px-6 py-3 text-[0.9rem] font-semibold text-white transition-all hover:bg-[#0B2545]/90 active:scale-[0.98] cursor-pointer"
            >
              {t.settings.save}
            </button>
            <span
              className={`inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-[#16A34A] transition-opacity duration-300 ${
                saved ? "opacity-100" : "opacity-0"
              }`}
              role="status"
              aria-live="polite"
            >
              <Check size={15} /> {t.settings.saved}
            </span>
          </div>
        </Reveal>
      </form>

      <Reveal delay={260}>
        <div className="rounded-2xl border border-[#E63946]/20 bg-[#E63946]/[0.03] p-6 sm:p-7 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h3 className="font-display font-semibold text-[#0B2545] text-[1.02rem]">{t.settings.sessionTitle}</h3>
            <p className="mt-1 text-[0.85rem] text-[#0B2545]/50">{t.settings.sessionSub}</p>
          </div>
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-2 rounded-[10px] border border-[#E63946]/30 px-5 py-2.5 text-[0.88rem] font-semibold text-[#E63946] hover:bg-[#E63946]/8 transition-colors cursor-pointer"
          >
            <LogOut size={16} /> {t.settings.logout}
          </button>
        </div>
      </Reveal>
    </div>
  );
}
