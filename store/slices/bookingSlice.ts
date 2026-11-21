import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { SHOW_ADD_ONS, type AddOnId, type PackageId, type PaymentMethodId, type PaymentStatus, type TimeSlotId, type VehicleSizeId } from "@/lib/config";
import { bookingTotal } from "@/lib/pricing";

export const BOOKING_STEPS = ["Vehicle", "Package", "Add-ons", "Date & time", "Your details", "Review & pay"] as const;
/** 1–6 = form steps, 7 = confirmation. Step 3 (add-ons) is skipped while SHOW_ADD_ONS is false. */
export type BookingStep = 1 | 2 | 3 | 4 | 5 | 6 | 7;

/** Steps actually shown to the customer, in order. */
export const ACTIVE_STEPS: BookingStep[] = SHOW_ADD_ONS ? [1, 2, 3, 4, 5, 6] : [1, 2, 4, 5, 6];
export const stepLabel = (step: BookingStep) => BOOKING_STEPS[step - 1];

export interface Vehicle {
  size: VehicleSizeId | null;
  year: string;
  make: string;
  model: string;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
}

export interface BookingState {
  step: BookingStep;
  vehicle: Vehicle;
  packageId: PackageId | null;
  addOns: AddOnId[];
  date: string | null; // YYYY-MM-DD
  slot: TimeSlotId | null;
  customer: CustomerDetails;
  /** City picked from the Service Areas section / ZIP checker (prefills the address hint). */
  serviceCity: string | null;
  total: number;
  /** Card details are NEVER stored here (component state only). */
  paymentMethod: PaymentMethodId;
  paymentStatus: PaymentStatus;
  confirmedId: string | null;
}

export const initialBookingState: BookingState = {
  step: 1,
  vehicle: { size: null, year: "", make: "", model: "" },
  packageId: null,
  addOns: [],
  date: null,
  slot: null,
  customer: { name: "", phone: "", email: "", address: "", notes: "" },
  serviceCity: null,
  total: 0,
  paymentMethod: "card",
  paymentStatus: "unpaid",
  confirmedId: null,
};

const recalc = (s: BookingState) => {
  s.total = bookingTotal(s.packageId, s.addOns);
};

/** Move to the next/previous step that is actually shown. */
const shift = (step: BookingStep, dir: 1 | -1): BookingStep => {
  const i = ACTIVE_STEPS.indexOf(step);
  if (i === -1) return ACTIVE_STEPS.find((x) => (dir === 1 ? x > step : x < step)) ?? step;
  return ACTIVE_STEPS[Math.min(Math.max(i + dir, 0), ACTIVE_STEPS.length - 1)];
};

const bookingSlice = createSlice({
  name: "booking",
  initialState: initialBookingState,
  reducers: {
    goToStep(s, a: PayloadAction<BookingStep>) {
      s.step = a.payload === 7 || ACTIVE_STEPS.includes(a.payload) ? a.payload : shift(a.payload, 1);
    },
    nextStep(s) {
      if (s.step < 6) s.step = shift(s.step, 1);
    },
    prevStep(s) {
      if (s.step > 1 && s.step < 7) s.step = shift(s.step, -1);
    },
    setVehicle(s, a: PayloadAction<Partial<Vehicle>>) {
      s.vehicle = { ...s.vehicle, ...a.payload };
    },
    setPackage(s, a: PayloadAction<PackageId>) {
      s.packageId = a.payload;
      recalc(s);
    },
    toggleAddOn(s, a: PayloadAction<AddOnId>) {
      s.addOns = s.addOns.includes(a.payload) ? s.addOns.filter((x) => x !== a.payload) : [...s.addOns, a.payload];
      recalc(s);
    },
    setDate(s, a: PayloadAction<string>) {
      if (s.date !== a.payload) s.slot = null;
      s.date = a.payload;
    },
    setSlot(s, a: PayloadAction<TimeSlotId>) {
      s.slot = a.payload;
    },
    setCustomer(s, a: PayloadAction<Partial<CustomerDetails>>) {
      s.customer = { ...s.customer, ...a.payload };
    },
    setServiceCity(s, a: PayloadAction<string | null>) {
      s.serviceCity = a.payload;
    },
    setPaymentMethod(s, a: PayloadAction<PaymentMethodId>) {
      s.paymentMethod = a.payload;
    },
    markConfirmed(s, a: PayloadAction<{ id: string; paymentStatus: PaymentStatus }>) {
      s.confirmedId = a.payload.id;
      s.paymentStatus = a.payload.paymentStatus;
      s.step = 7;
    },
    /** Start a fresh booking but keep the customer's contact details. */
    resetBooking(s) {
      return { ...initialBookingState, customer: s.customer };
    },
  },
});

export const {
  goToStep,
  nextStep,
  prevStep,
  setVehicle,
  setPackage,
  toggleAddOn,
  setDate,
  setSlot,
  setCustomer,
  setServiceCity,
  setPaymentMethod,
  markConfirmed,
  resetBooking,
} = bookingSlice.actions;
export default bookingSlice.reducer;
