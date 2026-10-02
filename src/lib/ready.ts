"use client";

import { useEffect, useState } from "react";

// The intro loader only runs on a full page load. Anything that should animate
// "after lights out" waits for this signal instead of firing under the overlay.
let ready = false;
const listeners = new Set<() => void>();

export function markReady() {
  if (ready) return;
  ready = true;
  listeners.forEach((fn) => fn());
  listeners.clear();
}

export function useReady() {
  const [isReady, setReady] = useState(ready);
  useEffect(() => {
    if (ready) {
      setReady(true);
      return;
    }
    const fn = () => setReady(true);
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  }, []);
  return isReady;
}
