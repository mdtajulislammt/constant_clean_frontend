import type { ComponentProps } from "react";

export const inputClass =
  "w-full rounded-[6px] border border-border bg-bg px-4 py-3.5 text-[16px] text-text placeholder:text-subtle transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 aria-[invalid=true]:border-danger";

type Base = { label: string; error?: string; hint?: string; id: string };

export function Field({ label, error, hint, id, className, ...props }: Base & ComponentProps<"input">) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-[14px] font-medium text-text">
        {label}
        {props.required && <span className="text-accent"> *</span>}
      </label>
      <input id={id} className={inputClass} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} {...props} />
      {error ? (
        <p id={`${id}-err`} className="mt-1.5 text-[13px] text-danger">
          {error}
        </p>
      ) : (
        hint && <p className="mt-1.5 text-[13px] text-subtle">{hint}</p>
      )}
    </div>
  );
}

export function TextArea({ label, error, hint, id, className, ...props }: Base & ComponentProps<"textarea">) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-[14px] font-medium text-text">
        {label}
      </label>
      <textarea id={id} className={`${inputClass} min-h-28 resize-y`} aria-invalid={!!error} {...props} />
      {hint && <p className="mt-1.5 text-[13px] text-subtle">{hint}</p>}
    </div>
  );
}
