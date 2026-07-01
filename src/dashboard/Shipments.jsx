import { useMemo, useState } from "react";
import { Package } from "lucide-react";
import PageHeader from "./components/PageHeader.jsx";
import FilterTabs from "./components/FilterTabs.jsx";
import SearchBox from "./components/SearchBox.jsx";
import Reveal from "../components/Reveal.jsx";
import { SHIPMENTS } from "./data.js";
import { SHIPMENT_STATUS_STYLE } from "./statusStyles.js";

const STATUSES = ["transit", "delivered", "delayed", "loading"];

export default function Shipments({ t }) {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const tx = t.shipmentsPage;

  const counts = useMemo(() => {
    const c = { all: SHIPMENTS.length };
    STATUSES.forEach((s) => (c[s] = SHIPMENTS.filter((sh) => sh.status === s).length));
    return c;
  }, []);

  const filtered = useMemo(() => {
    return SHIPMENTS.filter((s) => {
      const matchesStatus = filter === "all" || s.status === filter;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q || s.code.toLowerCase().includes(q) || s.route.toLowerCase().includes(q) || s.driver.toLowerCase().includes(q) || s.payer.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [filter, query]);

  const tabs = [
    { key: "all", label: tx.filterAll, count: counts.all },
    ...STATUSES.map((s) => ({ key: s, label: t.table[`status_${s}`], count: counts[s] })),
  ];

  return (
    <div className="space-y-5">
      <PageHeader title={tx.title} sub={tx.sub} />

      <Reveal delay={60}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <FilterTabs tabs={tabs} active={filter} onChange={setFilter} />
          <SearchBox value={query} onChange={setQuery} placeholder={tx.searchPlaceholder} />
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div className="rounded-2xl bg-white border border-[#0B2545]/8 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <Package size={28} className="mx-auto text-[#0B2545]/20" />
              <p className="mt-3 text-[0.9rem] text-[#0B2545]/45">{tx.empty}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[0.72rem] font-mono uppercase tracking-wider text-[#0B2545]/40">
                    <th className="px-6 py-3 font-medium">{t.table.code}</th>
                    <th className="px-4 py-3 font-medium">{t.table.route}</th>
                    <th className="px-4 py-3 font-medium hidden md:table-cell">{t.table.truck}</th>
                    <th className="px-4 py-3 font-medium hidden lg:table-cell">{tx.weight}</th>
                    <th className="px-4 py-3 font-medium hidden lg:table-cell">{tx.payer}</th>
                    <th className="px-4 py-3 font-medium">{t.table.status}</th>
                    <th className="px-6 py-3 font-medium text-right">{t.table.eta}</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s) => (
                    <tr key={s.code} className="border-t border-[#0B2545]/6 hover:bg-[#0B2545]/[0.025] transition-colors">
                      <td className="px-6 py-3.5 font-mono text-[0.84rem] text-[#0B2545]">{s.code}</td>
                      <td className="px-4 py-3.5 text-[0.86rem] text-[#0B2545]/75">{s.route}</td>
                      <td className="px-4 py-3.5 text-[0.84rem] text-[#0B2545]/55 hidden md:table-cell">
                        {s.truck} · {s.driver}
                      </td>
                      <td className="px-4 py-3.5 text-[0.84rem] font-mono text-[#0B2545]/55 hidden lg:table-cell">{s.weight}</td>
                      <td className="px-4 py-3.5 text-[0.84rem] text-[#0B2545]/55 hidden lg:table-cell">{s.payer}</td>
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
          )}
          <div className="px-6 py-3.5 border-t border-[#0B2545]/8 text-[0.78rem] text-[#0B2545]/40">
            {tx.showing.replace("{n}", filtered.length).replace("{total}", SHIPMENTS.length)}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
