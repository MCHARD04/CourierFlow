import { useEffect, useState } from "react";
import { CITIES } from "./mapCities.js";

function TruckMarker({ pathPts }) {
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setT((v) => (v + 0.004) % 1), 16);
    return () => clearInterval(id);
  }, []);
  const segCount = pathPts.length - 1;
  const segT = t * segCount;
  const segIdx = Math.min(Math.floor(segT), segCount - 1);
  const localT = segT - segIdx;
  const a = pathPts[segIdx];
  const b = pathPts[segIdx + 1];
  const x = a.x + (b.x - a.x) * localT;
  const y = a.y + (b.y - a.y) * localT;
  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle r="1.4" fill="#FFFFFF" />
      <circle r="2.4" fill="none" stroke="#FFFFFF" strokeWidth="0.25" opacity="0.6" />
    </g>
  );
}

export default function RouteMap({ route = "dar,morogoro,dodoma,mwanza" }) {
  const path = route.split(",");
  const get = (id) => CITIES.find((c) => c.id === id);
  const linePts = path.map((id) => get(id));
  const linePath = linePts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  const [dashOffset, setDashOffset] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setDashOffset((v) => (v - 1 + 1000) % 1000), 40);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="grid" width="6" height="6" patternUnits="userSpaceOnUse">
            <path d="M 6 0 L 0 0 0 6" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
        {CITIES.map((c) => (
          <line key={c.id} x1="86" y1="78" x2={c.x} y2={c.y} stroke="rgba(255,255,255,0.06)" strokeWidth="0.4" />
        ))}
        <path d={linePath} fill="none" stroke="#E63946" strokeWidth="0.9" strokeLinecap="round" strokeDasharray="2 2" strokeDashoffset={dashOffset} opacity="0.9" />
        <path d={linePath} fill="none" stroke="#E63946" strokeWidth="0.35" strokeLinecap="round" opacity="0.5" />
        {CITIES.map((c) => {
          const active = path.includes(c.id);
          return (
            <g key={c.id}>
              <circle cx={c.x} cy={c.y} r={active ? 1.6 : 1} fill={active ? "#E63946" : "rgba(255,255,255,0.35)"} />
              {active && <circle cx={c.x} cy={c.y} r="3" fill="none" stroke="#E63946" strokeWidth="0.3" opacity="0.5" />}
              <text x={c.x} y={c.y - 3} fontSize="2.6" fill={active ? "#FFFFFF" : "rgba(255,255,255,0.45)"} fontFamily="Inter, sans-serif" textAnchor="middle">
                {c.name}
              </text>
            </g>
          );
        })}
        <TruckMarker pathPts={linePts} />
      </svg>
    </div>
  );
}
