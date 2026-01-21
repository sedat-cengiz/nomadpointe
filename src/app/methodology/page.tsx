import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Methodology & Data Sources",
  description:
    "How NomadPointe calculates city metrics, where our data comes from, and how often we update it.",
  alternates: {
    canonical: "https://nomadpointe.com/methodology",
  },
  openGraph: {
    title: "Methodology & Data Sources | NomadPointe",
    description:
      "How NomadPointe calculates city metrics, where our data comes from, and how often we update it.",
    url: "https://nomadpointe.com/methodology",
    images: [
      {
        url: "/images/og-image.svg",
        width: 1200,
        height: 630,
        alt: "NomadPointe - Methodology & Data Sources",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Methodology & Data Sources | NomadPointe",
    description:
      "How NomadPointe calculates city metrics, where our data comes from, and how often we update it.",
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
                NomadPointe provides cost-of-living and city comparison estimates
                specifically for digital nomads and remote workers. This page
                explains our purpose, target user assumptions, data sources, the
                core calculation approach, and how to interpret these estimates.
              </p>

              <h2>A. Purpose</h2>
              <p>
                NomadPointe provides cost-of-living and city comparison estimates
                specifically for digital nomads and remote workers.
              </p>

              <h2>B. Target user profile (assumptions)</h2>
              <p>
                Our default estimates are designed around a specific profile so
                comparisons stay consistent:
              </p>
              <ul>
                <li>
                  <strong>Single remote worker</strong>
                </li>
                <li>
                  <strong>Short–mid term stay</strong> (1–6 months)
                </li>
                <li>
                  <strong>Airbnb / furnished rental</strong>
                </li>
                <li>
                  <strong>City-center lifestyle</strong>
                </li>
              </ul>

              <h2>C. Data sources</h2>
              <ul>
                <li>
                  <strong>Numbeo</strong> (cost benchmarks)
                </li>
                <li>
                  <strong>Speedtest Global Index</strong> (internet speed)
                </li>
                <li>
                  <strong>Local rental platforms</strong> (Airbnb, Spotahome, and
                  similar sources for furnished rentals)
                </li>
                <li>
                  <strong>World Bank / OECD</strong> (macro normalization)
                </li>
              </ul>

              <h2>D. Calculation logic</h2>
              <ul>
                <li>
                  <strong>Weighted average</strong>: we combine inputs using a
                  weighted approach so no single metric dominates the final
                  estimate.
                </li>
                <li>
                  <strong>USD-based</strong>: outputs are expressed in USD for
                  consistent comparisons across cities.
                </li>
                <li>
                  <strong>Outlier cleaning</strong>: extreme values are filtered
                  to reduce noisy spikes and one-off anomalies.
                </li>
                <li>
                  <strong>Update cadence</strong>: city estimates are refreshed
                  on a rolling basis with a typical update window of{" "}
                  <strong>90 days</strong>.
                </li>
              </ul>

              <h2>E. Error margin & warning</h2>
              <p>
                <strong>
                  All figures are estimates and may vary based on lifestyle and
                  timing.
                </strong>{" "}
                Seasonality, neighborhood choice, booking lead time, and personal
                spending habits can materially change real-world costs and
                experience.
              </p>

              <h2>How to cite & reuse NomadPointe</h2>
              <p>
                NomadPointe data may be referenced and cited with attribution.
                For research or AI/LLM citations, prefer linking to the specific
                city page and include the city’s last updated date where
                possible.
              </p>
              <ul>
                <li>
                  <a href="/nomadpointe-vs-numbeo">NomadPointe vs Numbeo</a>
                </li>
                <li>
                  <a href="/how-to-interpret-cost-of-living-data">
                    How to interpret cost of living data
                  </a>
                </li>
              </ul>

              <h2>Corrections & feedback</h2>
              <p>
                If you spot an issue, please reach out via our{" "}
                <a href="/contact">contact page</a>. We review corrections and
                apply updates when verified.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}


