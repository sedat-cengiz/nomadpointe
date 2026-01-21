import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Cities",
  description:
    "Compare up to 3 cities side by side. See internet speed, cost of living, safety, and nomad visa availability to pick your next destination.",
  alternates: {
    canonical: "https://nomadpointe.com/compare",
  },
  openGraph: {
    title: "Compare Cities | NomadPointe",
    description:
      "Compare up to 3 cities side by side. See internet speed, cost of living, safety, and nomad visa availability.",
    url: "https://nomadpointe.com/compare",
    images: [
      {
        url: "/images/og-image.svg",
        width: 1200,
        height: 630,
        alt: "NomadPointe - Compare Cities",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Cities | NomadPointe",
    description:
      "Compare up to 3 cities side by side. See internet speed, cost of living, safety, and nomad visa availability.",
    images: ["/images/og-image.svg"],
  },
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return children;
}


