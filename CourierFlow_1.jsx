import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  MapPin,
  Smartphone,
  Camera,
  Truck,
  Check,
  Menu,
  X,
  ChevronDown,
  Package,
  Clock,
  ShieldCheck,
  Eye,
  EyeOff,
} from "lucide-react";

/* ============================================================
   COURIERFLOW — Intercity trucking & cargo platform (Tanzania)
   Brand: Navy / Signal Red / Off-white, geometric "route hook" mark
   ============================================================ */

const COPY = {
  en: {
    nav: { features: "Features", how: "How it works", pricing: "Pricing", faq: "FAQ", signin: "Sign in", start: "Get started" },
    hero: {
      eyebrow: "Built for Tanzanian trucking fleets",
      title: "Every truck.\nEvery route.\nOne dashboard.",
      sub: "CourierFlow dispatches drivers, tracks cargo between cities in real time, and settles payment by mobile money — built for intercity freight across Tanzania.",
      ctaPrimary: "Get started — it's free",
      ctaSecondary: "Sign in to dashboard",
      trackLabel: "Track a shipment",
      trackPlaceholder: "Enter tracking code, e.g. CF-7K2M",
      trackBtn: "Track",
      stats: [
        { value: "12,400+", label: "Shipments moved" },
        { value: "97%", label: "On-time arrivals" },
        { value: "180+", label: "Trucks on the network" },
        { value: "26", label: "Regions covered" },
      ],
    },
    routeStrip: "Dar es Salaam · Dodoma · Mwanza · Arusha · Mbeya · Tanga · Morogoro · Iringa",
    features: {
      eyebrow: "Everything you need",
      title: "One platform, the whole haul",
      sub: "From the loading bay to the final signature, see and control every leg of the journey.",
      items: [
        { icon: "map", title: "Live route tracking", body: "Watch every truck move between cities, with live GPS and ETA that updates as conditions change." },
        { icon: "phone", title: "Mobile money settlement", body: "Collect freight charges via M-Pesa, Tigo Pesa and Airtel Money the moment cargo is delivered." },
        { icon: "camera", title: "Proof of delivery", body: "Photo, signature and GPS stamp captured at handover — disputes settled in seconds, not days." },
        { icon: "truck", title: "Fleet & driver management", body: "Onboard drivers, assign trucks to routes, and see fleet utilisation across every region you serve." },
      ],
    },
    how: {
      eyebrow: "How it works",
      title: "From loading bay to signed receipt",
      steps: [
        { title: "Create a shipment", body: "Enter the cargo, route and consignee. A tracking code is generated the moment you save it." },
        { title: "Assign a truck", body: "Dispatch to any driver on the route. They get a mobile portal with turn-by-turn updates." },
        { title: "Track & settle", body: "Follow the truck live, capture proof on arrival, and collect payment by mobile money." },
      ],
    },
    trust: {
      eyebrow: "Trusted by fleets across Tanzania",
      title: "Built with operators, not just for them",
      quotes: [
        { quote: "We used to lose a full day chasing paperwork between Dar and Mbeya. Now the proof of delivery settles every dispute on the spot.", name: "Amani Mwakalinga", role: "Fleet Manager, Highway Cargo Ltd" },
        { quote: "Drivers picked up the phone portal in an afternoon. Even on the Iringa route where signal drops, the queue just catches up later.", name: "Devotha Kileo", role: "Operations Lead, Nyota Logistics" },
        { quote: "Mobile money confirmations land in the dashboard before the truck has even left the gate. Collections used to be our biggest headache.", name: "Ramadhani Chuma", role: "Owner, Chuma Freight" },
      ],
    },
    pricing: {
      eyebrow: "Pricing",
      title: "Plans that scale with your fleet",
      sub: "Start free. Upgrade as your routes grow.",
      tiers: [
        { name: "Solo", desc: "For owner-operators running a single truck.", price: "0", period: "/month", cta: "Start free", features: ["Up to 40 shipments / mo", "1 truck", "Live route tracking", "Mobile money settlement"], popular: false },
        { name: "Fleet", desc: "For growing haulage companies.", price: "65,000", period: "TZS /month", cta: "Start 14-day trial", features: ["Unlimited shipments", "Up to 20 trucks", "Fleet map & GPS", "Proof of delivery", "SMS notifications"], popular: true },
        { name: "Enterprise", desc: "For large regional fleets.", price: "Custom", period: "", cta: "Contact sales", features: ["Everything in Fleet", "Unlimited trucks", "Priority support", "Custom integrations", "Dedicated account manager"], popular: false },
      ],
      note: "Prices in TZS. VAT may apply. Cancel anytime.",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Questions, answered",
      items: [
        { q: "Do I need special hardware to start?", a: "No. CourierFlow runs in the browser for dispatchers and on drivers' phones — no extra devices needed." },
        { q: "Which payment methods are supported?", a: "M-Pesa, Tigo Pesa and Airtel Money. Consignees pay directly and you see it confirmed in real time." },
        { q: "Can drivers use it without strong signal?", a: "Yes. The driver app queues GPS pings and proof of delivery offline, and syncs once signal returns." },
        { q: "Is there a setup fee?", a: "None. Start on the free Solo plan and upgrade only once your shipment volume grows." },
        { q: "How do consignees track their cargo?", a: "Every shipment gets a public tracking code they can follow live — no account required." },
      ],
    },
    finalCta: { title: "Ready to move your fleet online?", sub: "Set up your haulage business in minutes.", primary: "Create your account", secondary: "Book a demo" },
    footer: {
      tag: "Intercity freight management, built for Tanzania.",
      product: "Product", company: "Company", legal: "Legal",
      productLinks: ["Features", "Pricing", "Live tracking", "Sign in"],
      companyLinks: ["How it works", "Contact", "FAQ"],
      legalLinks: ["Privacy policy", "Terms of service"],
      madeIn: "Made in Tanzania",
    },
    auth: {
      signinTitle: "Welcome back",
      signinSub: "Sign in to manage your fleet.",
      signupTitle: "Create your account",
      signupSub: "Set up dispatch for your fleet in minutes.",
      name: "Full name", company: "Company name", email: "Email address", phone: "Phone number", password: "Password",
      signinBtn: "Sign in", signupBtn: "Create account",
      noAccount: "Don't have an account?", haveAccount: "Already have an account?",
      signupLink: "Create one", signinLink: "Sign in",
      back: "Back to home",
      orDivider: "or continue with",
      terms: "By continuing you agree to our Terms of Service and Privacy Policy.",
    },
  },
  sw: {
    nav: { features: "Vipengele", how: "Jinsi inavyofanya kazi", pricing: "Bei", faq: "Maswali", signin: "Ingia", start: "Anza sasa" },
    hero: {
      eyebrow: "Imejengwa kwa malori ya Tanzania",
      title: "Kila lori.\nKila njia.\nDashibodi moja.",
      sub: "CourierFlow inatuma madereva, inafuatilia mizigo kati ya miji kwa wakati halisi, na kulipia kupitia pesa za simu — imejengwa kwa usafirishaji wa mizigo kati ya miji Tanzania.",
      ctaPrimary: "Anza sasa — bure",
      ctaSecondary: "Ingia kwenye dashibodi",
      trackLabel: "Fuatilia mzigo",
      trackPlaceholder: "Weka namba ya ufuatiliaji, mfano CF-7K2M",
      trackBtn: "Fuatilia",
      stats: [
        { value: "12,400+", label: "Mizigo iliyosafirishwa" },
        { value: "97%", label: "Kuwasili kwa wakati" },
        { value: "180+", label: "Malori kwenye mtandao" },
        { value: "26", label: "Mikoa inayofikiwa" },
      ],
    },
    routeStrip: "Dar es Salaam · Dodoma · Mwanza · Arusha · Mbeya · Tanga · Morogoro · Iringa",
    features: {
      eyebrow: "Kila kitu unachohitaji",
      title: "Mfumo mmoja, safari nzima",
      sub: "Kutoka eneo la kupakia hadi sahihi ya mwisho, ona na dhibiti kila hatua ya safari.",
      items: [
        { icon: "map", title: "Ufuatiliaji wa njia moja kwa moja", body: "Tazama kila lori likisafiri kati ya miji, na GPS ya moja kwa moja na muda wa kuwasili unaobadilika." },
        { icon: "phone", title: "Malipo kwa pesa za simu", body: "Pokea malipo ya mzigo kupitia M-Pesa, Tigo Pesa na Airtel Money mara mzigo unapofika." },
        { icon: "camera", title: "Uthibitisho wa uwasilishaji", body: "Picha, sahihi na alama ya GPS zinapigwa wakati wa kukabidhi — migogoro inatatuliwa kwa sekunde." },
        { icon: "truck", title: "Usimamizi wa malori na madereva", body: "Sajili madereva, gawa malori kwa njia, na ona matumizi ya malori kwa kila mkoa unaohudumia." },
      ],
    },
    how: {
      eyebrow: "Jinsi inavyofanya kazi",
      title: "Kutoka eneo la kupakia hadi risiti iliyosainiwa",
      steps: [
        { title: "Tengeneza mzigo", body: "Weka taarifa za mzigo, njia na mpokeaji. Namba ya ufuatiliaji inatengenezwa mara unapohifadhi." },
        { title: "Gawa lori", body: "Tuma kwa dereva yeyote kwenye njia. Wanapata programu ya simu yenye maelekezo ya moja kwa moja." },
        { title: "Fuatilia na lipa", body: "Fuatilia lori likisafiri, kamata uthibitisho linapofika, na pokea malipo kwa pesa za simu." },
      ],
    },
    trust: {
      eyebrow: "Inatumiwa na makampuni ya mizigo Tanzania nzima",
      title: "Imejengwa pamoja na watendaji, sio kwa ajili yao tu",
      quotes: [
        { quote: "Tulikuwa tunapoteza siku nzima kufuatilia karatasi kati ya Dar na Mbeya. Sasa uthibitisho wa uwasilishaji unatatua mgogoro wowote papo hapo.", name: "Amani Mwakalinga", role: "Meneja wa Malori, Highway Cargo Ltd" },
        { quote: "Madereva walijifunza programu ya simu ndani ya saa chache. Hata njia ya Iringa ambapo mtandao unakatika, foleni inajaza yenyewe baadaye.", name: "Devotha Kileo", role: "Kiongozi wa Uendeshaji, Nyota Logistics" },
        { quote: "Uthibitisho wa pesa za simu unafika kwenye dashibodi kabla lori hata halijatoka geti. Ukusanyaji wa fedha ulikuwa kero yetu kubwa.", name: "Ramadhani Chuma", role: "Mmiliki, Chuma Freight" },
      ],
    },
    pricing: {
      eyebrow: "Bei",
      title: "Mipango inayokua na malori yako",
      sub: "Anza bure. Boresha pale njia zako zinapokua.",
      tiers: [
        { name: "Solo", desc: "Kwa wamiliki wa lori moja.", price: "0", period: "/mwezi", cta: "Anza bure", features: ["Mizigo 40 / mwezi", "Lori 1", "Ufuatiliaji wa njia", "Malipo kwa pesa za simu"], popular: false },
        { name: "Fleet", desc: "Kwa makampuni ya usafirishaji yanayokua.", price: "65,000", period: "TZS /mwezi", cta: "Anza siku 14 bure", features: ["Mizigo isiyo na kikomo", "Malori hadi 20", "Ramani ya malori & GPS", "Uthibitisho wa uwasilishaji", "Arifa za SMS"], popular: true },
        { name: "Enterprise", desc: "Kwa malori makubwa ya kikanda.", price: "Maalum", period: "", cta: "Wasiliana na mauzo", features: ["Kila kitu cha Fleet", "Malori yasiyo na kikomo", "Msaada wa kipaumbele", "Uunganishaji maalum", "Meneja wa akaunti maalum"], popular: false },
      ],
      note: "Bei kwa TZS. VAT inaweza kuongezwa. Ghairi wakati wowote.",
    },
    faq: {
      eyebrow: "Maswali",
      title: "Maswali, yamejibiwa",
      items: [
        { q: "Je nahitaji vifaa maalum kuanza?", a: "Hapana. CourierFlow inafanya kazi kwenye kivinjari kwa wasimamizi na kwenye simu za madereva — hauhitaji vifaa vya ziada." },
        { q: "Njia gani za malipo zinatumika?", a: "M-Pesa, Tigo Pesa na Airtel Money. Wapokeaji wanalipa moja kwa moja na unaona uthibitisho papo hapo." },
        { q: "Madereva wanaweza kutumia bila mtandao mzuri?", a: "Ndiyo. Programu ya dereva inahifadhi taarifa za GPS na uthibitisho nje ya mtandao, kisha inasawazisha mtandao unaporejea." },
        { q: "Je kuna ada ya kuanzisha?", a: "Hakuna. Anza kwenye mpango wa bure wa Solo na uboreshe tu pale mizigo yako inapokua." },
        { q: "Wapokeaji wanafuatiliaje mizigo yao?", a: "Kila mzigo unapata namba ya ufuatiliaji ya umma wanayoweza kufuatilia moja kwa moja — bila akaunti." },
      ],
    },
    finalCta: { title: "Tayari kuhamisha malori yako mtandaoni?", sub: "Anzisha biashara yako ya usafirishaji kwa dakika.", primary: "Fungua akaunti yako", secondary: "Weka miadi" },
    footer: {
      tag: "Usimamizi wa mizigo kati ya miji, imejengwa kwa Tanzania.",
      product: "Bidhaa", company: "Kampuni", legal: "Sheria",
      productLinks: ["Vipengele", "Bei", "Ufuatiliaji", "Ingia"],
      companyLinks: ["Jinsi inavyofanya kazi", "Wasiliana nasi", "Maswali"],
      legalLinks: ["Sera ya faragha", "Masharti ya huduma"],
      madeIn: "Imetengenezwa Tanzania",
    },
    auth: {
      signinTitle: "Karibu tena",
      signinSub: "Ingia kusimamia malori yako.",
      signupTitle: "Fungua akaunti yako",
      signupSub: "Anzisha utumaji wa malori yako kwa dakika.",
      name: "Jina kamili", company: "Jina la kampuni", email: "Barua pepe", phone: "Namba ya simu", password: "Nenosiri",
      signinBtn: "Ingia", signupBtn: "Fungua akaunti",
      noAccount: "Huna akaunti?", haveAccount: "Una akaunti tayari?",
      signupLink: "Fungua moja", signinLink: "Ingia",
      back: "Rudi mwanzo",
      orDivider: "au endelea na",
      terms: "Kwa kuendelea unakubaliana na Masharti ya Huduma na Sera ya Faragha.",
    },
  },
};

