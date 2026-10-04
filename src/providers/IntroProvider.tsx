"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type IntroState = { ready: boolean; setReady: (ready: boolean) => void };

const IntroContext = createContext<IntroState | null>(null);

/** Signals when the preloader has cleared so above-the-fold intros can play. */
export function IntroProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  return <IntroContext.Provider value={{ ready, setReady }}>{children}</IntroContext.Provider>;
}

export function useIntro() {
  const ctx = useContext(IntroContext);
  if (!ctx) throw new Error("useIntro must be used within <IntroProvider>");
  return ctx;
}
