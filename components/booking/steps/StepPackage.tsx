import { Check, Clock, Repeat } from "lucide-react";
import { packages, type Package } from "@/lib/config";
import type { Errors } from "@/lib/bookingValidation";
import { formatUSD } from "@/lib/pricing";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setPackage } from "@/store/slices/bookingSlice";
import StepTitle from "./StepTitle";

export default function StepPackage({ errors }: { errors: Errors }) {
  const packageId = useAppSelector((s) => s.booking.packageId);
  const dispatch = useAppDispatch();
  const detail = packages.filter((p) => p.group === "detail");
  const maintenance = packages.filter((p) => p.group === "maintenance");

  const card = (p: Package) => {
    const active = packageId === p.id;
    return (
      <label
        key={p.id}
        className={`relative flex cursor-pointer flex-col rounded-lg border p-6 transition-all duration-200 hover:border-accent has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent ${
          active ? "border-accent bg-accent/5" : "border-border bg-surface"
        }`}
      >
        <input type="radio" name="package" checked={active} onChange={() => dispatch(setPackage(p.id))} className="sr-only" />
        {p.popular && (
          <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-0.5 text-[11px] font-bold uppercase tracking-[1px] text-on-accent">
            Most popular
          </span>
        )}
        <span className="flex items-start justify-between gap-3">
          <span className="h3 !text-[20px]">{p.name}</span>
          <span className={`mt-1 h-5 w-5 shrink-0 rounded-full border-2 ${active ? "border-accent bg-accent" : "border-border"}`} aria-hidden />
        </span>
        <span className="mt-2 text-[14px]">{p.blurb}</span>
        <span className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="font-display text-[32px] leading-none text-accent">{formatUSD(p.price)}</span>
          {p.period && <span className="text-[14px] text-muted">{p.period}</span>}
          <span className="inline-flex items-center gap-1 text-[13px] text-subtle">
            <Clock size={13} aria-hidden /> {p.duration}
          </span>
        </span>
        <ul className="mt-5 space-y-2 border-t border-border pt-5 text-[14px]">
          {p.includes.map((x) => (
            <li key={x} className="flex items-start gap-2">
              <Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden /> {x}
            </li>
          ))}
        </ul>
      </label>
    );
  };

  return (
    <div>
      <StepTitle title="Choose your service" sub="Flat prices for every vehicle size." />
      <fieldset>
        <legend className="sr-only">Service</legend>
        <div className="grid gap-4 md:max-w-md">{detail.map(card)}</div>

        <div className="mt-10">
          <h3 className="flex items-center gap-2 text-[15px] font-bold uppercase tracking-[1.5px] text-text">
            <Repeat size={16} className="text-accent" aria-hidden /> Maintenance Check-Up
          </h3>
          <p className="mt-1 text-[14px] text-subtle">Recurring visits. Book your first one now and we&apos;ll keep your slot.</p>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">{maintenance.map(card)}</div>
        </div>
        {errors.package && <p className="mt-3 text-[14px] text-danger">{errors.package}</p>}
      </fieldset>
    </div>
  );
}
