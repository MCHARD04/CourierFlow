import { useEffect } from "react";
import { X, MapPin, Clock, Truck, CheckCircle2 } from "lucide-react";
import TrackingMap from "../components/TrackingMap.jsx";
import { SHIPMENT_STATUS_STYLE } from "./statusStyles.js";

const STEP_FOR_STATUS = { loading: 0, transit: 1, delayed: 1, delivered: 2 };

function Stepper({ status, t }) {
  const step = STEP_FOR_STATUS[status];
  const steps = [t.trackingPage.stepLoading, t.trackingPage.stepTransit, t.trackingPage.stepDelivered];
  return (
    <div className="flex items-center mt-5">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1">
            {i < step || (i === step && status === "delivered") ? (
              <CheckCircle2 size={18} className="text-[#16A34A]" />
            ) : i === step ? (
              <div className="h-[18px] w-[18px] rounded-full bg-[#E63946] flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-white" />
              </div>
            ) : (
              <div className="h-[18px] w-[18px] rounded-full border-2 border-white/20" />
            )}
            <span className={`text-[0.7rem] font-medium whitespace-nowrap ${i <= step ? "text-white" : "text-white/30"}`}>{label}</span>
          </div>
          {i < steps.length - 1 && <div className={`h-px flex-1 mx-2 mb-4 ${i < step ? "bg-[#16A34A]" : "bg-white/15"}`} />}
        </div>
      ))}
    </div>
  );
}

export default function FullMapModal({ shipment, t, onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!shipment) return null;

  return (
    <div className="fixed inset-0 z-[60] flex flex-col" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="absolute inset-0 bg-[#0B2545]/95 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 flex flex-col h-full max-w-[1200px] w-full mx-auto px-4 sm:px-8 py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono font-bold text-white text-[1.2rem]">{shipment.code}</span>
              <span className={`inline-block rounded-full px-2.5 py-1 text-[0.72rem] font-medium ${SHIPMENT_STATUS_STYLE[shipment.status]}`}>
                {t.table[`status_${shipment.status}`]}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-white/50 text-[0.86rem] mt-1">
              <MapPin size={13} /> {shipment.route}
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Close map"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 rounded-2xl overflow-hidden border border-white/10 min-h-0">
          <TrackingMap route={shipment.path} progress={shipment.progress} arrived={shipment.status === "delivered"} />
        </div>

        <div className="mt-4 rounded-2xl bg-white/5 border border-white/10 px-6 py-4">
          <div className="flex flex-wrap items-center gap-6 sm:gap-10">
            <div>
              <div className="text-[0.7rem] font-mono uppercase tracking-wider text-white/35">{t.table.truck}</div>
              <div className="mt-0.5 text-white text-[0.9rem] font-medium flex items-center gap-1.5">
                <Truck size={14} className="text-white/40" /> {shipment.truck} · {shipment.driver}
              </div>
            </div>
            <div>
              <div className="text-[0.7rem] font-mono uppercase tracking-wider text-white/35">{t.table.eta}</div>
              <div className="mt-0.5 text-white text-[0.9rem] font-medium flex items-center gap-1.5">
                <Clock size={14} className="text-white/40" /> {shipment.eta}
              </div>
            </div>
            <div className="flex-1 min-w-[220px]">
              <Stepper status={shipment.status} t={t} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