const ICONS = { map: MapPin, phone: Smartphone, camera: Camera, truck: Truck };

/* ---------- Reusable atoms ---------- */

function Logo({ light = false }) {
  return (
    <div className="flex items-center gap-2 select-none">
      <svg width="30" height="30" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M14 8 L14 20 Q14 26 20 26 L34 26" stroke="#E63946" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M22 40 L22 30 Q22 26 26 26 L40 26" stroke={light ? "#FFFFFF" : "#0B2545"} strokeWidth="6" strokeLinecap="round" fill="none" />
      </svg>
      <span
        className={`font-display font-bold text-[1.25rem] tracking-tight ${light ? "text-white" : "text-[#0B2545]"}`}
      >
        Courier<span className="text-[#E63946]">Flow</span>
      </span>
    </div>
  );
}

function Container({ children, className = "" }) {
  return <div className={`mx-auto w-full max-w-[1180px] px-6 ${className}`}>{children}</div>;
}

function Eyebrow({ children, light = false }) {
  return (
    <div
      className={`inline-flex items-center gap-2 text-[0.72rem] font-mono uppercase tracking-[0.18em] mb-4 ${
        light ? "text-white/60" : "text-[#8D99AE]"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${light ? "bg-[#E63946]" : "bg-[#E63946]"}`} />
      {children}
    </div>
  );
}

