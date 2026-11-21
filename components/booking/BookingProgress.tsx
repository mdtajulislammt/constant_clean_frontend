import { ACTIVE_STEPS, stepLabel, type BookingStep } from "@/store/slices/bookingSlice";

/** Segmented progress bar + "STEP X OF N" label. Only shows steps that are enabled (see ACTIVE_STEPS). */
export default function BookingProgress({ step }: { step: BookingStep }) {
  const position = ACTIVE_STEPS.indexOf(step) + 1;
  return (
    <div>
      <ol className={`grid gap-1.5 ${ACTIVE_STEPS.length === 5 ? "grid-cols-5" : "grid-cols-6"}`} aria-label="Booking progress">
        {ACTIVE_STEPS.map((s, i) => {
          const label = stepLabel(s);
          const n = i + 1;
          const state = n < position ? "done" : n === position ? "current" : "todo";
          return (
            <li key={label} aria-current={state === "current" ? "step" : undefined}>
              <span className={`block h-1.5 rounded-full transition-colors duration-300 ${state === "todo" ? "bg-surface-2" : "bg-accent"}`} />
              <span className={`mt-2 hidden text-[12px] font-medium lg:block ${state === "todo" ? "text-subtle" : "text-text"}`}>{label}</span>
              <span className="sr-only">
                {label} ({state === "done" ? "completed" : state === "current" ? "current step" : "not started"})
              </span>
            </li>
          );
        })}
      </ol>
      <p className="eyebrow mt-6">
        Step {position} of {ACTIVE_STEPS.length}
      </p>
    </div>
  );
}
