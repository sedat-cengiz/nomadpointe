import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import AuthProvider from "@/components/providers/AuthProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://nomadpoint.com"),
  title: {
    default: "NomadPoint - Find Your Next Remote Work Hub",
    template: "%s | NomadPoint",
  },
  description:
    "Discover the best cities for digital nomads. Compare internet speeds, cost of living, visa options, and more. Your trusted guide to remote work destinations.",
  keywords: [
    "digital nomad",
    "remote work",
    "work from anywhere",
    "digital nomad cities",
    "remote work destinations",
    "cost of living",
    "nomad visa",
    "coworking",
  ],
  authors: [{ name: "NomadPoint" }],
  creator: "NomadPoint",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nomadpoint.com",
    siteName: "NomadPoint",
    title: "NomadPoint - Find Your Next Remote Work Hub",
    description:
      "Discover the best cities for digital nomads. Compare internet speeds, cost of living, visa options, and more.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NomadPoint - Digital Nomad City Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NomadPoint - Find Your Next Remote Work Hub",
    description:
      "Discover the best cities for digital nomads. Compare internet speeds, cost of living, visa options, and more.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <GoogleAnalytics />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