function PrimaryButton({ children, onClick, className = "", type = "button", icon = true }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`group inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#E63946] px-6 py-3.5 text-[0.95rem] font-semibold text-white transition-all hover:bg-[#D62C39] hover:shadow-[0_8px_24px_-8px_rgba(230,57,70,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63946] active:scale-[0.98] ${className}`}
    >
      {children}
      {icon && <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />}
    </button>
  );
}

function SecondaryButton({ children, onClick, className = "", light = false }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-[10px] border px-6 py-3.5 text-[0.95rem] font-semibold transition-all active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
        light
          ? "border-white/25 text-white hover:bg-white/10 focus-visible:outline-white"
          : "border-[#0B2545]/15 text-[#0B2545] hover:bg-[#0B2545]/5 focus-visible:outline-[#0B2545]"
      } ${className}`}
    >
      {children}
    </button>
  );
}

/* ---------- Route map signature element ---------- */

function RouteMap({ lang }) {
  const cities = [
    { id: "dar", name: "Dar es Salaam", x: 86, y: 78 },
    { id: "morogoro", name: "Morogoro", x: 68, y: 64 },
    { id: "dodoma", name: "Dodoma", x: 50, y: 48 },
    { id: "iringa", name: "Iringa", x: 46, y: 70 },
    { id: "mbeya", name: "Mbeya", x: 30, y: 82 },
    { id: "arusha", name: "Arusha", x: 60, y: 14 },
    { id: "mwanza", name: "Mwanza", x: 22, y: 24 },
  ];
  const path = "dar,morogoro,dodoma,mwanza".split(",");
  const get = (id) => cities.find((c) => c.id === id);
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
        {/* faint connections to all cities */}
        {cities.map((c) => (
          <line key={c.id} x1="86" y1="78" x2={c.x} y2={c.y} stroke="rgba(255,255,255,0.06)" strokeWidth="0.4" />
        ))}
        {/* active route */}
        <path d={linePath} fill="none" stroke="#E63946" strokeWidth="0.9" strokeLinecap="round" strokeDasharray="2 2" strokeDashoffset={dashOffset} opacity="0.9" />
        <path d={linePath} fill="none" stroke="#E63946" strokeWidth="0.35" strokeLinecap="round" opacity="0.5" />
        {/* cities */}
        {cities.map((c) => {
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
        {/* moving truck marker */}
        <TruckMarker pathPts={linePts} />
      </svg>
    </div>
  );
}

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

/* ---------- Sections ---------- */

function NavBar({ lang, setLang, t, navigate, scrolled }) {
  const [open, setOpen] = useState(false);
  const links = [
    { key: "features", href: "#features" },
    { key: "how", href: "#how" },
    { key: "pricing", href: "#pricing" },
    { key: "faq", href: "#faq" },
  ];
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0B2545]/95 backdrop-blur-md shadow-[0_4px_24px_-8px_rgba(0,0,0,0.3)]" : "bg-transparent"
      }`}
    >
      <Container className="flex items-center justify-between h-[76px]">
        <button onClick={() => navigate("home")} aria-label="CourierFlow home">
          <Logo light />
        </button>
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.key} href={l.href} className="text-[0.9rem] font-medium text-white/75 hover:text-white transition-colors">
              {t.nav[l.key]}
            </a>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-4">
          <LangToggle lang={lang} setLang={setLang} light />
          <button onClick={() => navigate("signin")} className="text-[0.9rem] font-medium text-white/80 hover:text-white transition-colors">
            {t.nav.signin}
          </button>
          <PrimaryButton onClick={() => navigate("signup")} icon={false} className="!px-5 !py-2.5 text-[0.88rem]">
            {t.nav.start}
          </PrimaryButton>
        </div>
        <button className="lg:hidden text-white" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>
      {open && (
        <div className="lg:hidden bg-[#0B2545] border-t border-white/10 px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a key={l.key} href={l.href} onClick={() => setOpen(false)} className="text-white/85 font-medium">
              {t.nav[l.key]}
            </a>
          ))}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <LangToggle lang={lang} setLang={setLang} light />
            <button onClick={() => navigate("signin")} className="text-white/85 font-medium">
              {t.nav.signin}
            </button>
          </div>
          <PrimaryButton onClick={() => navigate("signup")} className="w-full justify-center">
            {t.nav.start}
          </PrimaryButton>
        </div>
      )}
    </header>
  );
}

