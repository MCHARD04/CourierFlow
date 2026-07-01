import { useMemo, useState } from "react";
import { Phone, Star, Truck, Plus } from "lucide-react";
import PageHeader from "./components/PageHeader.jsx";
import FilterTabs from "./components/FilterTabs.jsx";
import SearchBox from "./components/SearchBox.jsx";
import Reveal from "../components/Reveal.jsx";
import Avatar from "../components/Avatar.jsx";
import FormField from "../components/FormField.jsx";
import Modal from "./components/Modal.jsx";
import { DRIVERS, TRUCKS } from "./data.js";
import { DRIVER_STATUS_STYLE } from "./statusStyles.js";

const STATUSES = ["route", "available", "off"];

function DriverCard({ driver, t }) {
  return (
    <div className="rounded-2xl bg-white border border-[#0B2545]/8 p-5 transition-all hover:border-[#E63946]/25 hover:shadow-[0_16px_32px_-20px_rgba(11,37,69,0.2)]">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar name={driver.name} size={44} />
          <div>
            <div className="font-display font-semibold text-[#0B2545] text-[0.95rem]">{driver.name}</div>
            <div className="flex items-center gap-1 text-[0.78rem] text-[#0B2545]/45 mt-0.5">
              <Phone size={11} /> {driver.phone}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className={`inline-block rounded-full px-2.5 py-1 text-[0.72rem] font-medium ${DRIVER_STATUS_STYLE[driver.status]}`}>
          {t.driversPage[`status_${driver.status}`]}
        </span>
        <span className="inline-flex items-center gap-1 text-[0.8rem] font-mono text-[#0B2545]/70">
          <Star size={13} className="text-[#F59E0B] fill-[#F59E0B]" /> {driver.rating}
        </span>
      </div>
      <div className="mt-4 pt-4 border-t border-[#0B2545]/8 flex items-center justify-between text-[0.82rem]">
        <span className="inline-flex items-center gap-1.5 text-[#0B2545]/60">
          <Truck size={13} /> {driver.truck}
        </span>
        <span className="text-[#0B2545]/45">{driver.trips} {t.driversPage.trips}</span>
      </div>
    </div>
  );
}

function RegisterDriverModal({ onClose, onRegister, t }) {
  const [form, setForm] = useState({ name: "", phone: "", license: "", truck: "" });
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const valid = form.name && form.phone;

  return (
    <Modal title={t.driversPage.registerTitle} onClose={onClose}>
      <div className="space-y-4">
        <FormField label={t.driversPage.driverName} value={form.name} onChange={update("name")} placeholder="Amani Mushi" />
        <FormField label={t.driversPage.driverPhone} type="tel" value={form.phone} onChange={update("phone")} placeholder="+255 7XX XXX XXX" />
        <FormField label={t.driversPage.license} value={form.license} onChange={update("license")} placeholder="TZ-DL-000000" />
        <div>
          <label className="text-[0.84rem] font-medium text-[#0B2545]/80">{t.driversPage.assignedTruck}</label>
          <select value={form.truck} onChange={update("truck")} className="mt-1.5 w-full rounded-[10px] border border-[#0B2545]/15 bg-white px-4 py-3 text-[0.92rem] text-[#0B2545] outline-none focus:border-[#E63946]/50 focus:ring-2 focus:ring-[#E63946]/10 cursor-pointer">
            <option value="">{t.driversPage.noTruck}</option>
            {TRUCKS.map((tr) => <option key={tr.id} value={tr.id}>{tr.id} · {tr.model}</option>)}
          </select>
        </div>
        <div className="flex gap-3 pt-2">
          <button onClick={onClose} className="flex-1 rounded-[10px] border border-[#0B2545]/12 py-3 text-[0.9rem] font-medium text-[#0B2545]/60 hover:bg-[#0B2545]/5 transition-colors cursor-pointer">{t.driversPage.cancel}</button>
          <button
            onClick={() => { if (valid) { onRegister(form); onClose(); } }}
            disabled={!valid}
            className="flex-1 rounded-[10px] bg-[#0B2545] py-3 text-[0.9rem] font-semibold text-white hover:bg-[#0B2545]/85 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {t.driversPage.registerConfirm}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default function Drivers({ t }) {
  const [drivers, setDrivers] = useState(DRIVERS);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [registerOpen, setRegisterOpen] = useState(false);
  const tx = t.driversPage;

  const counts = useMemo(() => {
    const c = { all: drivers.length };
    STATUSES.forEach((s) => (c[s] = drivers.filter((d) => d.status === s).length));
    return c;
  }, [drivers]);

  const filtered = useMemo(() => drivers.filter((d) => {
    const matchesStatus = filter === "all" || d.status === filter;
    const q = query.trim().toLowerCase();
    return matchesStatus && (!q || d.name.toLowerCase().includes(q) || d.truck.toLowerCase().includes(q));
  }), [filter, query, drivers]);

  const tabs = [
    { key: "all", label: tx.filterAll, count: counts.all },
    ...STATUSES.map((s) => ({ key: s, label: tx[`status_${s}`], count: counts[s] })),
  ];

  const handleRegister = (form) => {
    setDrivers((prev) => [...prev, {
      name: form.name, phone: form.phone, status: "available",
      truck: form.truck || "—", rating: 4.5, trips: 0,
    }]);
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title={tx.title}
        sub={tx.sub}
        action={
          <button onClick={() => setRegisterOpen(true)} className="inline-flex items-center gap-2 rounded-[10px] bg-[#0B2545] px-5 py-2.5 text-[0.88rem] font-semibold text-white hover:bg-[#0B2545]/85 transition-colors cursor-pointer">
            <Plus size={16} /> {tx.registerDriver}
          </button>
        }
      />

      <Reveal delay={60}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <FilterTabs tabs={tabs} active={filter} onChange={setFilter} />
          <SearchBox value={query} onChange={setQuery} placeholder={tx.searchPlaceholder} />
        </div>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((driver, i) => (
          <Reveal key={driver.name} delay={120 + i * 40}>
            <DriverCard driver={driver} t={t} />
          </Reveal>
        ))}
      </div>

      {registerOpen && <RegisterDriverModal onClose={() => setRegisterOpen(false)} onRegister={handleRegister} t={t} />}
    </div>
  );
}
