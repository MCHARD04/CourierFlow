import { CITIES } from "./mapCities.js";

function buildPath(pts) {
  return pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
}

function pointAtProgress(pts, t) {
  const segCount = pts.length - 1;
  if (segCount <= 0) return { ...pts[0], segIdx: 0 };
  const segT = Math.min(Math.max(t, 0), 1) * segCount;
  const segIdx = Math.min(Math.floor(segT), segCount - 1);
  const localT = segT - segIdx;
  const a = pts[segIdx];
  const b = pts[segIdx + 1];
  return { x: a.x + (b.x - a.x) * localT, y: a.y + (b.y - a.y) * localT, segIdx };
}

export default function TrackingMap({ route = "dar,morogoro,dodoma,mwanza", progress = 0.5, arrived = false }) {
  const ids = route.split(",");
  const get = (id) => CITIES.find((c) => c.id === id);
  const pts = ids.map((id) => get(id)).filter(Boolean);

  const current = pointAtProgress(pts, progress);
  const traveledPts = [...pts.slice(0, current.segIdx + 1), { x: current.x, y: current.y }];
  const remainingPts = [{ x: current.x, y: current.y }, ...pts.slice(current.segIdx + 1)];

  const origin = pts[0];
  const destination = pts[pts.length - 1];

  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="trackGrid" width="6" height="6" patternUnits="userSpaceOnUse">
            <path d="M 6 0 L 0 0 0 6" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#trackGrid)" />

        {CITIES.map((c) => (
          <circle key={c.id} cx={c.x} cy={c.y} r={0.8} fill="rgba(255,255,255,0.25)" />
        ))}

        <path d={buildPath(remainingPts)} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7" strokeLinecap="round" strokeDasharray="2 2" />
        <path d={buildPath(traveledPts)} fill="none" stroke="#E63946" strokeWidth="1" strokeLinecap="round" />

        {pts.map((p, i) => {
          const isOrigin = i === 0;
          const isDestination = i === pts.length - 1;
          return (
            <g key={`${p.x}-${p.y}-${i}`}>
              <circle cx={p.x} cy={p.y} r={isDestination ? 1.8 : 1.3} fill={isDestination && arrived ? "#16A34A" : "#FFFFFF"} />
              {isDestination && (
                <circle cx={p.x} cy={p.y} r="3.2" fill="none" stroke={arrived ? "#16A34A" : "#FFFFFF"} strokeWidth="0.35" opacity="0.5" />
              )}
              <text
                x={p.x}
                y={p.y - 3.4}
                fontSize="2.8"
                fontWeight={isOrigin || isDestination ? 600 : 400}
                fill="#FFFFFF"
                fontFamily="Inter, sans-serif"
                textAnchor="middle"
              >
                {get(ids[i])?.name}
              </text>
            </g>
          );
        })}

        {!arrived && (
          <g transform={`translate(${current.x}, ${current.y})`}>
            <circle r="3" fill="none" stroke="#E63946" strokeWidth="0.4" opacity="0.55" className="motion-safe:animate-ping" style={{ transformOrigin: "center", animationDuration: "2.2s" }} />
            <circle r="1.6" fill="#E63946" stroke="#FFFFFF" strokeWidth="0.4" />
          </g>
        )}
      </svg>
    </div>
  );
}
