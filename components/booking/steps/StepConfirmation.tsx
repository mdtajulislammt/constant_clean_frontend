"use client";

import { motion } from "framer-motion";
import { CalendarPlus, Check, ListChecks } from "lucide-react";
import Link from "next/link";
import { addOns, business, notificationCopy, packageTitle, paymentLabel, SHOW_ADD_ONS, timeSlots, vehicleSizes } from "@/lib/config";
import { formatLongDate, formatUSD, fromISODate } from "@/lib/pricing";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetBooking } from "@/store/slices/bookingSlice";
import type { Booking } from "@/store/slices/bookingsSlice";
import { buttonClass } from "../../ui/Button";
import Logo from "../../ui/Logo";

function downloadIcs(b: Booking) {
  const slot = timeSlots.find((s) => s.id === b.slot)!;
  const day = fromISODate(b.date);
  const stamp = (h: number) => {
    const d = new Date(day);
    d.setHours(h, 0, 0, 0);
    return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  };
  const pkg = packageTitle(b.packageId) || "Detail";
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Constant Clean//Booking//EN",
    "BEGIN:VEVENT",
    `UID:${b.id}@constantclean.org`,
    `DTSTAMP:${stamp(new Date().getHours())}`,
    `DTSTART:${stamp(slot.start)}`,
    `DTEND:${stamp(slot.end)}`,
    `SUMMARY:${business.name} — ${pkg}`,
    `LOCATION:${b.customer.address.replace(/,/g, "\\,")}`,
    `DESCRIPTION:Booking ${b.id}. Questions? ${business.email}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `constant-clean-${b.id}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function StepConfirmation() {
  const id = useAppSelector((s) => s.booking.confirmedId);
  const booking = useAppSelector((s) => s.bookings.items.find((b) => b.id === id));
  const dispatch = useAppDispatch();

  if (!booking) return null;
  const size = vehicleSizes.find((v) => v.id === booking.vehicle.size);
  const slot = timeSlots.find((s) => s.id === booking.slot);

  return (
    <div className="mx-auto max-w-2xl text-center">
      <motion.span
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-full bg-accent text-on-accent shadow-lift"
      >
        <Check size={40} strokeWidth={2.5} />
      </motion.span>
      <p className="eyebrow mt-8">Booking confirmed</p>
      <h2 className="h2 mt-3" tabIndex={-1} data-step-title>
        You&apos;re all set
      </h2>
      <p className="mt-4">
        Booking ref <span className="font-bold text-accent">{booking.id}</span>. {notificationCopy}
        {booking.paymentStatus === "unpaid" && (
          <span className="mt-2 block">
            We&apos;ll send {paymentLabel(booking.paymentMethod)} details with your confirmation. Pay after your service.
          </span>
        )}
      </p>

      <dl className="mt-10 divide-y divide-border rounded-lg border border-border bg-surface px-6 text-left text-[15px]">
        {[
          ["When", `${formatLongDate(booking.date)} · ${slot?.label}`],
          ["Where", booking.customer.address],
          ["Vehicle", `${size?.label} · ${[booking.vehicle.year, booking.vehicle.make, booking.vehicle.model].filter(Boolean).join(" ")}`],
          ["Service", packageTitle(booking.packageId)],
          ...(SHOW_ADD_ONS ? [["Add-ons", booking.addOns.map((a) => addOns.find((x) => x.id === a)?.name).join(", ") || "None"]] : []),
          ["Payment", `${paymentLabel(booking.paymentMethod)} · ${booking.paymentStatus === "paid" ? "Paid" : "Unpaid (pay after service)"}`],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between gap-6 py-4">
            <dt className="text-subtle">{k}</dt>
            <dd className="text-right text-text">{v}</dd>
          </div>
        ))}
        <div className="flex items-end justify-between py-5">
          <dt className="font-bold text-text">{booking.paymentStatus === "paid" ? "Paid" : "Due after service"}</dt>
          <dd className="font-display text-[28px] leading-none text-accent">{formatUSD(booking.total)}</dd>
        </div>
      </dl>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <button type="button" onClick={() => downloadIcs(booking)} className={buttonClass("primary")}>
          <CalendarPlus size={18} /> Add to Calendar
        </button>
        <Link href="/bookings" className={buttonClass("secondary")}>
          <ListChecks size={18} /> View My Bookings
        </Link>
      </div>
      <button type="button" onClick={() => dispatch(resetBooking())} className="mt-6 text-[14px] text-muted underline-offset-4 hover:text-accent hover:underline">
        Book another vehicle
      </button>
      <div className="mt-14 flex justify-center border-t border-border pt-10">
        <Logo variant="full" className="h-20 w-auto" />
      </div>
    </div>
  );
}
