import { addOns, business, packages, packageTitle, paymentLabel, paysNow, SHOW_ADD_ONS, timeSlots, vehicleSizes } from "@/lib/config";
import { formatUSD, fromISODate, packagePrice } from "@/lib/pricing";
import type { BookingState } from "@/store/slices/bookingSlice";

export default function BookingSummary({ b }: { b: BookingState }) {
  const size = vehicleSizes.find((v) => v.id === b.vehicle.size);
  const pkg = packages.find((p) => p.id === b.packageId);
  const slot = timeSlots.find((s) => s.id === b.slot);
  const vehicleText = size
    ? [size.label, [b.vehicle.year, b.vehicle.make, b.vehicle.model].filter(Boolean).join(" ")].filter(Boolean).join(" · ")
    : null;
  const whenText = b.date
    ? `${fromISODate(b.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}${slot ? `, ${slot.label}` : ""}`
    : null;

  return (
    <aside className="rounded-lg border border-border bg-surface p-6 md:p-7" aria-label="Booking summary">
      <h2 className="font-display text-[24px] uppercase text-text">Your detail</h2>
      <dl className="mt-5 space-y-3 text-[15px]">
        <Row label="Vehicle" value={vehicleText} />
        <Row label="Package" value={pkg ? `${packageTitle(pkg.id)} · ${formatUSD(packagePrice(pkg.id))}` : null} />
        {SHOW_ADD_ONS &&
          b.addOns.map((id) => {
            const a = addOns.find((x) => x.id === id)!;
            return <Row key={id} label={`+ ${a.name}`} value={formatUSD(a.price)} />;
          })}
        <Row label="When" value={whenText} />
      </dl>
      <div className="mt-5 flex items-end justify-between border-t border-border pt-5">
        <span className="text-text">Total</span>
        <span className="font-display text-[34px] leading-none text-accent" aria-live="polite">
          {formatUSD(b.total)}
        </span>
      </div>
      <p className="mt-3 text-[13px] text-subtle">
        {b.step === 6
          ? paysNow(b.paymentMethod)
            ? `You'll pay today with ${paymentLabel(b.paymentMethod)}.`
            : `Pay with ${paymentLabel(b.paymentMethod)} after your service.`
          : "Flat price for any vehicle. Pay online by card or Google Pay, or Zelle / Venmo after your service."}
      </p>
      <p className="mt-4 text-[14px]">
        Prefer to talk?{" "}
        <a href={business.phoneHref} className="text-accent underline-offset-4 hover:underline">
          {business.phone}
        </a>
      </p>
    </aside>
  );
}

function Row({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="shrink-0 text-subtle">{label}</dt>
      <dd className="text-right text-text">{value ?? <span className="text-subtle">—</span>}</dd>
    </div>
  );
}
