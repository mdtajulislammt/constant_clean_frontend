import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AddOnId, PackageId, PaymentMethodId, PaymentStatus, TimeSlotId } from "@/lib/config";
import type { CustomerDetails, Vehicle } from "./bookingSlice";

export type BookingStatus = "confirmed" | "completed" | "cancel-requested" | "reschedule-requested" | "cancelled";

export interface Booking {
  id: string;
  createdAt: string;
  vehicle: Vehicle;
  packageId: PackageId;
  addOns: AddOnId[];
  date: string;
  slot: TimeSlotId;
  customer: CustomerDetails;
  total: number;
  /** Card details are never saved — only the method and whether it's been paid. */
  paymentMethod: PaymentMethodId;
  paymentStatus: PaymentStatus;
  status: BookingStatus;
}

export interface BookingsState {
  items: Booking[];
}

// MOCK — one past booking so "Past" tab isn't empty in the demo.
export const initialBookingsState: BookingsState = {
  items: [
    {
      id: "CC-DEMO1",
      createdAt: "2026-10-01T10:00:00.000Z",
      vehicle: { size: "sedan", year: "2021", make: "Tesla", model: "Model 3" },
      packageId: "full",
      addOns: [],
      date: "2026-10-04",
      slot: "08-11",
      customer: { name: "Sample Customer", phone: "", email: "", address: "Dublin, CA", notes: "" },
      total: 200,
      paymentMethod: "zelle",
      paymentStatus: "paid",
      status: "completed",
    },
  ],
};

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: initialBookingsState,
  reducers: {
    addBooking(s, a: PayloadAction<Booking>) {
      s.items.unshift(a.payload);
    },
    setBookingStatus(s, a: PayloadAction<{ id: string; status: BookingStatus }>) {
      const b = s.items.find((x) => x.id === a.payload.id);
      if (b) b.status = a.payload.status;
    },
  },
});

export const { addBooking, setBookingStatus } = bookingsSlice.actions;
export default bookingsSlice.reducer;
