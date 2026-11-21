"use client";

import { MotionConfig } from "framer-motion";
import { useState } from "react";
import { Provider } from "react-redux";
import type { Persistor } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { makePersistor, makeStore } from "@/store";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [store] = useState(makeStore);
  // Browser only: Next 16 forbids clock reads during prerender, and there is no localStorage on the server.
  // PersistGate renders no DOM of its own, so server (no gate) and client (gate) hydrate identically.
  const [persistor] = useState<Persistor | null>(() => (typeof window === "undefined" ? null : makePersistor(store)));

  return (
    <Provider store={store}>
      {/* Honour prefers-reduced-motion everywhere without SSR/hydration mismatches */}
      <MotionConfig reducedMotion="user">
      {persistor ? (
        /*
          Render-function children: marketing pages stay server-rendered (SEO, no blank flash).
          Persisted screens (booking, bookings, account) wait on `useRehydrated()` instead,
          so there is no flicker of empty booking state after refresh.
        */
        <PersistGate loading={null} persistor={persistor}>
          {() => children}
        </PersistGate>
      ) : (
        children
      )}
      </MotionConfig>
    </Provider>
  );
}
