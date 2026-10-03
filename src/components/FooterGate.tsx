"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** The booking page is a single fixed screen, so it has no footer. */
export default function FooterGate({ children }: { children: ReactNode }) {
  return usePathname() === "/book" ? null : <>{children}</>;
}
