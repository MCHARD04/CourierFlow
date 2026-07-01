import Reveal from "../../components/Reveal.jsx";

export default function PageHeader({ title, sub, action }) {
  return (
    <Reveal>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="font-display font-bold text-[#0B2545] text-[1.45rem] sm:text-[1.65rem] tracking-tight">{title}</h2>
          {sub && <p className="mt-1 text-[#0B2545]/50 text-[0.92rem]">{sub}</p>}
        </div>
        {action}
      </div>
    </Reveal>
  );
}
