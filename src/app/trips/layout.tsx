import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trips",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  alternates: {
    canonical: "https://nomadpoint.com/trips",
  },
};

export default function TripsLayout({ children }: { children: React.ReactNode }) {
  return children;
}


