import { Check, Plus } from "lucide-react";
import { addOns } from "@/lib/config";
import { formatUSD } from "@/lib/pricing";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleAddOn } from "@/store/slices/bookingSlice";
import StepTitle from "./StepTitle";

export default function StepAddOns() {
  const selected = useAppSelector((s) => s.booking.addOns);
  const dispatch = useAppDispatch();

  return (
    <div>
      <StepTitle title="Any add-ons?" sub="Optional extras. Skip this step if you don't need any." />
      <div className="grid gap-4 sm:grid-cols-2">
        {addOns.map((a) => {
          const on = selected.includes(a.id);
          return (
            <button
              key={a.id}
              type="button"
              role="switch"
              aria-checked={on}
              onClick={() => dispatch(toggleAddOn(a.id))}
              className={`flex items-start gap-4 rounded-lg border p-5 text-left transition-all duration-200 hover:border-accent ${
                on ? "border-accent bg-accent/5" : "border-border bg-surface"
              }`}
            >
              <span
                className={`mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors ${
                  on ? "border-accent bg-accent text-on-accent" : "border-border text-muted"
                }`}
                aria-hidden
              >
                {on ? <Check size={16} /> : <Plus size={16} />}
              </span>
              <span className="flex-1">
                <span className="flex items-baseline justify-between gap-3">
                  <span className="font-bold text-text">{a.name}</span>
                  <span className="font-bold text-accent">+{formatUSD(a.price)}</span>
                </span>
                <span className="mt-1 block text-[14px]">{a.desc}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
