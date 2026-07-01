import { useState } from "react";
import { FileText, Printer, Truck, Package, CreditCard, Users, ChevronRight } from "lucide-react";
import Reveal from "../components/Reveal.jsx";
import PageHeader from "./components/PageHeader.jsx";
import { SHIPMENTS, TRUCKS, DRIVERS, PAYMENTS } from "./data.js";
import { SHIPMENT_STATUS_STYLE, PAYMENT_STATUS_STYLE } from "./statusStyles.js";

const REPORT_TYPES = [
  { key: "shipments", icon: Package, color: "bg-[#E63946]/10 text-[#E63946]" },
  { key: "payments", icon: CreditCard, color: "bg-[#16A34A]/10 text-[#16A34A]" },
  { key: "fleet", icon: Truck, color: "bg-[#0B2545]/8 text-[#0B2545]" },
  { key: "drivers", icon: Users, color: "bg-[#F59E0B]/10 text-[#B45309]" },
];

function ReportTypeCard({ type, active, onClick, t }) {
  const Icon = type.icon;
  const tx = t.reportsPage;
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-2xl p-5 border transition-all cursor-pointer ${
        active ? "bg-[#0B2545] border-[#0B2545]" : "bg-white border-[#0B2545]/8 hover:border-[#E63946]/25"
      }`}
    >
      <div className={`h-10 w-10 rounded-[10px] flex items-center justify-center mb-3 ${active ? "bg-white/10" : type.color}`}>
        <Icon size={18} className={active ? "text-white" : ""} />
      </div>
      <div className={`font-display font-semibold text-[0.95rem] ${active ? "text-white" : "text-[#0B2545]"}`}>
        {tx[`${type.key}Title`]}
      </div>
      <div className={`mt-1 text-[0.8rem] ${active ? "text-white/55" : "text-[#0B2545]/45"}`}>
        {tx[`${type.key}Sub`]}
      </div>
      <div className={`mt-3 flex items-center gap-1 text-[0.78rem] font-medium ${active ? "text-white/70" : "text-[#E63946]"}`}>
        {tx.generate} <ChevronRight size={13} />
      </div>
    </button>
  );
}

function ShipmentsReport({ t }) {
  const tx = t.reportsPage;
  const total = SHIPMENTS.length;
  const delivered = SHIPMENTS.filter((s) => s.status === "delivered").length;
  const delayed = SHIPMENTS.filter((s) => s.status === "delayed").length;
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: tx.totalShipments, value: total, color: "text-[#0B2545]" },
          { label: tx.delivered, value: delivered, color: "text-[#16A34A]" },
          { label: tx.delayed, value: delayed, color: "text-[#E63946]" },
        ].map(({ label, value, color }) => (
          <div key={label} className="text-center py-4 rounded-xl bg-[#F7F8FA]">
            <div className={`font-mono font-bold text-[1.8rem] ${color}`}>{value}</div>
            <div className="text-[0.78rem] text-[#0B2545]/45 mt-1">{label}</div>
          </div>
        ))}
      </div>
      <table className="w-full text-left border-collapse text-[0.84rem]">
        <thead>
          <tr className="border-b-2 border-[#0B2545]/10 text-[0.72rem] font-mono uppercase tracking-wider text-[#0B2545]/40">
            <th className="pb-2 font-medium">{t.table.code}</th>
            <th className="pb-2 font-medium">{t.table.route}</th>
            <th className="pb-2 font-medium">{t.table.truck}</th>
            <th className="pb-2 font-medium">{t.shipmentsPage.weight}</th>
            <th className="pb-2 font-medium text-right">{t.table.status}</th>
          </tr>
        </thead>
        <tbody>
          {SHIPMENTS.map((s) => (
            <tr key={s.code} className="border-b border-[#0B2545]/6">
              <td className="py-2.5 font-mono text-[#0B2545]">{s.code}</td>
              <td className="py-2.5 text-[#0B2545]/70">{s.route}</td>
              <td className="py-2.5 text-[#0B2545]/55">{s.truck} · {s.driver}</td>
              <td className="py-2.5 font-mono text-[#0B2545]/55">{s.weight}</td>
              <td className="py-2.5 text-right">
                <span className={`inline-block rounded-full px-2 py-0.5 text-[0.7rem] font-medium ${SHIPMENT_STATUS_STYLE[s.status]}`}>
                  {t.table[`status_${s.status}`]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PaymentsReport({ t }) {
  const tx = t.reportsPage;
  const totalCollected = PAYMENTS.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0);
  const totalPending = PAYMENTS.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amount, 0);
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: tx.collected, value: `TZS ${(totalCollected / 1000000).toFixed(1)}M`, color: "text-[#16A34A]" },
          { label: tx.pending, value: `TZS ${(totalPending / 1000000).toFixed(1)}M`, color: "text-[#B45309]" },
          { label: tx.transactions, value: PAYMENTS.length, color: "text-[#0B2545]" },
        ].map(({ label, value, color }) => (
          <div key={label} className="text-center py-4 rounded-xl bg-[#F7F8FA]">
            <div className={`font-mono font-bold text-[1.5rem] ${color}`}>{value}</div>
            <div className="text-[0.78rem] text-[#0B2545]/45 mt-1">{label}</div>
          </div>
        ))}
      </div>
      <table className="w-full text-left border-collapse text-[0.84rem]">
        <thead>
          <tr className="border-b-2 border-[#0B2545]/10 text-[0.72rem] font-mono uppercase tracking-wider text-[#0B2545]/40">
            <th className="pb-2 font-medium">{t.paymentsPage.id}</th>
            <th className="pb-2 font-medium">{t.table.code}</th>
            <th className="pb-2 font-medium">{t.paymentsPage.payer}</th>
            <th className="pb-2 font-medium">{t.paymentsPage.method}</th>
            <th className="pb-2 font-medium">{t.paymentsPage.date}</th>
            <th className="pb-2 font-medium text-right">{t.paymentsPage.amount}</th>
          </tr>
        </thead>
        <tbody>
          {PAYMENTS.map((p) => (
            <tr key={p.id} className="border-b border-[#0B2545]/6">
              <td className="py-2.5 font-mono text-[#0B2545]">{p.id}</td>
              <td className="py-2.5 font-mono text-[#0B2545]/60">{p.code}</td>
              <td className="py-2.5 text-[#0B2545]/70">{p.payer}</td>
              <td className="py-2.5 text-[#0B2545]/55">{t.paymentsPage[`method_${p.method}`]}</td>
              <td className="py-2.5 text-[#0B2545]/55">{p.date}</td>
              <td className="py-2.5 font-mono font-medium text-[#0B2545] text-right">TZS {p.amount.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FleetReport({ t }) {
  const tx = t.reportsPage;
  const active = TRUCKS.filter((tr) => tr.status === "active").length;
  const avgUtil = Math.round(TRUCKS.reduce((s, tr) => s + tr.utilization, 0) / TRUCKS.length);
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: tx.totalTrucks, value: TRUCKS.length, color: "text-[#0B2545]" },
          { label: tx.activeTrucks, value: active, color: "text-[#16A34A]" },
          { label: tx.avgUtil, value: `${avgUtil}%`, color: "text-[#E63946]" },
        ].map(({ label, value, color }) => (
          <div key={label} className="text-center py-4 rounded-xl bg-[#F7F8FA]">
            <div className={`font-mono font-bold text-[1.8rem] ${color}`}>{value}</div>
            <div className="text-[0.78rem] text-[#0B2545]/45 mt-1">{label}</div>
          </div>
        ))}
      </div>
      <table className="w-full text-left border-collapse text-[0.84rem]">
        <thead>
          <tr className="border-b-2 border-[#0B2545]/10 text-[0.72rem] font-mono uppercase tracking-wider text-[#0B2545]/40">
            <th className="pb-2 font-medium">{tx.truckId}</th>
            <th className="pb-2 font-medium">{tx.model}</th>
            <th className="pb-2 font-medium">{tx.driver}</th>
            <th className="pb-2 font-medium">{t.fleetPage.utilization}</th>
            <th className="pb-2 font-medium text-right">{tx.statusLabel}</th>
          </tr>
        </thead>
        <tbody>
          {TRUCKS.map((tr) => (
            <tr key={tr.id} className="border-b border-[#0B2545]/6">
              <td className="py-2.5 font-mono font-medium text-[#0B2545]">{tr.id}</td>
              <td className="py-2.5 text-[#0B2545]/70">{tr.model} · {tr.capacity}</td>
              <td className="py-2.5 text-[#0B2545]/55">{tr.driver}</td>
              <td className="py-2.5">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-[#0B2545]/8 overflow-hidden">
                    <div className="h-full rounded-full bg-[#E63946]" style={{ width: `${tr.utilization}%` }} />
                  </div>
                  <span className="font-mono text-[0.8rem] text-[#0B2545]/55 w-8 text-right">{tr.utilization}%</span>
                </div>
              </td>
              <td className="py-2.5 text-right">
                <span className="font-medium text-[0.8rem] text-[#0B2545]/60 capitalize">{tr.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DriversReport({ t }) {
  const tx = t.reportsPage;
  const onRoute = DRIVERS.filter((d) => d.status === "route").length;
  const avgRating = (DRIVERS.reduce((s, d) => s + d.rating, 0) / DRIVERS.length).toFixed(1);
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: tx.totalDrivers, value: DRIVERS.length, color: "text-[#0B2545]" },
          { label: tx.onRoute, value: onRoute, color: "text-[#16A34A]" },
          { label: tx.avgRating, value: avgRating, color: "text-[#F59E0B]" },
        ].map(({ label, value, color }) => (
          <div key={label} className="text-center py-4 rounded-xl bg-[#F7F8FA]">
            <div className={`font-mono font-bold text-[1.8rem] ${color}`}>{value}</div>
            <div className="text-[0.78rem] text-[#0B2545]/45 mt-1">{label}</div>
          </div>
        ))}
      </div>
      <table className="w-full text-left border-collapse text-[0.84rem]">
        <thead>
          <tr className="border-b-2 border-[#0B2545]/10 text-[0.72rem] font-mono uppercase tracking-wider text-[#0B2545]/40">
            <th className="pb-2 font-medium">{tx.driverName}</th>
            <th className="pb-2 font-medium">{tx.contact}</th>
            <th className="pb-2 font-medium">{tx.assignedTruck}</th>
            <th className="pb-2 font-medium">{tx.tripsLabel}</th>
            <th className="pb-2 font-medium text-right">{tx.ratingLabel}</th>
          </tr>
        </thead>
        <tbody>
          {DRIVERS.map((d) => (
            <tr key={d.name} className="border-b border-[#0B2545]/6">
              <td className="py-2.5 font-medium text-[#0B2545]">{d.name}</td>
              <td className="py-2.5 font-mono text-[#0B2545]/55">{d.phone}</td>
              <td className="py-2.5 text-[#0B2545]/55">{d.truck}</td>
              <td className="py-2.5 font-mono text-[#0B2545]/55">{d.trips}</td>
              <td className="py-2.5 font-mono font-medium text-[#0B2545] text-right">★ {d.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const REPORT_CONTENT = { shipments: ShipmentsReport, payments: PaymentsReport, fleet: FleetReport, drivers: DriversReport };

export default function Reports({ t }) {
  const [active, setActive] = useState(null);
  const tx = t.reportsPage;
  const today = new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });

  const ReportBody = active ? REPORT_CONTENT[active] : null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <PageHeader title={tx.title} sub={tx.sub} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {REPORT_TYPES.map((type, i) => (
          <Reveal key={type.key} delay={i * 60}>
            <ReportTypeCard type={type} active={active === type.key} onClick={() => setActive(active === type.key ? null : type.key)} t={t} />
          </Reveal>
        ))}
      </div>

      {ReportBody && (
        <Reveal>
          <div className="rounded-2xl bg-white border border-[#0B2545]/8 overflow-hidden" id="cf-report">
            <div className="flex items-center justify-between px-8 py-5 border-b border-[#0B2545]/8">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[0.72rem] font-mono uppercase tracking-wider text-[#0B2545]/35 mb-1">
                  <FileText size={12} /> CourierFlow · {tx.officialReport}
                </div>
                <h3 className="font-display font-bold text-[#0B2545] text-[1.1rem]">{tx[`${active}Title`]}</h3>
                <p className="text-[0.8rem] text-[#0B2545]/40 mt-0.5">{tx.generatedOn}: {today}</p>
              </div>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 rounded-[10px] bg-[#0B2545] px-5 py-2.5 text-[0.88rem] font-semibold text-white hover:bg-[#0B2545]/85 transition-colors cursor-pointer"
              >
                <Printer size={15} /> {tx.print}
              </button>
            </div>

            <div className="px-8 py-6 overflow-x-auto">
              <ReportBody t={t} />
            </div>

            <div className="px-8 py-4 bg-[#F7F8FA] border-t border-[#0B2545]/8 flex items-center justify-between text-[0.76rem] text-[#0B2545]/35 font-mono">
              <span>CourierFlow Freight & Logistics · Tanzania</span>
              <span>{tx.confidential}</span>
            </div>
          </div>
        </Reveal>
      )}

      <style>{`
        @media print {
          body > * { display: none !important; }
          #cf-report { display: block !important; border: none !important; box-shadow: none !important; }
          #cf-report button { display: none !important; }
        }
      `}</style>
    </div>
  );
}
