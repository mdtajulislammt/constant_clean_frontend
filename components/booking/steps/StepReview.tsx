import { CreditCard, Loader2, Lock, Pencil, Smartphone, Wallet } from "lucide-react";
import {
  addOns,
  cancellationPolicy,
  notificationCopy,
  packageTitle,
  paymentMethods,
  paysNow,
  SHOW_ADD_ONS,
  timeSlots,
  vehicleSizes,
  type PaymentMethodId,
} from "@/lib/config";
import { type CardForm, type Errors, formatCardNumber, formatExpiry } from "@/lib/bookingValidation";
import { formatLongDate, formatUSD, packagePrice } from "@/lib/pricing";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { goToStep, setPaymentMethod, type BookingStep } from "@/store/slices/bookingSlice";
import { Field } from "../../ui/Field";
import StepTitle from "./StepTitle";

const methodIcons: Record<PaymentMethodId, typeof CreditCard> = {
  card: CreditCard,
  googlepay: Smartphone,
  zelle: Wallet,
  venmo: Wallet,
};

export default function StepReview({
  card,
  setCard,
  errors,
  onConfirm,
  paying,
}: {
  card: CardForm;
  setCard: (c: CardForm) => void;
  errors: Errors;
  /** Used by the mocked Google Pay button (same as the main CTA). */
  onConfirm: () => void;
  paying: boolean;
}) {
  const b = useAppSelector((s) => s.booking);
  const dispatch = useAppDispatch();
  const size = vehicleSizes.find((v) => v.id === b.vehicle.size);
  const slot = timeSlots.find((s) => s.id === b.slot);
  const set = (k: keyof CardForm, v: string) => setCard({ ...card, [k]: v });
  const edit = (step: BookingStep) => dispatch(goToStep(step));
  const payNow = paysNow(b.paymentMethod);

  return (
    <div>
      <StepTitle
        title={payNow ? "Review & pay" : "Review & confirm"}
        sub={payNow ? "Check everything below, then confirm. You'll pay the full amount today." : "Check everything below, then confirm. You'll pay after your service."}
      />

      <div className="rounded-lg border border-border bg-surface px-5 md:px-6">
        <Section title="Vehicle" onEdit={() => edit(1)}>
          {size?.label} · {[b.vehicle.year, b.vehicle.make, b.vehicle.model].filter(Boolean).join(" ")}
        </Section>
        <Section title="Service" onEdit={() => edit(2)}>
          {packageTitle(b.packageId)} <span className="text-accent">{formatUSD(packagePrice(b.packageId))}</span>
        </Section>
        {SHOW_ADD_ONS && (
          <Section title="Add-ons" onEdit={() => edit(3)}>
            {b.addOns.length ? (
              b.addOns.map((id) => {
                const a = addOns.find((x) => x.id === id)!;
                return (
                  <span key={id} className="block">
                    {a.name} <span className="text-accent">+{formatUSD(a.price)}</span>
                  </span>
                );
              })
            ) : (
              <span className="text-subtle">None</span>
            )}
          </Section>
        )}
        <Section title="When" onEdit={() => edit(4)}>
          {b.date && formatLongDate(b.date)}
          <span className="block text-muted">{slot?.label}</span>
        </Section>
        <Section title="Contact & address" onEdit={() => edit(5)}>
          {b.customer.name}
          <span className="block text-muted">
            {b.customer.phone} · {b.customer.email}
          </span>
          <span className="block text-muted">{b.customer.address}</span>
        </Section>
        <div className="flex items-end justify-between py-5">
          <span className="font-bold text-text">{payNow ? "Total due today" : "Total due after service"}</span>
          <span className="font-display text-[30px] leading-none text-accent">{formatUSD(b.total)}</span>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-border bg-bg-alt p-5 text-[14px]">
        <p className="mb-1 font-bold text-text">Cancellation & refund policy</p>
        {cancellationPolicy}
      </div>

      {/* Payment method — MOCK UI only, nothing is charged */}
      <div role="radiogroup" aria-labelledby="pay-method-title" className="mt-8">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h3 id="pay-method-title" className="font-bold text-text">How would you like to pay?</h3>
          <span className="inline-flex shrink-0 items-center gap-1 text-[12px] text-subtle">
            <Lock size={12} /> Demo only · no charge
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {paymentMethods.map((m) => {
            const active = b.paymentMethod === m.id;
            const Icon = methodIcons[m.id];
            return (
              <label
                key={m.id}
                className={`flex cursor-pointer flex-col gap-1 rounded-lg border p-4 transition-all duration-200 hover:border-accent has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent ${
                  active ? "border-accent bg-accent/5" : "border-border bg-surface"
                }`}
              >
                <input
                  type="radio"
                  name="payment-method"
                  value={m.id}
                  checked={active}
                  onChange={() => dispatch(setPaymentMethod(m.id))}
                  className="sr-only"
                />
                <Icon size={20} className={active ? "text-accent" : "text-muted"} aria-hidden />
                <span className="mt-1 font-bold text-text">{m.label}</span>
                <span className="text-[12px] text-subtle">{m.hint}</span>
              </label>
            );
          })}
        </div>
        {errors.payment && <p className="mt-3 text-[14px] text-danger">{errors.payment}</p>}
      </div>

      {b.paymentMethod === "card" && (
        <div className="mt-6">
          <h3 className="mb-4 flex items-center gap-2 font-bold text-text">
            <CreditCard size={18} className="text-accent" /> Card details <span className="text-[13px] font-normal text-subtle">Visa / Mastercard</span>
          </h3>
          {/* Stripe-style placeholder — NO real payment processing. Card data stays in component state, never persisted. */}
          <div className="grid gap-4 rounded-lg border border-border bg-surface p-5 sm:grid-cols-6">
            <Field
              id="cc-name"
              label="Name on card"
              autoComplete="cc-name"
              value={card.name}
              error={errors.cardName}
              onChange={(e) => set("name", e.target.value)}
              className="sm:col-span-6"
            />
            <Field
              id="cc-number"
              label="Card number"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="4242 4242 4242 4242"
              value={card.number}
              error={errors.cardNumber}
              onChange={(e) => set("number", formatCardNumber(e.target.value))}
              className="sm:col-span-6"
            />
            <Field
              id="cc-exp"
              label="Expiry"
              inputMode="numeric"
              autoComplete="cc-exp"
              placeholder="MM/YY"
              value={card.expiry}
              error={errors.expiry}
              onChange={(e) => set("expiry", formatExpiry(e.target.value))}
              className="sm:col-span-2"
            />
            <Field
              id="cc-cvc"
              label="CVC"
              inputMode="numeric"
              autoComplete="cc-csc"
              placeholder="123"
              maxLength={4}
              value={card.cvc}
              error={errors.cvc}
              onChange={(e) => set("cvc", e.target.value.replace(/\D/g, ""))}
              className="sm:col-span-2"
            />
            <Field
              id="cc-zip"
              label="ZIP"
              inputMode="numeric"
              autoComplete="postal-code"
              placeholder="94568"
              maxLength={5}
              value={card.zip}
              error={errors.zip}
              onChange={(e) => set("zip", e.target.value.replace(/\D/g, ""))}
              className="sm:col-span-2"
            />
          </div>
        </div>
      )}

      {b.paymentMethod === "googlepay" && (
        <div className="mt-6 rounded-lg border border-border bg-surface p-5">
          {/* MOCK Google Pay button — no real integration */}
          <button
            type="button"
            onClick={onConfirm}
            disabled={paying}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-text font-bold text-bg transition-opacity hover:opacity-90 disabled:opacity-60"
            aria-label={`Pay ${formatUSD(b.total)} with Google Pay (demo)`}
          >
            {paying ? <Loader2 size={18} className="animate-spin" aria-hidden /> : <Smartphone size={18} aria-hidden />}
            {paying ? "Processing…" : "Pay with Google Pay"}
          </button>
          <p className="mt-3 text-center text-[13px] text-subtle">Demo button. You can also use the confirm button below.</p>
        </div>
      )}

      {(b.paymentMethod === "zelle" || b.paymentMethod === "venmo") && (
        <div className="mt-6 rounded-lg border border-accent/40 bg-accent/5 p-5 text-[15px]">
          <p className="font-bold text-text">Pay after your service.</p>
          <p className="mt-1">We&apos;ll send Zelle/Venmo details with your confirmation. {notificationCopy}</p>
        </div>
      )}
    </div>
  );
}

function Section({ title, onEdit, children }: { title: string; onEdit: () => void; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border py-4 last:border-b-0">
      <div>
        <p className="text-[13px] uppercase tracking-[1.5px] text-subtle">{title}</p>
        <div className="mt-1 text-text">{children}</div>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="inline-flex items-center gap-1 text-[13px] text-muted hover:text-accent"
        aria-label={`Edit ${title.toLowerCase()}`}
      >
        <Pencil size={13} /> Edit
      </button>
    </div>
  );
}
