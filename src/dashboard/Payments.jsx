import { useMemo, useState } from "react";
import { Smartphone, TrendingUp, Clock, AlertTriangle } from "lucide-react";
import PageHeader from "./components/PageHeader.jsx";
import FilterTabs from "./components/FilterTabs.jsx";
import SearchBox from "./components/SearchBox.jsx";
import Reveal from "../components/Reveal.jsx";
import CountUp from "../components/CountUp.jsx";
import { PAYMENTS } from "./data.js";
import { PAYMENT_STATUS_STYLE, PAYMENT_METHOD_STYLE } from "./statusStyles.js";

const STATUSES = ["paid", "pending", "failed"];

function formatTzs(n) {
  return n.toLocaleString("en-US");
}

function SummaryTile({ icon: Icon, label, value, prefix = "", suffix = "", decimals = 0 }) {
  return (
    <div className="rounded-2xl bg-white border border-[#0B2545]/8 p-5">
      <div className="h-9 w-9 rounded-[9px] bg-[#0B2545]/6 flex items-center justify-center mb-3">
        <Icon size={16} className="text-[#0B2545]" />
      </div>
      <div className="font-mono font-bold text-[#0B2545] text-[1.3rem] tabular-nums">
        {prefix}
        <CountUp value={value} decimals={decimals} />
        {suffix}
      </div>
      <div className="mt-1 text-[0.8rem] text-[#0B2545]/45">{label}</div>
    </div>
  );
}

export default function Payments({ t }) {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const tx = t.paymentsPage;

  const counts = useMemo(() => {
    const c = { all: PAYMENTS.length };
    STATUSES.forEach((s) => (c[s] = PAYMENTS.filter((p) => p.status === s).length));
    return c;
  }, []);

  const totals = useMemo(() => {
    const paid = PAYMENTS.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0);
    const pending = PAYMENTS.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amount, 0);
    const avg = Math.round(PAYMENTS.reduce((sum, p) => sum + p.amount, 0) / PAYMENTS.length);
    return { paid, pending, avg };
  }, []);

  const filtered = useMemo(() => {
    return PAYMENTS.filter((p) => {
      const matchesStatus = filter === "all" || p.status === filter;
      const q = query.trim().toLowerCase();
      const matchesQuery = !q || p.id.toLowerCase().includes(q) || p.code.toLowerCase().includes(q) || p.payer.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [filter, query]);

  const tabs = [
    { key: "all", label: tx.filterAll, count: counts.all },
    ...STATUSES.map((s) => ({ key: s, label: tx[`status_${s}`], count: counts[s] })),
  ];

  return (
    <div className="space-y-5">
      <PageHeader title={tx.title} sub={tx.sub} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Reveal delay={0}>
          <SummaryTile icon={TrendingUp} label={tx.collected} value={totals.paid / 1000000} decimals={1} prefix="TZS " suffix="M" />
        </Reveal>
        <Reveal delay={50}>
          <SummaryTile icon={Clock} label={tx.pendingAmount} value={totals.pending / 1000000} decimals={1} prefix="TZS " suffix="M" />
        </Reveal>
        <Reveal delay={100}>
          <SummaryTile icon={AlertTriangle} label={tx.failedCount} value={counts.failed} />
        </Reveal>
        <Reveal delay={150}>
          <SummaryTile icon={Smartphone} label={tx.avgValue} value={totals.avg / 1000} suffix="K" />
        </Reveal>
      </div>

      <Reveal delay={180}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <FilterTabs tabs={tabs} active={filter} onChange={setFilter} />
          <SearchBox value={query} onChange={setQuery} placeholder={tx.searchPlaceholder} />
        </div>
      </Reveal>

      <Reveal delay={220}>
        <div className="rounded-2xl bg-white border border-[#0B2545]/8 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[0.72rem] font-mono uppercase tracking-wider text-[#0B2545]/40">
                  <th className="px-6 py-3 font-medium">{tx.id}</th>
                  <th className="px-4 py-3 font-medium">{t.table.code}</th>
                  <th className="px-4 py-3 font-medium hidden md:table-cell">{tx.payer}</th>
                  <th className="px-4 py-3 font-medium">{tx.method}</th>
                  <th className="px-4 py-3 font-medium">{tx.status}</th>
                  <th className="px-4 py-3 font-medium hidden sm:table-cell">{tx.date}</th>
                  <th className="px-6 py-3 font-medium text-right">{tx.amount}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-t border-[#0B2545]/6 hover:bg-[#0B2545]/[0.025] transition-colors">
                    <td className="px-6 py-3.5 font-mono text-[0.82rem] text-[#0B2545]">{p.id}</td>
                    <td className="px-4 py-3.5 font-mono text-[0.82rem] text-[#0B2545]/70">{p.code}</td>
                    <td className="px-4 py-3.5 text-[0.86rem] text-[#0B2545]/75 hidden md:table-cell">{p.payer}</td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-block rounded-full px-2.5 py-1 text-[0.72rem] font-medium ${PAYMENT_METHOD_STYLE[p.method]}`}>
                        {tx[`method_${p.method}`]}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-block rounded-full px-2.5 py-1 text-[0.72rem] font-medium ${PAYMENT_STATUS_STYLE[p.status]}`}>
                        {tx[`status_${p.status}`]}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-[0.82rem] text-[#0B2545]/50 hidden sm:table-cell">{p.date}</td>
                    <td className="px-6 py-3.5 text-[0.86rem] font-mono text-[#0B2545] text-right">TZS {formatTzs(p.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
