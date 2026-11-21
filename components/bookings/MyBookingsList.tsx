"use client";

import { CalendarDays, Car, CreditCard, MapPin } from "lucide-react";
import { packageTitle, paymentLabel, timeSlots, vehicleSizes } from "@/lib/config";
import { formatLongDate, formatUSD } from "@/lib/pricing";
import { useAppSelector, useRehydrated } from "@/store/hooks";
import type { Booking, BookingStatus } from "@/store/slices/bookingsSlice";
import { ButtonLink } from "../ui/Button";

const statusLabel: Record<BookingStatus, string> = {
  confirmed: "Confirmed",
  completed: "Completed",
  "cancel-requested": "Cancel requested",
  "reschedule-requested": "Reschedule requested",
  cancelled: "Cancelled",
};

/**
 * Minimal My Bookings list (MOCK — reads bookings saved in redux-persist).
 * Reschedule / cancel requests come in the next phase.
 */
export default function MyBookingsList() {
  const rehydrated = useRehydrated();
  const items = useAppSelector((s) => s.bookings.items);

  if (!rehydrated)
    return (
      <div className="grid animate-pulse gap-4" aria-busy="true" aria-label="Loading bookings">
        {[0, 1].map((i) => (
          <div key={i} className="h-40 rounded-lg bg-surface" />
        ))}
      </div>
    );

  if (!items.length)
    return (
      <div className="rounded-lg border border-border bg-surface p-8 text-center">
        <p className="text-text">No bookings yet.</p>
        <ButtonLink href="/book" className="mt-6">
          Book your first detail
        </ButtonLink>
      </div>
    );

  return (
    <ul className="grid gap-4">
      {items.map((b) => (
        <li key={b.id}>
          <BookingCard b={b} />
        </li>
      ))}
    </ul>
  );
}

function BookingCard({ b }: { b: Booking }) {
  const slot = timeSlots.find((s) => s.id === b.slot);
  const size = vehicleSizes.find((v) => v.id === b.vehicle.size);
  const paid = b.paymentStatus === "paid";

  return (
    <article className="rounded-lg border border-border bg-surface p-6 md:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[13px] uppercase tracking-[1.5px] text-subtle">{b.id}</p>
          <h2 className="h3 mt-1 !text-[20px]">{packageTitle(b.packageId)}</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-border px-3 py-1 text-[12px] font-bold uppercase tracking-[1px] text-text">
            {statusLabel[b.status]}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-[12px] font-bold uppercase tracking-[1px] ${
              paid ? "bg-success text-on-accent" : "border border-accent text-accent"
            }`}
          >
            {paid ? "Paid" : "Unpaid"}
          </span>
        </div>
      </div>

      <dl className="mt-5 grid gap-3 text-[15px] sm:grid-cols-2">
        <Item icon={CalendarDays} label="When" value={`${formatLongDate(b.date)} · ${slot?.label ?? ""}`} />
        <Item icon={MapPin} label="Where" value={b.customer.address} />
        <Item
          icon={Car}
          label="Vehicle"
          value={[size?.label, [b.vehicle.year, b.vehicle.make, b.vehicle.model].filter(Boolean).join(" ")].filter(Boolean).join(" · ")}
        />
        <Item
          icon={CreditCard}
          label="Payment"
          value={`${paymentLabel(b.paymentMethod)} · ${formatUSD(b.total)}${paid ? "" : " due after service"}`}
        />
      </dl>
    </article>
  );
}

function Item({ icon: Icon, label, value }: { icon: typeof CalendarDays; label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <Icon size={16} className="mt-1 shrink-0 text-accent" aria-hidden />
      <div>
        <dt className="sr-only">{label}</dt>
        <dd className="text-text">{value}</dd>
      </div>
    </div>
  );
}
