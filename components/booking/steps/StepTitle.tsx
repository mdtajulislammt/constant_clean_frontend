export default function StepTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-7">
      <h2 className="font-display text-[26px] uppercase leading-[1.08] text-text outline-none md:text-[34px]" tabIndex={-1} data-step-title>
        {title}
      </h2>
      {sub && <p className="mt-2 text-[15px] md:text-[16px]">{sub}</p>}
    </div>
  );
}
