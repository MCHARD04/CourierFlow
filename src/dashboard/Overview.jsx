import { Package, Truck, Wallet, Clock, TrendingUp, TrendingDown, ShieldCheck, Award, Users, ArrowRight } from "lucide-react";
import RouteMap from "../components/RouteMap.jsx";
import Reveal from "../components/Reveal.jsx";
import CountUp from "../components/CountUp.jsx";
import { SHIPMENTS } from "./data.js";
import { SHIPMENT_STATUS_STYLE } from "./statusStyles.js";

const STATS = [
  { key: "shipments", icon: Package, value: 184, trend: 12.4, dir: "up" },
  { key: "trucks", icon: Truck, value: 142, suffix: "/180", trend: 4, dir: "up" },
  { key: "revenue", icon: Wallet, value: 18.4, decimals: 1, prefix: "TZS ", suffix: "M", trend: 9.2, dir: "up" },
  { key: "onTime", icon: Clock, value: 97, suffix: "%", trend: 1.2, dir: "up" },
];

const TRUST_ICONS = [ShieldCheck, Award, Users, Clock];

function StatCard({ stat, label }) {
  const Icon = stat.icon;
  const TrendIcon = stat.dir === "up" ? TrendingUp : TrendingDown;
  return (
    <div className="group rounded-2xl bg-white border border-[#0B2545]/8 p-5 transition-all hover:border-[#E63946]/25 hover:shadow-[0_16px_32px_-20px_rgba(11,37,69,0.2)]">
      <div className="flex items-center justify-between">
        <div className="h-9 w-9 rounded-[9px] bg-[#0B2545]/6 flex items-center justify-center transition-colors group-hover:bg-[#E63946]/10">
          <Icon size={16} className="text-[#0B2545] group-hover:text-[#E63946] transition-colors" />
        </div>
        <span
          className={`inline-flex items-center gap-0.5 text-[0.72rem] font-mono font-medium ${
            stat.dir === "up" ? "text-[#16A34A]" : "text-[#E63946]"
          }`}
        >
          <TrendIcon size={12} /> {stat.trend}%
        </span>
      </div>
      <div className="mt-4 font-mono font-bold text-[#0B2545] text-[1.45rem] sm:text-[1.55rem] tabular-nums">
        {stat.prefix}
        <CountUp value={stat.value} decimals={stat.decimals ?? 0} />
        {stat.suffix}
      </div>
      <div className="mt-1 text-[0.8rem] text-[#0B2545]/45">{label}</div>
    </div>
  );
}

function ShipmentsTable({ t, onViewAll }) {
  return (
    <div className="rounded-2xl bg-white border border-[#0B2545]/8 overflow-hidden h-full flex flex-col">
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#0B2545]/8">
        <h3 className="font-display font-semibold text-[#0B2545] text-[1.02rem]">{t.table.title}</h3>
        <button
          onClick={onViewAll}
          className="inline-flex items-center gap-1 text-[0.82rem] font-medium text-[#E63946] hover:underline cursor-pointer"
        >
          {t.table.viewAll} <ArrowRight size={13} />
        </button>
      </div>
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[0.72rem] font-mono uppercase tracking-wider text-[#0B2545]/40">
              <th className="px-6 py-3 font-medium">{t.table.code}</th>
              <th className="px-4 py-3 font-medium">{t.table.route}</th>
              <th className="px-4 py-3 font-medium hidden sm:table-cell">{t.table.truck}</th>
              <th className="px-4 py-3 font-medium">{t.table.status}</th>
              <th className="px-6 py-3 font-medium text-right">{t.table.eta}</th>
            </tr>
          </thead>
          <tbody>
            {SHIPMENTS.slice(0, 5).map((s) => (
              <tr key={s.code} className="border-t border-[#0B2545]/6 hover:bg-[#0B2545]/[0.025] transition-colors">
                <td className="px-6 py-3.5 font-mono text-[0.84rem] text-[#0B2545]">{s.code}</td>
                <td className="px-4 py-3.5 text-[0.86rem] text-[#0B2545]/75">{s.route}</td>
                <td className="px-4 py-3.5 text-[0.84rem] text-[#0B2545]/55 hidden sm:table-cell">
                  {s.truck} · {s.driver}
                </td>
                <td className="px-4 py-3.5">
                  <span className={`inline-block rounded-full px-2.5 py-1 text-[0.72rem] font-medium ${SHIPMENT_STATUS_STYLE[s.status]}`}>
                    {t.table[`status_${s.status}`]}
                  </span>
                </td>
                <td className="px-6 py-3.5 text-[0.84rem] font-mono text-[#0B2545]/55 text-right">{s.eta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FleetMapCard({ t }) {
  return (
    <div className="rounded-2xl bg-[#0B2545] border border-white/10 overflow-hidden h-full flex flex-col min-h-[320px]">
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
        <h3 className="font-display font-semibold text-white text-[1.02rem]">{t.map.title}</h3>
        <span className="inline-flex items-center gap-1.5 text-[0.76rem] font-mono text-white/50">
          <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
          {t.map.active}
        </span>
      </div>
      <div className="relative flex-1">
        <RouteMap />
      </div>
    </div>
  );
}

function TrustStrip({ t }) {
  return (
    <div className="rounded-2xl bg-white border border-[#0B2545]/8 p-6">
      <p className="text-[0.72rem] font-mono uppercase tracking-[0.14em] text-[#0B2545]/35 mb-5">{t.trust.eyebrow}</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {t.trust.items.map((item, i) => {
          const Icon = TRUST_ICONS[i];
          return (
            <div key={i} className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-[9px] bg-[#0B2545]/6 flex items-center justify-center shrink-0">
                <Icon size={16} className="text-[#0B2545]" />
              </div>
              <div>
                <div className="font-mono font-bold text-[#0B2545] text-[1.05rem]">{item.stat}</div>
                <div className="text-[0.78rem] text-[#0B2545]/45 leading-snug">{item.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Overview({ t, onNavigate }) {
  return (
    <div className="space-y-6">
      <Reveal>
        <div>
          <h2 className="font-display font-bold text-[#0B2545] text-[1.45rem] sm:text-[1.65rem] tracking-tight">
            {t.overview.greeting}
          </h2>
          <p className="mt-1 text-[#0B2545]/50 text-[0.92rem]">{t.overview.sub}</p>
        </div>
      </Reveal>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
          <Reveal key={s.key} delay={i * 70}>
            <StatCard stat={s} label={t.stats[s.key]} />
          </Reveal>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-5 items-stretch">
        <Reveal delay={140}>
          <ShipmentsTable t={t} onViewAll={() => onNavigate("shipments")} />
        </Reveal>
        <Reveal delay={200}>
          <FleetMapCard t={t} />
        </Reveal>
      </div>

      <Reveal delay={260}>
        <TrustStrip t={t} />
      </Reveal>
    </div>
  );
}
