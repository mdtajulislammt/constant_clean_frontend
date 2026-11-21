import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  createMigrate,
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
  type PersistConfig,
} from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { isPackageId, isTimeSlotId } from "@/lib/config";
import { packagePrice } from "@/lib/pricing";
import booking, { ACTIVE_STEPS, initialBookingState, type BookingState } from "./slices/bookingSlice";
import bookings, { type Booking } from "./slices/bookingsSlice";
import user from "./slices/userSlice";

/** localStorage in the browser, no-op on the server (SSR safe). */
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : {
        getItem: async () => null,
        setItem: async (_k: string, v: unknown) => v,
        removeItem: async () => undefined,
      };

const rootReducer = combineReducers({ booking, bookings, user });

/* eslint-disable @typescript-eslint/no-explicit-any -- migrations read old, untyped persisted shapes */
const OLD_SLOTS: Record<string, string> = { "09-12": "08-11", "12-15": "11-14", "15-18": "14-17" };

/**
 * Persist migrations. Bump `PERSIST_VERSION` and add a step whenever persisted shapes change.
 * v2 (Nov 2026): new slot ids, fixed-price packages (old package ids removed), payment fields.
 */
const migrations = {
  2: (state: any) => {
    if (!state) return state;

    // In-progress booking: reset it if its slot/package no longer exists (keep contact details).
    const b = state.booking as Partial<BookingState> | undefined;
    let nextBooking: BookingState | undefined;
    if (b) {
      const invalid = (b.slot != null && !isTimeSlotId(b.slot)) || (b.packageId != null && !isPackageId(b.packageId));
      nextBooking = invalid
        ? { ...initialBookingState, customer: { ...initialBookingState.customer, ...b.customer } }
        : {
            ...initialBookingState,
            ...b,
            addOns: [],
            step: b.step && (b.step === 7 || ACTIVE_STEPS.includes(b.step)) ? b.step : 1,
            total: packagePrice(b.packageId ?? null),
          };
      // A confirmed booking from v1 can't render on the new confirmation screen; start fresh.
      if (nextBooking.step === 7) nextBooking = { ...initialBookingState, customer: nextBooking.customer };
    }

    // Saved bookings: map old slots/packages onto the new ones and add payment fields.
    const items: any[] = state.bookings?.items ?? [];
    const nextItems: Booking[] = items.map((x) => {
      const packageId = isPackageId(x.packageId) ? x.packageId : "full";
      return {
        ...x,
        packageId,
        slot: isTimeSlotId(x.slot) ? x.slot : (OLD_SLOTS[x.slot] ?? "08-11"),
        addOns: [],
        paymentMethod: x.paymentMethod ?? "card",
        paymentStatus: x.paymentStatus ?? "paid", // v1 bookings were all paid upfront by card
      };
    });

    return {
      ...state,
      ...(nextBooking ? { booking: nextBooking } : {}),
      ...(state.bookings ? { bookings: { ...state.bookings, items: nextItems } } : {}),
    };
  },
};
/* eslint-enable @typescript-eslint/no-explicit-any */

export const PERSIST_VERSION = 2;

type RootReducerState = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<RootReducerState> = {
  key: "constant-clean",
  version: PERSIST_VERSION,
  storage,
  whitelist: ["booking", "bookings", "user"],
  // Merge each persisted slice over its initial state, so newly added fields get defaults.
  stateReconciler: autoMergeLevel2,
  migrate: createMigrate(migrations, { debug: false }),
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export function makeStore() {
  return configureStore({
    reducer: persistedReducer,
    middleware: (gDM) =>
      gDM({ serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] } }),
  });
}

/** Call in the browser only (redux-persist reads the clock + localStorage). */
export const makePersistor = (store: AppStore) => persistStore(store);

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
