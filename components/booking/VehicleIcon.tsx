import type { VehicleSizeId } from "@/lib/config";

const bodies: Record<VehicleSizeId, string> = {
  coupe: "M4 23 L7 17 Q20 9 33 10 L45 16 L57 17.5 Q60.5 18.5 60 23 Z",
  sedan: "M3 23 V18 L12 16 L20 10 H40 L48 16 L58.5 17 Q61 18 61 23 Z",
  suv: "M3 23 V13 L7 8 H43 L51 14 L59 15 Q61 16 61 23 Z",
  truck: "M3 23 V15 L9 14.5 L14 8 H29 V15 H61 V23 Z",
  hatchback: "M5 23 V12.5 L9 9.5 H35 L44 16 L57 17 Q60 18 60 23 Z",
  minivan: "M3 23 V10 Q3 7 6.5 7 H41 L53 14 L59.5 15 Q61 16 61 23 Z",
};

export default function VehicleIcon({ type, className = "" }: { type: VehicleSizeId; className?: string }) {
  return (
    <svg viewBox="0 0 64 30" className={className} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" aria-hidden>
      <path d={bodies[type]} />
      <circle cx="16" cy="23" r="4.2" className="fill-surface" />
      <circle cx="49" cy="23" r="4.2" className="fill-surface" />
    </svg>
  );
}
