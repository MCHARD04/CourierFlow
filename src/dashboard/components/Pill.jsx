export default function Pill({ className = "", children }) {
  return <span className={`inline-block rounded-full px-2.5 py-1 text-[0.72rem] font-medium ${className}`}>{children}</span>;
}
