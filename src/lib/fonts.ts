import { Syncopate, Syne, Outfit } from "next/font/google";

export const syncopate = Syncopate({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-syncopate",
  display: "swap",
});

export const syne = Syne({
  weight: ["700", "800"],
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const outfit = Outfit({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});
