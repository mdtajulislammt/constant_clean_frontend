import type { BookingState } from "@/store/slices/bookingSlice";

export type Errors = Record<string, string>;

export interface CardForm {
  name: string;
  number: string;
  expiry: string;
  cvc: string;
  zip: string;
}

export const emptyCard: CardForm = { name: "", number: "", expiry: "", cvc: "", zip: "" };

const digits = (s: string) => s.replace(/\D/g, "");

export function validateStep(step: number, b: BookingState, card?: CardForm): Errors {
  const e: Errors = {};
  switch (step) {
    case 1:
      if (!b.vehicle.size) e.size = "Choose your vehicle type.";
      if (!b.vehicle.make.trim()) e.make = "Enter the make.";
      if (!b.vehicle.model.trim()) e.model = "Enter the model.";
      if (b.vehicle.year && !/^(19|20)\d{2}$/.test(b.vehicle.year)) e.year = "Enter a 4-digit year.";
      break;
    case 2:
      if (!b.packageId) e.package = "Choose a package.";
      break;
    case 4:
      if (!b.date) e.date = "Pick a date.";
      else if (!b.slot) e.slot = "Pick a time window.";
      break;
    case 5:
      if (b.customer.name.trim().length < 2) e.name = "Enter your full name.";
      // Phone AND email are both required — confirmations and reminders go out by text and email.
      if (!b.customer.phone.trim()) e.phone = "Phone is required for text reminders.";
      else if (digits(b.customer.phone).length !== 10) e.phone = "Enter a 10-digit US phone number.";
      if (!b.customer.email.trim()) e.email = "Email is required for your confirmation.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(b.customer.email.trim())) e.email = "Enter a valid email.";
      if (b.customer.address.trim().length < 6) e.address = "Enter the service address.";
      break;
    case 6:
      if (!b.paymentMethod) {
        e.payment = "Choose how you'd like to pay.";
        break;
      }
      // Only the card form needs validating. Google Pay is mocked; Zelle/Venmo are paid after service.
      if (b.paymentMethod !== "card" || !card) break;
      if (card.name.trim().length < 2) e.cardName = "Name on card is required.";
      if (digits(card.number).length < 15) e.cardNumber = "Enter a valid card number.";
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.expiry)) e.expiry = "Use MM/YY.";
      if (!/^\d{3,4}$/.test(card.cvc)) e.cvc = "3–4 digits.";
      if (!/^\d{5}$/.test(card.zip)) e.zip = "5-digit ZIP.";
      break;
  }
  return e;
}

export function formatCardNumber(v: string) {
  return digits(v).slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}
export function formatExpiry(v: string) {
  const d = digits(v).slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}
export function formatPhone(v: string) {
  const d = digits(v).slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}
