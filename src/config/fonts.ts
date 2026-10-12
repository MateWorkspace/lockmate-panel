import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";

export const coolvetica = localFont({
  src: [
    {
      path: "../assets/fonts/coolvetica/Coolvetica Rg.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/coolvetica/Coolvetica Rg It.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../assets/fonts/coolvetica/Coolvetica Hv Comp.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-coolvetica",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const fontVariables = `${coolvetica.variable} ${plusJakarta.variable} ${geistMono.variable}`;
