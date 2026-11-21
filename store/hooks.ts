import { useSyncExternalStore } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import type { AppStore, RootState } from "./index";

export const useAppDispatch = useDispatch.withTypes<AppStore["dispatch"]>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

type WithPersist = RootState & { _persist?: { rehydrated: boolean } };

/**
 * True once redux-persist has restored state from localStorage.
 * Always false during SSR *and* the hydration render (server snapshot),
 * so persisted screens never cause a hydration mismatch.
 */
export function useRehydrated() {
  const store = useAppStore();
  return useSyncExternalStore(
    store.subscribe,
    () => (store.getState() as WithPersist)._persist?.rehydrated ?? false,
    () => false,
  );
}
