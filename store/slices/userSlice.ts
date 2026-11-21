import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { Vehicle } from "./bookingSlice";

export interface SavedVehicle extends Vehicle {
  id: string;
}
export interface SavedAddress {
  id: string;
  label: string;
  address: string;
}

interface UserState {
  isLoggedIn: boolean; // MOCK auth — no real backend
  profile: { name: string; email: string; phone: string };
  vehicles: SavedVehicle[];
  addresses: SavedAddress[];
}

const initialState: UserState = {
  isLoggedIn: false,
  profile: { name: "", email: "", phone: "" },
  vehicles: [],
  addresses: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    mockLogin(s, a: PayloadAction<Partial<UserState["profile"]>>) {
      s.isLoggedIn = true;
      s.profile = { ...s.profile, ...a.payload };
    },
    logout() {
      return initialState;
    },
    updateProfile(s, a: PayloadAction<Partial<UserState["profile"]>>) {
      s.profile = { ...s.profile, ...a.payload };
    },
    saveVehicle(s, a: PayloadAction<Vehicle>) {
      const v = a.payload;
      const dupe = s.vehicles.some((x) => x.make === v.make && x.model === v.model && x.year === v.year);
      if (!dupe && v.size) s.vehicles.push({ ...v, id: nanoid(6) });
    },
    removeVehicle(s, a: PayloadAction<string>) {
      s.vehicles = s.vehicles.filter((v) => v.id !== a.payload);
    },
    saveAddress(s, a: PayloadAction<{ label: string; address: string }>) {
      if (a.payload.address && !s.addresses.some((x) => x.address === a.payload.address))
        s.addresses.push({ ...a.payload, id: nanoid(6) });
    },
    removeAddress(s, a: PayloadAction<string>) {
      s.addresses = s.addresses.filter((x) => x.id !== a.payload);
    },
  },
});

export const { mockLogin, logout, updateProfile, saveVehicle, removeVehicle, saveAddress, removeAddress } =
  userSlice.actions;
export default userSlice.reducer;
