import { useState } from "react";

export default function Avatar({ name, size = 40, className = "" }) {
  const [errored, setErrored] = useState(false);
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0B2545&color=fff&bold=true&size=${size * 2}`;

  if (errored) {
    return (
      <div
        className={`rounded-full bg-[#0B2545] text-white font-mono font-semibold flex items-center justify-center shrink-0 ${className}`}
        style={{ width: size, height: size, fontSize: size * 0.36 }}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      loading="lazy"
      onError={() => setErrored(true)}
      className={`rounded-full object-cover shrink-0 ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
