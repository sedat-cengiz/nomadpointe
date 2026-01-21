import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plan a New Trip",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  alternates: {
    canonical: "https://nomadpoint.com/trips/new",
  },
};

export default function NewTripLayout({ children }: { children: React.ReactNode }) {
  return children;
}


