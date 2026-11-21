"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { paysNow, SHOW_ADD_ONS, type PackageId } from "@/lib/config";
import { type CardForm, emptyCard, type Errors, validateStep } from "@/lib/bookingValidation";
import { formatUSD } from "@/lib/pricing";
import { useAppDispatch, useAppSelector, useRehydrated } from "@/store/hooks";
import { ACTIVE_STEPS, markConfirmed, nextStep, prevStep, setPackage } from "@/store/slices/bookingSlice";
import { addBooking } from "@/store/slices/bookingsSlice";
import { saveAddress, saveVehicle } from "@/store/slices/userSlice";
import { Button } from "../ui/Button";
import BookingProgress from "./BookingProgress";
import BookingSummary from "./BookingSummary";
import StepAddOns from "./steps/StepAddOns";
import StepConfirmation from "./steps/StepConfirmation";
import StepDateTime from "./steps/StepDateTime";
import StepDetails from "./steps/StepDetails";
import StepPackage from "./steps/StepPackage";
import StepReview from "./steps/StepReview";
import StepVehicle from "./steps/StepVehicle";

export default function BookingFlow({ initialPackage }: { initialPackage?: PackageId }) {
  const rehydrated = useRehydrated();
  const b = useAppSelector((s) => s.booking);
  const dispatch = useAppDispatch();
  const reduce = useReducedMotion();

  const [errors, setErrors] = useState<Errors>({});
  const [card, setCard] = useState<CardForm>(emptyCard); // never persisted
  const [paying, setPaying] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  const appliedPreset = useRef(false);

  // ?package=… from a "Book This" link preselects the package (only on a fresh booking).
  useEffect(() => {
    if (!rehydrated || appliedPreset.current) return;
    appliedPreset.current = true;
    if (initialPackage && !b.packageId && b.step < 7) dispatch(setPackage(initialPackage));
  }, [rehydrated, initialPackage, b.packageId, b.step, dispatch]);

  // Scroll to the top of the flow and focus the new step heading.
  useEffect(() => {
    if (!rehydrated) return;
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const el = topRef.current;
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 110, behavior: reduce ? "auto" : "smooth" });
    el?.querySelector<HTMLElement>("[data-step-title]")?.focus({ preventScroll: true });
  }, [b.step, rehydrated, reduce]);

  // Live re-validation once the user has tried to continue.
  const liveErrors = Object.keys(errors).length ? validateStep(b.step, b, card) : errors;

  /** Step 6 — MOCK payment. Card/Google Pay → "paid"; Zelle/Venmo → "unpaid" (pay after service). */
  const confirm = async () => {
    if (paying) return;
    const payNow = paysNow(b.paymentMethod);
    setPaying(true);
    await new Promise((r) => setTimeout(r, payNow ? 1200 : 600));
    const id = `CC-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    const paymentStatus = payNow ? "paid" : "unpaid";
    dispatch(
      addBooking({
        id,
        createdAt: new Date().toISOString(),
        vehicle: b.vehicle,
        packageId: b.packageId!,
        addOns: SHOW_ADD_ONS ? b.addOns : [],
        date: b.date!,
        slot: b.slot!,
        customer: b.customer,
        total: b.total,
        paymentMethod: b.paymentMethod,
        paymentStatus,
        status: "confirmed",
      }),
    );
    dispatch(saveVehicle(b.vehicle));
    dispatch(saveAddress({ label: "Home", address: b.customer.address }));
    dispatch(markConfirmed({ id, paymentStatus }));
    setCard(emptyCard);
    setPaying(false);
  };

  const handleContinue = async () => {
    const e = validateStep(b.step, b, card);
    setErrors(e);
    if (Object.keys(e).length) {
      topRef.current?.querySelector<HTMLElement>("[aria-invalid=true], .text-danger")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (b.step < 6) {
      dispatch(nextStep());
      return;
    }
    await confirm();
  };

  const handleBack = () => {
    setErrors({});
    dispatch(prevStep());
  };

  if (!rehydrated) return <BookingSkeleton />;

  if (b.step === 7)
    return (
      <div ref={topRef} className="py-14 md:py-20">
        <StepConfirmation />
      </div>
    );

  const payNow = paysNow(b.paymentMethod);
  const ctaLabel =
    b.step === 6 ? (payNow ? `Confirm & Pay ${formatUSD(b.total)}` : "Confirm Booking") : b.step === 3 && b.addOns.length === 0 ? "Skip" : "Continue";
  const mobileCta = b.step === 6 ? (payNow ? "Confirm & Pay" : "Confirm Booking") : ctaLabel;

  return (
    <div ref={topRef} className="grid gap-10 py-10 pb-36 md:py-14 lg:grid-cols-[1fr_340px] lg:gap-12 lg:pb-20 xl:grid-cols-[1fr_360px]">
      <div className="min-w-0">
        <BookingProgress step={b.step} />
        <div className="mt-3">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={b.step}
              initial={reduce ? false : { opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: -16 }}
              transition={{ duration: 0.22 }}
            >
              {b.step === 1 && <StepVehicle errors={liveErrors} />}
              {b.step === 2 && <StepPackage errors={liveErrors} />}
              {SHOW_ADD_ONS && b.step === 3 && <StepAddOns />}
              {b.step === 4 && <StepDateTime errors={liveErrors} />}
              {b.step === 5 && <StepDetails errors={liveErrors} />}
              {b.step === 6 && <StepReview card={card} setCard={setCard} errors={liveErrors} onConfirm={handleContinue} paying={paying} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop / tablet actions */}
        <div className="mt-10 hidden items-center justify-between md:flex">
          {b.step !== ACTIVE_STEPS[0] ? (
            <Button variant="ghost" onClick={handleBack}>
              <ArrowLeft size={16} /> Back
            </Button>
          ) : (
            <span />
          )}
          <Button onClick={handleContinue} disabled={paying}>
            {paying ? <Loader2 size={18} className="animate-spin" /> : null}
            {paying ? "Processing…" : ctaLabel}
            {!paying && b.step < 6 && <ArrowRight size={16} />}
          </Button>
        </div>
        {b.step !== ACTIVE_STEPS[0] && (
          <button type="button" onClick={handleBack} className="mt-8 inline-flex items-center gap-2 text-[14px] text-muted md:hidden">
            <ArrowLeft size={16} /> Back
          </button>
        )}
      </div>

      <div className="hidden lg:block">
        <div className="sticky top-32">
          <BookingSummary b={b} />
        </div>
      </div>

      {/* Mobile sticky bar — running total + Continue */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/95 px-5 pb-[max(16px,env(safe-area-inset-bottom))] pt-4 backdrop-blur-md md:hidden">
        <div className="flex items-center gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-[12px] uppercase tracking-[1.5px] text-subtle">Total</p>
            <p className="font-display text-[26px] leading-none text-accent" aria-live="polite">
              {formatUSD(b.total)}
            </p>
          </div>
          <Button onClick={handleContinue} disabled={paying} className="!px-6">
            {paying ? <Loader2 size={18} className="animate-spin" /> : null}
            {paying ? "Processing…" : mobileCta}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function BookingSkeleton() {
  return (
    <div className="grid animate-pulse gap-10 py-10 md:py-14 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_360px]" aria-busy="true" aria-label="Loading booking">
      <div>
        <div className={`grid gap-1.5 ${ACTIVE_STEPS.length === 5 ? "grid-cols-5" : "grid-cols-6"}`}>
          {ACTIVE_STEPS.map((i) => (
            <span key={i} className="h-1.5 rounded-full bg-surface-2" />
          ))}
        </div>
        <div className="mt-8 h-9 w-2/3 rounded bg-surface" />
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-32 rounded-lg bg-surface" />
          ))}
        </div>
      </div>
      <div className="hidden h-80 rounded-lg bg-surface lg:block" />
    </div>
  );
}
