import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function FormField({ label, type = "text", value, onChange, placeholder, icon }) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  return (
    <div>
      <label className="text-[0.84rem] font-medium text-[#0B2545]/80">{label}</label>
      <div className="mt-1.5 relative">
        <input
          type={isPassword && show ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-[10px] border border-[#0B2545]/15 bg-white px-4 py-3 text-[0.92rem] text-[#0B2545] placeholder:text-[#0B2545]/30 outline-none transition-colors focus:border-[#E63946]/50 focus:ring-2 focus:ring-[#E63946]/10"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#0B2545]/35 hover:text-[#0B2545]/60 cursor-pointer"
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        )}
      </div>
    </div>
  );
}
