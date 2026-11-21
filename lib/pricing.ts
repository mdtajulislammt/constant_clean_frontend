import { addOns, packages, SHOW_ADD_ONS, type AddOnId, type PackageId } from "./config";

export function formatUSD(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

/** Fixed price per package — vehicle size does not change it. */
export function packagePrice(pkg: PackageId | null) {
  if (!pkg) return 0;
  return packages.find((x) => x.id === pkg)?.price ?? 0;
}

export function addOnsTotal(ids: AddOnId[]) {
  if (!SHOW_ADD_ONS) return 0;
  return ids.reduce((sum, id) => sum + (addOns.find((a) => a.id === id)?.price ?? 0), 0);
}

export function bookingTotal(pkg: PackageId | null, ids: AddOnId[]) {
  return packagePrice(pkg) + addOnsTotal(ids);
}

/** Local YYYY-MM-DD (avoids UTC off-by-one). */
export function toISODate(d: Date) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export function fromISODate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function formatLongDate(iso: string) {
  return fromISODate(iso).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}
