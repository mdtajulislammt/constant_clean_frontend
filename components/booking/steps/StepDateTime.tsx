"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import { BOOKING_DAYS_AHEAD, isSlotMockBooked, MAX_JOBS_PER_DAY, notificationCopy, slotsForDay, type TimeSlotId } from "@/lib/config";
import type { Errors } from "@/lib/bookingValidation";
import { formatLongDate, fromISODate, toISODate } from "@/lib/pricing";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setDate, setSlot } from "@/store/slices/bookingSlice";
import StepTitle from "./StepTitle";

export default function StepDateTime({ errors }: { errors: Errors }) {
  const { date, slot } = useAppSelector((s) => s.booking);
  const taken = useAppSelector((s) => s.bookings.items);
  const dispatch = useAppDispatch();
  const strip = useRef<HTMLDivElement>(null);

  const days = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Array.from({ length: BOOKING_DAYS_AHEAD }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      return d;
    });
  }, []);

  // Drop a persisted date that has fallen out of the 14-day window.
  useEffect(() => {
    if (date && !days.some((d) => toISODate(d) === date)) dispatch(setDate(toISODate(days[0])));
  }, [date, days, dispatch]);

  const now = new Date();
  const isUnavailable = (iso: string, id: TimeSlotId, start: number) => {
    const past = toISODate(now) === iso && now.getHours() >= start - 1;
    const takenByMock = isSlotMockBooked(iso, id);
    const takenByUser = taken.some((b) => b.date === iso && b.slot === id && b.status !== "cancelled");
    return past || takenByMock || takenByUser;
  };

  const selectedDay = date ? fromISODate(date) : null;

  return (
    <div>
      <StepTitle title="Pick a date & time" sub={`Open 7 days, 8 AM – 6 PM. Every appointment is a 3-hour window, max ${MAX_JOBS_PER_DAY} per day. ${notificationCopy}`} />

      <div className="relative">
        <div ref={strip} className="no-scrollbar -mx-1 flex snap-x gap-2.5 overflow-x-auto px-1 pb-2" role="listbox" aria-label="Choose a date">
          {days.map((d) => {
            const iso = toISODate(d);
            const active = iso === date;
            const allTaken = slotsForDay().every((s) => isUnavailable(iso, s.id, s.start));
            return (
              <button
                key={iso}
                type="button"
                role="option"
                aria-selected={active}
                disabled={allTaken}
                onClick={() => dispatch(setDate(iso))}
                className={`flex w-[72px] shrink-0 snap-start flex-col items-center rounded-lg border py-3 transition-all duration-200 ${
                  active
                    ? "border-accent bg-accent text-on-accent"
                    : "border-border bg-surface text-text hover:border-accent disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-border"
                }`}
              >
                <span className={`text-[12px] font-bold uppercase tracking-[1px] ${active ? "" : "text-subtle"}`}>
                  {d.toLocaleDateString("en-US", { weekday: "short" })}
                </span>
                <span className="font-display text-[26px] leading-tight">{d.getDate()}</span>
                <span className={`text-[12px] ${active ? "" : "text-subtle"}`}>{d.toLocaleDateString("en-US", { month: "short" })}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-2 hidden justify-end gap-2 md:flex">
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              aria-label={dir === -1 ? "Earlier dates" : "Later dates"}
              onClick={() => strip.current?.scrollBy({ left: dir * 320, behavior: "smooth" })}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted hover:border-accent hover:text-accent"
            >
              {dir === -1 ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </button>
          ))}
        </div>
      </div>
      {errors.date && <p className="mt-2 text-[14px] text-danger">{errors.date}</p>}

      {date && selectedDay && (
        <div className="mt-8">
          <h3 className="mb-4 text-[15px] font-medium text-text">{formatLongDate(date)}</h3>
          <div className="grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Choose a time window">
            {slotsForDay().map((s) => {
              const off = isUnavailable(date, s.id, s.start);
              const active = slot === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  disabled={off}
                  onClick={() => dispatch(setSlot(s.id))}
                  className={`rounded-lg border p-5 text-left transition-all duration-200 ${
                    active
                      ? "border-accent bg-accent/5"
                      : off
                        ? "cursor-not-allowed border-border bg-bg-alt opacity-45"
                        : "border-border bg-surface hover:border-accent"
                  }`}
                >
                  <span className={`block font-bold ${off ? "text-subtle line-through" : "text-text"}`}>{s.label}</span>
                  <span className={`mt-1 block text-[13px] ${active ? "text-accent" : "text-subtle"}`}>
                    {off ? "Booked" : active ? "Selected" : "Available"}
                  </span>
                </button>
              );
            })}
          </div>
          {errors.slot && <p className="mt-3 text-[14px] text-danger">{errors.slot}</p>}
        </div>
      )}
    </div>
  );
}
