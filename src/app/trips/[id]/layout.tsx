import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trip Details",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function TripDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


