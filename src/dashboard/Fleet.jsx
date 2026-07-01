import { useMemo, useState } from "react";
import { Truck, User, Gauge, Plus, UserCheck } from "lucide-react";
import PageHeader from "./components/PageHeader.jsx";
import FilterTabs from "./components/FilterTabs.jsx";
import SearchBox from "./components/SearchBox.jsx";
import Reveal from "../components/Reveal.jsx";
import CountUp from "../components/CountUp.jsx";
import FormField from "../components/FormField.jsx";
import Modal from "./components/Modal.jsx";
import { TRUCKS, DRIVERS } from "./data.js";
import { TRUCK_STATUS_STYLE } from "./statusStyles.js";

const STATUSES = ["active", "idle", "maintenance"];

function SummaryTile({ label, value, suffix = "" }) {
  return (
    <div className="rounded-2xl bg-white border border-[#0B2545]/8 p-5">
      <div className="font-mono font-bold text-[#0B2545] text-[1.4rem] tabular-nums">
        <CountUp value={value} />
        {suffix}
      </div>
      <div className="mt-1 text-[0.8rem] text-[#0B2545]/45">{label}</div>
    </div>
  );
}

function TruckCard({ truck, onAssign, t }) {
  return (
    <div className="rounded-2xl bg-white border border-[#0B2545]/8 p-5 transition-all hover:border-[#E63946]/25 hover:shadow-[0_16px_32px_-20px_rgba(11,37,69,0.2)] flex flex-col">
      <div className="flex items-start justify-between">
        <div className="h-10 w-10 rounded-[10px] bg-[#0B2545]/6 flex items-center justify-center shrink-0">
          <Truck size={18} className="text-[#0B2545]" />
        </div>
        <span className={`inline-block rounded-full px-2.5 py-1 text-[0.72rem] font-medium ${TRUCK_STATUS_STYLE[truck.status]}`}>
          {t.fleetPage[`status_${truck.status}`]}
        </span>
      </div>
      <div className="mt-4 font-mono font-semibold text-[#0B2545] text-[1.05rem]">{truck.id}</div>
      <div className="text-[0.84rem] text-[#0B2545]/55">{truck.model} · {truck.capacity}</div>
      <div className="mt-3 flex items-center gap-1.5 text-[0.82rem] text-[#0B2545]/60">
        <User size={13} className="shrink-0" /> {truck.driver}
      </div>
      <div className="mt-1 text-[0.8rem] text-[#0B2545]/45">{truck.route}</div>
      <div className="mt-4">
        <div className="flex items-center justify-between text-[0.74rem] text-[#0B2545]/40 mb-1.5">
          <span className="inline-flex items-center gap-1"><Gauge size={12} /> {t.fleetPage.utilization}</span>
          <span className="font-mono">{truck.utilization}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-[#0B2545]/8 overflow-hidden">
          <div className="h-full rounded-full bg-[#E63946] transition-all duration-700 ease-out" style={{ width: `${truck.utilization}%` }} />
        </div>
      </div>
      <button
        onClick={() => onAssign(truck)}
        className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#0B2545]/12 py-2 text-[0.82rem] font-medium text-[#0B2545]/65 hover:border-[#E63946]/30 hover:text-[#E63946] transition-colors cursor-pointer"
      >
        <UserCheck size={14} /> {t.fleetPage.assignDriver}
      </button>
    </div>
  );
}

function AssignDriverModal({ truck, onClose, onAssign, t }) {
  const [driverId, setDriverId] = useState("");
  const [route, setRoute] = useState(truck?.route ?? "");
  const available = DRIVERS.filter((d) => d.status !== "off");

  return (
    <Modal title={t.fleetPage.assignTitle} subtitle={`${truck?.id} · ${truck?.model}`} onClose={onClose}>
      <div className="space-y-4">
        <div>
          <label className="text-[0.84rem] font-medium text-[#0B2545]/80">{t.fleetPage.selectDriver}</label>
          <select
            value={driverId}
            onChange={(e) => setDriverId(e.target.value)}
            className="mt-1.5 w-full rounded-[10px] border border-[#0B2545]/15 bg-white px-4 py-3 text-[0.92rem] text-[#0B2545] outline-none transition-colors focus:border-[#E63946]/50 focus:ring-2 focus:ring-[#E63946]/10 cursor-pointer"
          >
            <option value="">{t.fleetPage.selectDriverPlaceholder}</option>
            {available.map((d) => (
              <option key={d.name} value={d.name}>{d.name} · {d.truck}</option>
            ))}
          </select>
        </div>
        <FormField label={t.fleetPage.routeLabel} value={route} onChange={(e) => setRoute(e.target.value)} placeholder="e.g. Dar → Mwanza" />
        <div className="flex gap-3 pt-2">
          <button onClick={onClose} className="flex-1 rounded-[10px] border border-[#0B2545]/12 py-3 text-[0.9rem] font-medium text-[#0B2545]/60 hover:bg-[#0B2545]/5 transition-colors cursor-pointer">
            {t.fleetPage.cancel}
          </button>
          <button
            onClick={() => { if (driverId && route) { onAssign(truck.id, driverId, route); onClose(); } }}
            disabled={!driverId || !route}
            className="flex-1 rounded-[10px] bg-[#E63946] py-3 text-[0.9rem] font-semibold text-white hover:bg-[#D62C39] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {t.fleetPage.assignConfirm}
          </button>
        </div>
      </div>
    </Modal>
  );
}

function RegisterTruckModal({ onClose, onRegister, t }) {
  const [form, setForm] = useState({ id: "", model: "", capacity: "", driver: "" });
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const valid = form.id && form.model && form.capacity;

  return (
    <Modal title={t.fleetPage.registerTitle} onClose={onClose}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField label={t.fleetPage.truckId} value={form.id} onChange={update("id")} placeholder="T-300" />
          <FormField label={t.fleetPage.truckCapacity} value={form.capacity} onChange={update("capacity")} placeholder="25T" />
        </div>
        <FormField label={t.fleetPage.truckModel} value={form.model} onChange={update("model")} placeholder="Scania R450" />
        <div>
          <label className="text-[0.84rem] font-medium text-[#0B2545]/80">{t.fleetPage.assignedDriver}</label>
          <select value={form.driver} onChange={update("driver")} className="mt-1.5 w-full rounded-[10px] border border-[#0B2545]/15 bg-white px-4 py-3 text-[0.92rem] text-[#0B2545] outline-none focus:border-[#E63946]/50 focus:ring-2 focus:ring-[#E63946]/10 cursor-pointer">
            <option value="">{t.fleetPage.noDriver}</option>
            {DRIVERS.map((d) => <option key={d.name} value={d.name}>{d.name}</option>)}
          </select>
        </div>
        <div className="flex gap-3 pt-2">
          <button onClick={onClose} className="flex-1 rounded-[10px] border border-[#0B2545]/12 py-3 text-[0.9rem] font-medium text-[#0B2545]/60 hover:bg-[#0B2545]/5 transition-colors cursor-pointer">{t.fleetPage.cancel}</button>
          <button
            onClick={() => { if (valid) { onRegister(form); onClose(); } }}
            disabled={!valid}
            className="flex-1 rounded-[10px] bg-[#0B2545] py-3 text-[0.9rem] font-semibold text-white hover:bg-[#0B2545]/85 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {t.fleetPage.registerConfirm}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default function Fleet({ t }) {
  const [trucks, setTrucks] = useState(TRUCKS);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [assignTarget, setAssignTarget] = useState(null);
  const [registerOpen, setRegisterOpen] = useState(false);
  const tx = t.fleetPage;

  const counts = useMemo(() => {
    const c = { all: trucks.length };
    STATUSES.forEach((s) => (c[s] = trucks.filter((tr) => tr.status === s).length));
    return c;
  }, [trucks]);

  const avgUtilization = useMemo(() => Math.round(trucks.reduce((sum, tr) => sum + tr.utilization, 0) / trucks.length), [trucks]);

  const filtered = useMemo(() => trucks.filter((tr) => {
    const matchesStatus = filter === "all" || tr.status === filter;
    const q = query.trim().toLowerCase();
    return matchesStatus && (!q || tr.id.toLowerCase().includes(q) || tr.model.toLowerCase().includes(q) || tr.driver.toLowerCase().includes(q));
  }), [filter, query, trucks]);

  const tabs = [
    { key: "all", label: tx.filterAll, count: counts.all },
    ...STATUSES.map((s) => ({ key: s, label: tx[`status_${s}`], count: counts[s] })),
  ];

  const handleAssign = (truckId, driverName, route) => {
    setTrucks((prev) => prev.map((tr) => tr.id === truckId ? { ...tr, driver: driverName, route, status: "active", utilization: Math.max(tr.utilization, 70) } : tr));
  };

  const handleRegister = (form) => {
    setTrucks((prev) => [...prev, { id: form.id, model: form.model, capacity: form.capacity, driver: form.driver || "—", status: "idle", route: "—", utilization: 0 }]);
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title={tx.title}
        sub={tx.sub}
        action={
          <button onClick={() => setRegisterOpen(true)} className="inline-flex items-center gap-2 rounded-[10px] bg-[#0B2545] px-5 py-2.5 text-[0.88rem] font-semibold text-white hover:bg-[#0B2545]/85 transition-colors cursor-pointer">
            <Plus size={16} /> {tx.registerTruck}
          </button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Reveal delay={0}><SummaryTile label={tx.totalTrucks} value={trucks.length} /></Reveal>
        <Reveal delay={50}><SummaryTile label={tx.activeNow} value={counts.active} /></Reveal>
        <Reveal delay={100}><SummaryTile label={tx.inMaintenance} value={counts.maintenance} /></Reveal>
        <Reveal delay={150}><SummaryTile label={tx.avgUtilization} value={avgUtilization} suffix="%" /></Reveal>
      </div>

      <Reveal delay={180}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <FilterTabs tabs={tabs} active={filter} onChange={setFilter} />
          <SearchBox value={query} onChange={setQuery} placeholder={tx.searchPlaceholder} />
        </div>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((truck, i) => (
          <Reveal key={truck.id} delay={220 + i * 40}>
            <TruckCard truck={truck} onAssign={setAssignTarget} t={t} />
          </Reveal>
        ))}
      </div>

      {assignTarget && <AssignDriverModal truck={assignTarget} onClose={() => setAssignTarget(null)} onAssign={handleAssign} t={t} />}
      {registerOpen && <RegisterTruckModal onClose={() => setRegisterOpen(false)} onRegister={handleRegister} t={t} />}
    </div>
  );
}
