"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch, useAppStore } from "@/store/hooks";
import { resetBooking, setServiceCity } from "@/store/slices/bookingSlice";

/** Save the chosen city on the booking (Redux) and open /book. Keeps an in-progress booking; restarts a finished one. */
export function useBookInCity() {
  const store = useAppStore();
  const dispatch = useAppDispatch();
  const router = useRouter();
  return (city: string) => {
    if (store.getState().booking.step === 7) dispatch(resetBooking());
    dispatch(setServiceCity(city));
    router.push("/book");
  };
}
