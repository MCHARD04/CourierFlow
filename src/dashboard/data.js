export const SHIPMENTS = [
  { code: "CF-7K2M", route: "Dar → Mwanza", path: "dar,morogoro,dodoma,mwanza", progress: 0.62, truck: "T-114", driver: "J. Mushi", status: "transit", eta: "14h", weight: "18.2T", payer: "Highway Cargo Ltd" },
  { code: "CF-3R9P", route: "Dodoma → Arusha", path: "dodoma,arusha", progress: 1, truck: "T-088", driver: "H. Komba", status: "delivered", eta: "—", weight: "12.5T", payer: "Nyota Logistics" },
  { code: "CF-5N2Q", route: "Mbeya → Dar", path: "mbeya,iringa,morogoro,dar", progress: 0.4, truck: "T-027", driver: "A. Kileo", status: "delayed", eta: "6h", weight: "20.0T", payer: "Chuma Freight" },
  { code: "CF-9X4T", route: "Morogoro → Iringa", path: "morogoro,iringa", progress: 0.05, truck: "T-201", driver: "R. Chuma", status: "loading", eta: "2h", weight: "15.8T", payer: "Baraka Traders" },
  { code: "CF-2L8B", route: "Tanga → Dar", path: "tanga,dar", progress: 0.75, truck: "T-156", driver: "S. Mwita", status: "transit", eta: "5h", weight: "22.4T", payer: "Highway Cargo Ltd" },
  { code: "CF-6V1W", route: "Dar → Tanga", path: "dar,tanga", progress: 1, truck: "T-192", driver: "F. Ngowi", status: "delivered", eta: "—", weight: "9.6T", payer: "Pwani Suppliers" },
  { code: "CF-8H3K", route: "Iringa → Mbeya", path: "iringa,mbeya", progress: 0.5, truck: "T-045", driver: "Z. Mbwana", status: "transit", eta: "3h", weight: "17.1T", payer: "Nyota Logistics" },
  { code: "CF-1Q7R", route: "Arusha → Dodoma", path: "arusha,dodoma", progress: 0.3, truck: "T-088", driver: "H. Komba", status: "delayed", eta: "9h", weight: "11.3T", payer: "Kilimanjaro Traders" },
  { code: "CF-4M5N", route: "Dar → Morogoro", path: "dar,morogoro", progress: 1, truck: "T-201", driver: "R. Chuma", status: "delivered", eta: "—", weight: "14.0T", payer: "Chuma Freight" },
  { code: "CF-3D9F", route: "Mwanza → Dodoma", path: "mwanza,dodoma", progress: 0.08, truck: "T-114", driver: "J. Mushi", status: "loading", eta: "1h", weight: "19.5T", payer: "Highway Cargo Ltd" },
  { code: "CF-7T2Y", route: "Dar → Iringa", path: "dar,morogoro,iringa", progress: 0.55, truck: "T-045", driver: "Z. Mbwana", status: "transit", eta: "8h", weight: "16.7T", payer: "Baraka Traders" },
  { code: "CF-2K8L", route: "Mbeya → Mwanza", path: "mbeya,iringa,dodoma,mwanza", progress: 1, truck: "T-156", driver: "S. Mwita", status: "delivered", eta: "—", weight: "21.2T", payer: "Pwani Suppliers" },
];

export const TRUCKS = [
  { id: "T-114", model: "Scania R450", capacity: "30T", driver: "J. Mushi", status: "active", route: "Dar → Mwanza", utilization: 92 },
  { id: "T-088", model: "Howo A7", capacity: "25T", driver: "H. Komba", status: "idle", route: "Dodoma → Arusha", utilization: 78 },
  { id: "T-027", model: "FAW J6", capacity: "20T", driver: "A. Kileo", status: "active", route: "Mbeya → Dar", utilization: 85 },
  { id: "T-201", model: "Mercedes Actros", capacity: "28T", driver: "R. Chuma", status: "active", route: "Morogoro → Iringa", utilization: 88 },
  { id: "T-156", model: "Scania G410", capacity: "30T", driver: "S. Mwita", status: "active", route: "Tanga → Dar", utilization: 95 },
  { id: "T-073", model: "Howo T7H", capacity: "25T", driver: "—", status: "maintenance", route: "Workshop · Dar", utilization: 0 },
  { id: "T-192", model: "FAW J7", capacity: "22T", driver: "F. Ngowi", status: "idle", route: "Dar → Tanga", utilization: 60 },
  { id: "T-045", model: "Isuzu Giga", capacity: "18T", driver: "Z. Mbwana", status: "active", route: "Iringa → Mbeya", utilization: 90 },
];

export const DRIVERS = [
  { name: "J. Mushi", phone: "+255 712 001 122", status: "route", truck: "T-114", rating: 4.8, trips: 28 },
  { name: "H. Komba", phone: "+255 713 002 233", status: "available", truck: "T-088", rating: 4.6, trips: 21 },
  { name: "A. Kileo", phone: "+255 714 003 344", status: "route", truck: "T-027", rating: 4.9, trips: 34 },
  { name: "R. Chuma", phone: "+255 715 004 455", status: "route", truck: "T-201", rating: 4.7, trips: 25 },
  { name: "S. Mwita", phone: "+255 716 005 566", status: "route", truck: "T-156", rating: 4.9, trips: 31 },
  { name: "F. Ngowi", phone: "+255 717 006 677", status: "available", truck: "T-192", rating: 4.5, trips: 18 },
  { name: "Z. Mbwana", phone: "+255 718 007 788", status: "route", truck: "T-045", rating: 4.8, trips: 27 },
  { name: "N. Selemani", phone: "+255 719 008 899", status: "off", truck: "—", rating: 4.4, trips: 14 },
];

export const PAYMENTS = [
  { id: "PM-9921", code: "CF-7K2M", method: "mpesa", payer: "Highway Cargo Ltd", amount: 420000, status: "paid", date: "Jun 28" },
  { id: "PM-9920", code: "CF-3R9P", method: "tigopesa", payer: "Nyota Logistics", amount: 310000, status: "paid", date: "Jun 28" },
  { id: "PM-9919", code: "CF-5N2Q", method: "airtel", payer: "Chuma Freight", amount: 510000, status: "pending", date: "Jun 27" },
  { id: "PM-9918", code: "CF-9X4T", method: "mpesa", payer: "Baraka Traders", amount: 275000, status: "pending", date: "Jun 27" },
  { id: "PM-9917", code: "CF-2L8B", method: "tigopesa", payer: "Highway Cargo Ltd", amount: 460000, status: "paid", date: "Jun 26" },
  { id: "PM-9916", code: "CF-6V1W", method: "mpesa", payer: "Pwani Suppliers", amount: 198000, status: "paid", date: "Jun 26" },
  { id: "PM-9915", code: "CF-8H3K", method: "airtel", payer: "Nyota Logistics", amount: 332000, status: "failed", date: "Jun 25" },
  { id: "PM-9914", code: "CF-1Q7R", method: "mpesa", payer: "Kilimanjaro Traders", amount: 245000, status: "paid", date: "Jun 25" },
  { id: "PM-9913", code: "CF-4M5N", method: "tigopesa", payer: "Chuma Freight", amount: 287000, status: "paid", date: "Jun 24" },
  { id: "PM-9912", code: "CF-3D9F", method: "mpesa", payer: "Highway Cargo Ltd", amount: 401000, status: "pending", date: "Jun 24" },
];
