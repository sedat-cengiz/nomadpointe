import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Currency Converter",
  description:
    "Convert currencies and plan your travel budget with a simple currency converter built for digital nomads.",
  alternates: {
    canonical: "https://nomadpoint.com/tools/currency",
  },
  openGraph: {
    title: "Currency Converter | NomadPoint",
    description:
      "Convert currencies and plan your travel budget with a simple currency converter built for digital nomads.",
    url: "https://nomadpoint.com/tools/currency",
    images: [
      {
        url: "/images/og-image.svg",
        width: 1200,
        height: 630,
        alt: "NomadPoint - Currency Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Currency Converter | NomadPoint",
    description:
      "Convert currencies and plan your travel budget with a simple currency converter built for digital nomads.",
    images: ["/images/og-image.svg"],
  },
};

export default function CurrencyToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


