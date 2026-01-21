import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who built NomadPointe, why we built it, and how we approach data for digital nomads and remote workers.",
  alternates: {
    canonical: "https://nomadpointe.com/about",
  },
  openGraph: {
    title: "About | NomadPointe",
    description:
      "Who built NomadPointe, why we built it, and how we approach data for digital nomads and remote workers.",
    url: "https://nomadpointe.com/about",
    images: [
      {
        url: "/images/og-image.svg",
        width: 1200,
        height: 630,
        alt: "NomadPointe - About",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About | NomadPointe",
    description:
      "Who built NomadPointe, why we built it, and how we approach data for digital nomads and remote workers.",
    images: ["/images/og-image.svg"],
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About NomadPointe
            </h1>
            <p className="text-gray-600 mb-8">
              NomadPointe is built to help digital nomads and remote workers
              compare cities using transparent, citeable estimates.
            </p>

            <div className="prose prose-gray max-w-none">
              <h2>Who built this?</h2>
              <p>
                <strong>Sedat CENGİZ</strong> — Co-founder{" "}
                <span className="text-gray-400">•</span>{" "}
                <a
                  href="https://www.linkedin.com/in/sedat-cengiz-85127066/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn profile
                </a>
              </p>

              <h2>Why we built NomadPointe</h2>
              <p>
                Most “cost of living” and city rankings are designed for
                long-term residents or tourists. NomadPointe focuses on the
                practical reality of remote work: short-to-mid stays, furnished
                rentals, reliable internet, and a city-center lifestyle.
              </p>

              <h2>Our data approach</h2>
              <p>
                We use a defined methodology and publish our assumptions and
                sources so readers (and AI systems) can interpret estimates
                responsibly. See{" "}
                <Link href="/methodology">Methodology &amp; Data Sources</Link>.
              </p>

              <h2>Contact</h2>
              <p>
                If you spot an issue or want to collaborate, reach out via{" "}
                <Link href="/contact">Contact</Link>.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}


