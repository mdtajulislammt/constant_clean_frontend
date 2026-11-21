import { notificationCopy } from "@/lib/config";
import type { Errors } from "@/lib/bookingValidation";
import { formatPhone } from "@/lib/bookingValidation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCustomer } from "@/store/slices/bookingSlice";
import { Field, TextArea } from "../../ui/Field";
import StepTitle from "./StepTitle";

export default function StepDetails({ errors }: { errors: Errors }) {
  const c = useAppSelector((s) => s.booking.customer);
  const savedAddresses = useAppSelector((s) => s.user.addresses);
  const serviceCity = useAppSelector((s) => s.booking.serviceCity);
  const dispatch = useAppDispatch();

  return (
    <div>
      <StepTitle title="Your details" sub={`Where should we meet your car? ${notificationCopy}`} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Full name"
          required
          autoComplete="name"
          value={c.name}
          error={errors.name}
          onChange={(e) => dispatch(setCustomer({ name: e.target.value }))}
          className="sm:col-span-2"
        />
        <Field
          id="phone"
          label="Phone"
          required
          type="tel"
          autoComplete="tel"
          placeholder="(925) 555-0123"
          hint="For text confirmations and reminders."
          value={c.phone}
          error={errors.phone}
          onChange={(e) => dispatch(setCustomer({ phone: formatPhone(e.target.value) }))}
        />
        <Field
          id="email"
          label="Email"
          required
          type="email"
          autoComplete="email"
          hint="For your confirmation and receipt."
          value={c.email}
          error={errors.email}
          onChange={(e) => dispatch(setCustomer({ email: e.target.value }))}
        />
        <div className="sm:col-span-2">
          <Field
            id="address"
            label="Service address"
            required
            autoComplete="street-address"
            placeholder={serviceCity ? `Street, ${serviceCity}, ZIP` : "Street, city, ZIP"}
            hint={
              serviceCity
                ? `Service area: ${serviceCity}. Home, office or any spot with room to work around the car.`
                : "Home, office or any spot with room to work around the car."
            }
            value={c.address}
            error={errors.address}
            onChange={(e) => dispatch(setCustomer({ address: e.target.value }))}
          />
          {savedAddresses.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {savedAddresses.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => dispatch(setCustomer({ address: a.address }))}
                  className="rounded-full border border-border px-3 py-1 text-[13px] hover:border-accent hover:text-accent"
                >
                  {a.label}: {a.address}
                </button>
              ))}
            </div>
          )}
        </div>
        <TextArea
          id="notes"
          label="Notes about vehicle condition"
          placeholder="Pet hair, stains, gate code, where to park…"
          value={c.notes}
          onChange={(e) => dispatch(setCustomer({ notes: e.target.value }))}
          className="sm:col-span-2"
        />
      </div>
    </div>
  );
}
