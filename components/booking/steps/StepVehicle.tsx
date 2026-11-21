import { vehicleSizes } from "@/lib/config";
import type { Errors } from "@/lib/bookingValidation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setVehicle } from "@/store/slices/bookingSlice";
import { Field } from "../../ui/Field";
import VehicleIcon from "../VehicleIcon";
import StepTitle from "./StepTitle";

export default function StepVehicle({ errors }: { errors: Errors }) {
  const v = useAppSelector((s) => s.booking.vehicle);
  const dispatch = useAppDispatch();

  return (
    <div>
      <StepTitle title="What are we detailing?" sub="Pick the closest size so we bring the right setup. It doesn't change the price." />
      <fieldset>
        <legend className="sr-only">Vehicle size</legend>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
          {vehicleSizes.map((s) => {
            const active = v.size === s.id;
            return (
              <label
                key={s.id}
                className={`group relative flex cursor-pointer flex-col items-start gap-3 rounded-lg border p-4 transition-all duration-200 hover:border-accent md:p-5 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent ${
                  active ? "border-accent bg-accent/5" : "border-border bg-surface"
                }`}
              >
                <input
                  type="radio"
                  name="vehicle-size"
                  value={s.id}
                  checked={active}
                  onChange={() => dispatch(setVehicle({ size: s.id }))}
                  className="sr-only"
                />
                <VehicleIcon type={s.id} className={`h-9 w-20 transition-colors ${active ? "text-accent" : "text-muted group-hover:text-text"}`} />
                <span>
                  <span className="block font-bold text-text">{s.label}</span>
                  <span className="block text-[13px] text-subtle">{s.hint}</span>
                </span>
                <span
                  className={`absolute right-4 top-4 h-4 w-4 rounded-full border-2 transition-colors ${active ? "border-accent bg-accent" : "border-border"}`}
                  aria-hidden
                />
              </label>
            );
          })}
        </div>
        {errors.size && <p className="mt-3 text-[14px] text-danger">{errors.size}</p>}
      </fieldset>

      <div className="mt-8 grid gap-4 sm:grid-cols-[120px_1fr_1fr]">
        <Field
          id="year"
          label="Year"
          inputMode="numeric"
          maxLength={4}
          placeholder="2022"
          value={v.year}
          error={errors.year}
          onChange={(e) => dispatch(setVehicle({ year: e.target.value.replace(/\D/g, "") }))}
        />
        <Field
          id="make"
          label="Make"
          required
          placeholder="Toyota"
          autoComplete="off"
          value={v.make}
          error={errors.make}
          onChange={(e) => dispatch(setVehicle({ make: e.target.value }))}
        />
        <Field
          id="model"
          label="Model"
          required
          placeholder="RAV4"
          autoComplete="off"
          value={v.model}
          error={errors.model}
          onChange={(e) => dispatch(setVehicle({ model: e.target.value }))}
        />
      </div>
    </div>
  );
}
