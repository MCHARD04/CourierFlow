import { useState } from "react";
import { Package, CheckCircle2, Circle, Camera, MapPin, Maximize2 } from "lucide-react";
import FullMapModal from "./FullMapModal.jsx";
import PageHeader from "./components/PageHeader.jsx";
import SearchBox from "./components/SearchBox.jsx";
import Reveal from "../components/Reveal.jsx";
import TrackingMap from "../components/TrackingMap.jsx";
import { SHIPMENTS } from "./data.js";
import { SHIPMENT_STATUS_STYLE } from "./statusStyles.js";

const STEP_FOR_STATUS = { loading: 0, transit: 1, delayed: 1, delivered: 2 };

function ShipmentListItem({ s, active, onClick, t }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-xl px-4 py-3.5 transition-colors cursor-pointer ${
        active ? "bg-[#0B2545] text-white" : "hover:bg-[#0B2545]/5"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className={`font-mono text-[0.84rem] font-medium ${active ? "text-white" : "text-[#0B2545]"}`}>{s.code}</span>
        <span
          className={`inline-block rounded-full px-2 py-0.5 text-[0.68rem] font-medium ${
            active ? "bg-white/15 text-white" : SHIPMENT_STATUS_STYLE[s.status]
          }`}
        >
          {t.table[`status_${s.status}`]}
        </span>
      </div>
      <div className={`mt-1 text-[0.8rem] ${active ? "text-white/65" : "text-[#0B2545]/55"}`}>{s.route}</div>
      <div className={`mt-2 h-1 rounded-full overflow-hidden ${active ? "bg-white/15" : "bg-[#0B2545]/8"}`}>
        <div
          className={`h-full rounded-full ${active ? "bg-white" : "bg-[#E63946]"}`}
          style={{ width: `${Math.round(s.progress * 100)}%` }}
        />
      </div>
    </button>
  );
}

function Stepper({ status, t }) {
  const step = STEP_FOR_STATUS[status];
  const steps = [t.trackingPage.stepLoading, t.trackingPage.stepTransit, t.trackingPage.stepDelivered];
  return (
    <div className="flex items-center">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1.5">
            {i < step || (i === step && status === "delivered") ? (
              <CheckCircle2 size={20} className="text-[#16A34A]" />
            ) : i === step ? (
              <span className="relative flex h-5 w-5 items-center justify-center">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#E63946]/30 motion-safe:animate-ping" />
                <Circle size={20} className="relative text-[#E63946] fill-[#E63946]" />
              </span>
            ) : (
              <Circle size={20} className="text-[#0B2545]/15" />
            )}
            <span className={`text-[0.74rem] font-medium whitespace-nowrap ${i <= step ? "text-[#0B2545]" : "text-[#0B2545]/35"}`}>{label}</span>
          </div>
          {i < steps.length - 1 && <div className={`h-px flex-1 mx-2 ${i < step ? "bg-[#16A34A]" : "bg-[#0B2545]/12"}`} />}
        </div>
      ))}
    </div>
  );
}

export default function Tracking({ t }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(SHIPMENTS.find((s) => s.status === "transit")?.code ?? SHIPMENTS[0].code);
  const [mapOpen, setMapOpen] = useState(false);
  const tx = t.trackingPage;

  const filtered = SHIPMENTS.filter((s) => {
    const q = query.trim().toLowerCase();
    return !q || s.code.toLowerCase().includes(q) || s.route.toLowerCase().includes(q);
  });

  const active = SHIPMENTS.find((s) => s.code === selected) ?? SHIPMENTS[0];

  return (
    <div className="space-y-5">
      <PageHeader title={tx.title} sub={tx.sub} />

      <div className="grid lg:grid-cols-[320px_1fr] gap-5 items-start">
        <Reveal delay={60}>
          <div className="rounded-2xl bg-white border border-[#0B2545]/8 p-3 flex flex-col gap-3">
            <div className="px-1 pt-1">
              <SearchBox value={query} onChange={setQuery} placeholder={tx.searchPlaceholder} />
            </div>
            <div className="space-y-1 max-h-[480px] overflow-y-auto">
              {filtered.map((s) => (
                <ShipmentListItem key={s.code} s={s} active={s.code === selected} onClick={() => setSelected(s.code)} t={t} />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="rounded-2xl bg-[#0B2545] border border-white/10 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="font-mono font-semibold text-white text-[1rem]">{active.code}</span>
                  <span className={`inline-block rounded-full px-2.5 py-1 text-[0.72rem] font-medium ${SHIPMENT_STATUS_STYLE[active.status]}`}>
                    {t.table[`status_${active.status}`]}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-[0.86rem] text-white/55">
                  <MapPin size={13} /> {active.route}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-[0.72rem] font-mono uppercase tracking-wider text-white/35">{t.table.eta}</div>
                  <div className="font-mono font-semibold text-white text-[1.05rem]">{active.eta}</div>
                </div>
                <button
                  onClick={() => setMapOpen(true)}
                  className="inline-flex items-center gap-2 rounded-[10px] border border-white/20 px-4 py-2 text-[0.82rem] font-medium text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <Maximize2 size={14} /> {tx.viewInMap}
                </button>
              </div>
            </div>

            <div className="relative h-[340px] sm:h-[400px]">
              <TrackingMap route={active.path} progress={active.progress} arrived={active.status === "delivered"} />
            </div>

            <div className="px-6 py-5 border-t border-white/10 bg-white/[0.02]">
              <Stepper status={active.status} t={t} />
            </div>
          </div>
        </Reveal>
      </div>

      {active.status === "delivered" && (
        <Reveal delay={180}>
          <div className="rounded-2xl bg-white border border-[#0B2545]/8 p-6 flex flex-wrap items-center gap-5">
            <div className="h-20 w-28 rounded-xl bg-[#0B2545]/6 border border-[#0B2545]/8 flex items-center justify-center shrink-0">
              <Camera size={22} className="text-[#0B2545]/30" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-[#0B2545] text-[0.98rem]">{tx.podTitle}</h3>
              <p className="mt-1 text-[0.84rem] text-[#0B2545]/50">{tx.podSub}</p>
            </div>
          </div>
        </Reveal>
      )}

      {filtered.length === 0 && (
        <div className="py-16 text-center">
          <Package size={26} className="mx-auto text-[#0B2545]/20" />
          <p className="mt-3 text-[0.88rem] text-[#0B2545]/45">{t.shipmentsPage.empty}</p>
        </div>
      )}

      {mapOpen && <FullMapModal shipment={active} t={t} onClose={() => setMapOpen(false)} />}
    </div>
  );
}
