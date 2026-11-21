import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  children?: React.ReactNode;
}) {
  const center = align === "center";
  return (
    <Reveal className={`mb-10 md:mb-14 ${center ? "text-center" : "flex flex-wrap items-end justify-between gap-6"}`}>
      <div className={center ? "mx-auto max-w-2xl" : "max-w-2xl"}>
        {eyebrow && (
          <p className={`eyebrow mb-3 flex items-center gap-3 ${center ? "justify-center" : ""}`}>
            <span className="h-px w-7 bg-accent" aria-hidden />
            {eyebrow}
          </p>
        )}
        <h2 className="h2">{title}</h2>
        {intro && <p className="mt-4 text-muted">{intro}</p>}
      </div>
      {children}
    </Reveal>
  );
}
