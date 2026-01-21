import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Methodology & Data Sources",
  description:
    "How NomadPoint calculates city metrics, where our data comes from, and how often we update it.",
  alternates: {
    canonical: "https://nomadpoint.com/methodology",
  },
  openGraph: {
    title: "Methodology & Data Sources | NomadPoint",
    description:
      "How NomadPoint calculates city metrics, where our data comes from, and how often we update it.",
    url: "https://nomadpoint.com/methodology",
    images: [
      {
        url: "/images/og-image.svg",
        width: 1200,
        height: 630,
        alt: "NomadPoint - Methodology & Data Sources",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Methodology & Data Sources | NomadPoint",
    description:
      "How NomadPoint calculates city metrics, where our data comes from, and how often we update it.",
    images: ["/images/og-image.svg"],
  },
};

export default function MethodologyPage() {
  const lastUpdated = "January 21, 2026";

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Methodology & Data Sources
            </h1>
            <p className="text-gray-500 mb-8">Last updated: {lastUpdated}</p>

            <div className="prose prose-gray max-w-none">
              <p>
                NomadPoint exists to help remote workers make better decisions
                using clear, comparable metrics. This page explains how we
                calculate our city scores, where data comes from, and how we
                handle updates and corrections.
              </p>

              <h2>1. What we measure</h2>
              <ul>
                <li>
                  <strong>Cost of living</strong> (monthly estimate)
                </li>
                <li>
                  <strong>Internet speed</strong> (typical download throughput)
                </li>
                <li>
                  <strong>Safety</strong> (relative safety score)
                </li>
                <li>
                  <strong>Visa availability</strong> (digital nomad visa or
                  remote-work friendly options)
                </li>
                <li>
                  <strong>Nomad score</strong> (an aggregated score derived from
                  multiple factors)
                </li>
              </ul>

              <h2>2. How scoring works (high level)</h2>
              <p>
                Our goal is not to claim a single “truth” about a city, but to
                provide consistent comparisons. A typical nomad score blends key
                factors such as affordability, connectivity, and safety.
              </p>
              <p>
                Where we combine metrics, we normalize them so that no single
                unit (USD, Mbps, etc.) dominates the result. If a metric is
                missing, we avoid guessing; we either exclude it from the
                aggregate or clearly mark data as unavailable.
              </p>

              <h2>3. Data sources</h2>
              <p>
                City profiles may include both structured data and editorial
                guidance. Sources can include public datasets, reputable
                providers, and community/partner inputs. When a metric is based
                on an estimate, we label it as such.
              </p>
              <ul>
                <li>Public datasets and published reports</li>
                <li>Provider documentation (e.g., visa policy pages)</li>
                <li>Community submissions and feedback</li>
              </ul>

              <h2>4. Update policy</h2>
              <p>
                We update city data on a rolling basis. Each city page shows a{" "}
                <strong>Last updated</strong> date when available.
              </p>

              <h2>5. Corrections & feedback</h2>
              <p>
                If you spot an issue, please reach out via our{" "}
                <a href="/contact">contact page</a>. We review corrections and
                apply updates when verified.
              </p>

              <h2>6. How to cite NomadPoint</h2>
              <p>
                For research or AI/LLM citations, prefer linking to the specific
                city page and include the city’s last updated date where
                possible.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}


