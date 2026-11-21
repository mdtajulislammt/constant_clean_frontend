import { clubPlans } from "@/lib/config";
import Reveal from "../ui/Reveal";
import PlanCard from "./PlanCard";

export default function MaintenanceClub() {
  return (
    <section id="club" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-page">
        <Reveal className="relative overflow-hidden rounded-xl border border-accent/70 bg-bg-alt p-6 sm:p-10 lg:p-14">
          <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-accent/10 blur-3xl" aria-hidden />
          <div className="relative">
            <div className="max-w-2xl">
              <p className="eyebrow mb-3">Maintenance Check-Up</p>
              <h2 className="h2">Maintenance Club</h2>
              <p className="mt-5">
                Keep your car permanently clean. Pick a schedule, we hold your slot and come back on time, every time. Reschedule free up to 24 hours before.
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {clubPlans.map((p) => (
                <PlanCard key={p.id} {...p} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
