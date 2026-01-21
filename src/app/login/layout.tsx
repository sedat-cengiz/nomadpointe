import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  alternates: {
    canonical: "https://nomadpointe.com/login",
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}


