import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timezone Converter",
  description:
    "Convert time zones and coordinate meetings across destinations with a simple timezone tool for remote work.",
  alternates: {
    canonical: "https://nomadpointe.com/tools/timezone",
  },
  openGraph: {
    title: "Timezone Converter | NomadPointe",
    description:
      "Convert time zones and coordinate meetings across destinations with a simple timezone tool for remote work.",
    url: "https://nomadpointe.com/tools/timezone",
    images: [
      {
        url: "/images/og-image.svg",
        width: 1200,
        height: 630,
        alt: "NomadPointe - Timezone Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Timezone Converter | NomadPointe",
    description:
      "Convert time zones and coordinate meetings across destinations with a simple timezone tool for remote work.",
    images: ["/images/og-image.svg"],
  },
};

export default function TimezoneToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


