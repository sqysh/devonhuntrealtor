"use client";

import { ReactNode } from "react";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import { ThemeProvider } from "@/lib/providers/theme.provider";

export function RootLayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </ThemeProvider>
  );
}