function LangToggle({ lang, setLang, light }) {
  return (
    <div
      className={`flex items-center rounded-full border p-0.5 text-[0.78rem] font-mono font-medium ${
        light ? "border-white/20" : "border-[#0B2545]/15"
      }`}
    >
      {["en", "sw"].map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-2.5 py-1 rounded-full uppercase transition-all ${
            lang === l
              ? "bg-[#E63946] text-white"
              : light
              ? "text-white/60 hover:text-white"
              : "text-[#0B2545]/50 hover:text-[#0B2545]"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

function Hero({ t, navigate }) {
  const [trackCode, setTrackCode] = useState("");
  return (
    <section className="relative bg-[#0B2545] overflow-hidden pt-[76px]">
      <div className="absolute inset-0 opacity-[0.4]">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#E63946]/10 blur-3xl" />
      </div>
      <Container className="relative grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-28">
        <div>
          <Eyebrow light>{t.hero.eyebrow}</Eyebrow>
          <h1 className="font-display font-bold text-white text-[2.75rem] sm:text-[3.4rem] leading-[1.05] tracking-tight whitespace-pre-line">
            {t.hero.title}
          </h1>
          <p className="mt-6 text-[1.05rem] text-white/65 leading-relaxed max-w-[480px]">{t.hero.sub}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <PrimaryButton onClick={() => navigate("signup")}>{t.hero.ctaPrimary}</PrimaryButton>
            <SecondaryButton light onClick={() => navigate("signin")}>
              {t.hero.ctaSecondary}
            </SecondaryButton>
          </div>

          <div className="mt-10 max-w-[440px]">
            <label className="text-[0.78rem] font-mono uppercase tracking-wider text-white/45">{t.hero.trackLabel}</label>
            <div className="mt-2 flex items-center rounded-[10px] bg-white/8 border border-white/15 pl-4 pr-1.5 py-1.5 focus-within:border-[#E63946]/60 transition-colors">
              <Package size={16} className="text-white/40 shrink-0" />
              <input
                value={trackCode}
                onChange={(e) => setTrackCode(e.target.value)}
                placeholder={t.hero.trackPlaceholder}
                className="flex-1 bg-transparent border-none outline-none text-white text-[0.9rem] placeholder:text-white/30 px-3 py-2 font-mono"
              />
              <button className="bg-[#E63946] hover:bg-[#D62C39] text-white text-[0.85rem] font-semibold px-4 py-2 rounded-[7px] transition-colors shrink-0">
                {t.hero.trackBtn}
              </button>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-4 gap-4 max-w-[480px]">
            {t.hero.stats.map((s, i) => (
              <div key={i}>
                <div className="font-mono font-semibold text-white text-[1.15rem] sm:text-[1.3rem]">{s.value}</div>
                <div className="text-[0.7rem] text-white/40 leading-tight mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative aspect-[4/5] lg:aspect-square rounded-2xl border border-white/10 bg-[#081A33] overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)]">
          <RouteMap lang={t} />
          <div className="absolute bottom-5 left-5 right-5 rounded-xl bg-[#0B2545]/90 backdrop-blur border border-white/10 px-4 py-3 flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-[#4ADE80] animate-pulse shrink-0" />
            <div className="flex-1">
              <div className="text-white text-[0.82rem] font-medium">CF-7K2M · Dar → Mwanza</div>
              <div className="text-white/40 text-[0.72rem] font-mono">412 km remaining · ETA 14h</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function RouteStrip({ t }) {
  const text = t.routeStrip;
  return (
    <div className="bg-[#081A33] border-y border-white/5 py-3 overflow-hidden">
      <div className="flex whitespace-nowrap animate-[scroll_32s_linear_infinite]">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="text-white/30 text-[0.78rem] font-mono tracking-wide px-8">
            {text}
          </span>
        ))}
      </div>
      <style>{`@keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

function Features({ t }) {
  return (
    <section id="features" className="bg-[#F7F8FA] py-24 lg:py-28">
      <Container>
        <div className="max-w-[560px]">
          <Eyebrow>{t.features.eyebrow}</Eyebrow>
          <h2 className="font-display font-bold text-[#0B2545] text-[2.1rem] sm:text-[2.5rem] leading-tight tracking-tight">
            {t.features.title}
          </h2>
          <p className="mt-4 text-[#0B2545]/55 text-[1.02rem] leading-relaxed">{t.features.sub}</p>
        </div>
        <div className="mt-14 grid sm:grid-cols-2 gap-5">
          {t.features.items.map((f, i) => {
            const Icon = ICONS[f.icon];
            return (
              <div
                key={i}
                className="group rounded-2xl bg-white border border-[#0B2545]/8 p-7 transition-all hover:border-[#E63946]/30 hover:shadow-[0_20px_40px_-24px_rgba(11,37,69,0.18)]"
              >
                <div className="h-11 w-11 rounded-[10px] bg-[#0B2545] flex items-center justify-center transition-colors group-hover:bg-[#E63946]">
                  <Icon size={19} className="text-white" />
                </div>
                <h3 className="mt-5 font-display font-semibold text-[#0B2545] text-[1.1rem]">{f.title}</h3>
                <p className="mt-2 text-[#0B2545]/55 text-[0.92rem] leading-relaxed">{f.body}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function HowItWorks({ t }) {
  return (
    <section id="how" className="bg-white py-24 lg:py-28">
      <Container>
        <div className="max-w-[560px] mx-auto text-center">
          <Eyebrow>{t.how.eyebrow}</Eyebrow>
          <h2 className="font-display font-bold text-[#0B2545] text-[2.1rem] sm:text-[2.5rem] leading-tight tracking-tight">
            {t.how.title}
          </h2>
        </div>
        <div className="mt-16 grid md:grid-cols-3 gap-10 relative">
          <div className="hidden md:block absolute top-[22px] left-[16.5%] right-[16.5%] h-px bg-[#0B2545]/10" />
          {t.how.steps.map((s, i) => (
            <div key={i} className="relative">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-[#0B2545] text-white font-mono font-semibold text-[0.95rem] flex items-center justify-center shrink-0 relative z-10">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              <h3 className="mt-5 font-display font-semibold text-[#0B2545] text-[1.15rem]">{s.title}</h3>
              <p className="mt-2 text-[#0B2545]/55 text-[0.92rem] leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Trust({ t }) {
  return (
    <section className="bg-[#0B2545] py-24 lg:py-28">
      <Container>
        <div className="max-w-[560px]">
          <Eyebrow light>{t.trust.eyebrow}</Eyebrow>
          <h2 className="font-display font-bold text-white text-[2.1rem] sm:text-[2.5rem] leading-tight tracking-tight">
            {t.trust.title}
          </h2>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {t.trust.quotes.map((q, i) => (
            <div key={i} className="rounded-2xl bg-white/5 border border-white/10 p-7 flex flex-col">
              <p className="text-white/80 text-[0.95rem] leading-relaxed flex-1">&ldquo;{q.quote}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-[#E63946]/20 text-[#E63946] font-mono font-semibold text-[0.8rem] flex items-center justify-center">
                  {q.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="text-white text-[0.88rem] font-medium">{q.name}</div>
                  <div className="text-white/40 text-[0.78rem]">{q.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Pricing({ t, navigate }) {
  return (
    <section id="pricing" className="bg-[#F7F8FA] py-24 lg:py-28">
      <Container>
        <div className="max-w-[560px] mx-auto text-center">
          <Eyebrow>{t.pricing.eyebrow}</Eyebrow>
          <h2 className="font-display font-bold text-[#0B2545] text-[2.1rem] sm:text-[2.5rem] leading-tight tracking-tight">
            {t.pricing.title}
          </h2>
          <p className="mt-4 text-[#0B2545]/55 text-[1.02rem]">{t.pricing.sub}</p>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-6 items-start">
          {t.pricing.tiers.map((tier, i) => (
            <div
              key={i}
              className={`rounded-2xl p-8 relative flex flex-col h-full ${
                tier.popular
                  ? "bg-[#0B2545] text-white shadow-[0_30px_60px_-24px_rgba(11,37,69,0.4)] md:-translate-y-3"
                  : "bg-white border border-[#0B2545]/8"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-8 bg-[#E63946] text-white text-[0.7rem] font-mono uppercase tracking-wider px-3 py-1 rounded-full">
                  Popular
                </span>
              )}
              <h3 className={`font-display font-semibold text-[1.2rem] ${tier.popular ? "text-white" : "text-[#0B2545]"}`}>{tier.name}</h3>
              <p className={`mt-1.5 text-[0.88rem] ${tier.popular ? "text-white/55" : "text-[#0B2545]/50"}`}>{tier.desc}</p>
              <div className="mt-6 flex items-baseline gap-1.5">
                <span className={`font-mono font-bold text-[1.9rem] ${tier.popular ? "text-white" : "text-[#0B2545]"}`}>
                  {tier.price === "0" ? "0" : tier.price}
                </span>
                <span className={`text-[0.85rem] ${tier.popular ? "text-white/45" : "text-[#0B2545]/45"}`}>{tier.period}</span>
              </div>
              <button
                onClick={() => navigate("signup")}
                className={`mt-7 w-full rounded-[10px] py-3 text-[0.9rem] font-semibold transition-all active:scale-[0.98] ${
                  tier.popular ? "bg-[#E63946] text-white hover:bg-[#D62C39]" : "bg-[#0B2545] text-white hover:bg-[#0B2545]/85"
                }`}
              >
                {tier.cta}
              </button>
              <ul className="mt-7 space-y-3 flex-1">
                {tier.features.map((f, j) => (
                  <li key={j} className={`flex items-start gap-2.5 text-[0.87rem] ${tier.popular ? "text-white/75" : "text-[#0B2545]/70"}`}>
                    <Check size={15} className={`mt-0.5 shrink-0 ${tier.popular ? "text-[#E63946]" : "text-[#E63946]"}`} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-center mt-8 text-[#0B2545]/40 text-[0.82rem]">{t.pricing.note}</p>
      </Container>
    </section>
  );
}

function FAQ({ t }) {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section id="faq" className="bg-white py-24 lg:py-28">
      <Container className="max-w-[760px]">
        <div className="text-center">
          <Eyebrow>{t.faq.eyebrow}</Eyebrow>
          <h2 className="font-display font-bold text-[#0B2545] text-[2.1rem] sm:text-[2.5rem] leading-tight tracking-tight">
            {t.faq.title}
          </h2>
        </div>
        <div className="mt-12 divide-y divide-[#0B2545]/8">
          {t.faq.items.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} className="py-5">
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between text-left gap-4"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-[#0B2545] text-[0.98rem]">{item.q}</span>
                  <ChevronDown size={18} className={`text-[#0B2545]/40 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && <p className="mt-3 text-[#0B2545]/55 text-[0.92rem] leading-relaxed max-w-[640px]">{item.a}</p>}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function FinalCTA({ t, navigate }) {
  return (
    <section className="bg-[#0B2545] py-20">
      <Container className="text-center">
        <h2 className="font-display font-bold text-white text-[2rem] sm:text-[2.4rem] tracking-tight">{t.finalCta.title}</h2>
        <p className="mt-3 text-white/55 text-[1.02rem]">{t.finalCta.sub}</p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <PrimaryButton onClick={() => navigate("signup")}>{t.finalCta.primary}</PrimaryButton>
          <SecondaryButton light onClick={() => {}}>
            {t.finalCta.secondary}
          </SecondaryButton>
        </div>
      </Container>
    </section>
  );
}

function Footer({ t, navigate }) {
  return (
    <footer className="bg-[#081A33] pt-16 pb-8">
      <Container>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="col-span-2">
            <Logo light />
            <p className="mt-4 text-white/40 text-[0.88rem] max-w-[280px] leading-relaxed">{t.footer.tag}</p>
          </div>
          <div>
            <h4 className="text-white/85 font-medium text-[0.88rem] mb-4">{t.footer.product}</h4>
            <ul className="space-y-2.5">
              {t.footer.productLinks.map((l, i) => (
                <li key={i}>
                  <a href="#" className="text-white/40 text-[0.86rem] hover:text-white/70 transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white/85 font-medium text-[0.88rem] mb-4">{t.footer.company}</h4>
            <ul className="space-y-2.5">
              {t.footer.companyLinks.map((l, i) => (
                <li key={i}>
                  <a href="#" className="text-white/40 text-[0.86rem] hover:text-white/70 transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-14 pt-7 border-t border-white/8 flex flex-col sm:flex-row justify-between gap-3 text-white/30 text-[0.8rem]">
          <span>© 2026 CourierFlow · {t.footer.tag}</span>
          <span>{t.footer.madeIn}</span>
        </div>
      </Container>
    </footer>
  );
}

/* ---------- Auth pages ---------- */

function AuthShell({ children, navigate, lang, setLang }) {
  return (
    <div className="min-h-screen bg-[#F7F8FA] flex">
      <div className="hidden lg:flex lg:w-[42%] bg-[#0B2545] relative overflow-hidden flex-col justify-between p-10">
        <button onClick={() => navigate("home")}>
          <Logo light />
        </button>
        <div className="relative flex-1 my-8">
          <RouteMap lang={lang} />
        </div>
        <p className="text-white/35 text-[0.8rem] font-mono">CF-7K2M · Dar es Salaam → Mwanza</p>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-6 lg:p-8">
          <button onClick={() => navigate("home")} className="lg:hidden">
            <Logo />
          </button>
          <div className="flex-1 lg:flex lg:justify-end">
            <LangToggle lang={lang} setLang={setLang} />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center px-6 pb-12">
          <div className="w-full max-w-[400px]">{children}</div>
        </div>
      </div>
    </div>
  );
}

function FormField({ label, type = "text", value, onChange, placeholder, icon }) {
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
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#0B2545]/35 hover:text-[#0B2545]/60"
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        )}
      </div>
    </div>
  );
}

function SignIn({ t, lang, setLang, navigate }) {
  const tx = t.auth;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <AuthShell navigate={navigate} lang={lang} setLang={setLang}>
      <button onClick={() => navigate("home")} className="text-[#0B2545]/45 text-[0.85rem] mb-8 hover:text-[#0B2545]/70 flex items-center gap-1.5">
        <ArrowRight size={14} className="rotate-180" /> {tx.back}
      </button>
      <h1 className="font-display font-bold text-[#0B2545] text-[1.85rem] tracking-tight">{tx.signinTitle}</h1>
      <p className="mt-2 text-[#0B2545]/50 text-[0.95rem]">{tx.signinSub}</p>
      <form
        className="mt-8 space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          navigate("dashboard");
        }}
      >
        <FormField label={tx.email} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.co.tz" />
        <FormField label={tx.password} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        <PrimaryButton type="submit" className="w-full" icon={false}>
          {tx.signinBtn}
        </PrimaryButton>
      </form>
      <p className="mt-7 text-center text-[0.88rem] text-[#0B2545]/50">
        {tx.noAccount}{" "}
        <button onClick={() => navigate("signup")} className="text-[#E63946] font-semibold hover:underline">
          {tx.signupLink}
        </button>
      </p>
    </AuthShell>
  );
}

function SignUp({ t, lang, setLang, navigate }) {
  const tx = t.auth;
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", password: "" });
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  return (
    <AuthShell navigate={navigate} lang={lang} setLang={setLang}>
      <button onClick={() => navigate("home")} className="text-[#0B2545]/45 text-[0.85rem] mb-8 hover:text-[#0B2545]/70 flex items-center gap-1.5">
        <ArrowRight size={14} className="rotate-180" /> {tx.back}
      </button>
      <h1 className="font-display font-bold text-[#0B2545] text-[1.85rem] tracking-tight">{tx.signupTitle}</h1>
      <p className="mt-2 text-[#0B2545]/50 text-[0.95rem]">{tx.signupSub}</p>
      <form
        className="mt-8 space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          navigate("dashboard");
        }}
      >
        <FormField label={tx.name} value={form.name} onChange={update("name")} placeholder="Amani Mwakalinga" />
        <FormField label={tx.company} value={form.company} onChange={update("company")} placeholder="Highway Cargo Ltd" />
        <FormField label={tx.email} type="email" value={form.email} onChange={update("email")} placeholder="you@company.co.tz" />
        <FormField label={tx.phone} type="tel" value={form.phone} onChange={update("phone")} placeholder="+255 7XX XXX XXX" />
        <FormField label={tx.password} type="password" value={form.password} onChange={update("password")} placeholder="••••••••" />
        <PrimaryButton type="submit" className="w-full" icon={false}>
          {tx.signupBtn}
        </PrimaryButton>
      </form>
      <p className="mt-5 text-center text-[0.8rem] text-[#0B2545]/40 leading-relaxed">{tx.terms}</p>
      <p className="mt-5 text-center text-[0.88rem] text-[#0B2545]/50">
        {tx.haveAccount}{" "}
        <button onClick={() => navigate("signin")} className="text-[#E63946] font-semibold hover:underline">
          {tx.signinLink}
        </button>
      </p>
    </AuthShell>
  );
}

function DashboardPreview({ navigate }) {
  return (
    <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center p-6">
      <div className="text-center max-w-[420px]">
        <div className="h-14 w-14 rounded-2xl bg-[#0B2545] flex items-center justify-center mx-auto">
          <ShieldCheck size={24} className="text-white" />
        </div>
        <h1 className="mt-6 font-display font-bold text-[#0B2545] text-[1.6rem]">You're in.</h1>
        <p className="mt-2 text-[#0B2545]/55 text-[0.95rem] leading-relaxed">
          This is a frontend preview — the dashboard, dispatch and live tracking views connect once the backend is wired up.
        </p>
        <button onClick={() => navigate("home")} className="mt-7 text-[#E63946] font-semibold text-[0.9rem] hover:underline">
          ← Back to home
        </button>
      </div>
    </div>
  );
}

/* ---------- Root ---------- */

export default function App() {
  const [lang, setLang] = useState("en");
  const [page, setPage] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const t = COPY[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (p) => {
    setPage(p);
    window.scrollTo(0, 0);
  };

  if (page === "signin") return <SignIn t={t} lang={lang} setLang={setLang} navigate={navigate} />;
  if (page === "signup") return <SignUp t={t} lang={lang} setLang={setLang} navigate={navigate} />;
  if (page === "dashboard") return <DashboardPreview navigate={navigate} />;

  return (
    <div className="font-sans antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }
        * { scroll-behavior: smooth; }
      `}</style>
      <NavBar lang={lang} setLang={setLang} t={t} navigate={navigate} scrolled={scrolled} />
      <Hero t={t} navigate={navigate} />
      <RouteStrip t={t} />
      <Features t={t} />
      <HowItWorks t={t} />
      <Trust t={t} />
      <Pricing t={t} navigate={navigate} />
      <FAQ t={t} />
      <FinalCTA t={t} navigate={navigate} />
      <Footer t={t} navigate={navigate} />
    </div>
  );
}
