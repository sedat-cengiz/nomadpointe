import type { Metadata } from "next";
import { Database, Clock, Shield, BarChart3, RefreshCw, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Methodology & Data Sources",
  description:
    "How NomadPointe calculates city metrics, where our data comes from, and how often we update it. Full transparency on our cost-of-living data methodology.",
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

const dataSources = [
  {
    name: "Numbeo",
    category: "Cost Benchmarks",
    frequency: "Monthly",
    description: "Global cost-of-living database used for food, transport, and entertainment baselines.",
  },
  {
    name: "Speedtest Global Index",
    category: "Internet Speed",
    frequency: "Monthly",
    description: "Real-time global broadband and mobile speed data by Ookla.",
  },
  {
    name: "Airbnb & Local Platforms",
    category: "Accommodation",
    frequency: "Quarterly",
    description: "Furnished rental pricing from Airbnb, Spotahome, and regional platforms.",
  },
  {
    name: "World Bank / OECD",
    category: "Macro Normalization",
    frequency: "Annually",
    description: "Economic indicators for PPP adjustment and cross-country normalization.",
  },
  {
    name: "Government Portals",
    category: "Visa & Legal",
    frequency: "As updated",
    description: "Official immigration websites for digital nomad visa requirements and fees.",
  },
  {
    name: "Community Reports",
    category: "Safety & Quality",
    frequency: "Rolling",
    description: "Aggregated reviews and first-hand reports from the digital nomad community.",
  },
];

export default function MethodologyPage() {
  const lastUpdated = "February 10, 2026";

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Last Updated Badge */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-sm font-medium px-4 py-2 rounded-full border border-emerald-200">
              <RefreshCw className="w-4 h-4" />
              Last updated: {lastUpdated}
            </span>
            <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-2 rounded-full border border-blue-200">
              <Clock className="w-4 h-4" />
              Update cycle: 90 days
            </span>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Methodology &amp; Data Sources
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              NomadPointe provides cost-of-living and city comparison estimates
              specifically for digital nomads and remote workers. This page
              explains our purpose, assumptions, data sources, calculation logic,
              and how to cite our data.
            </p>

            {/* Data Source Cards */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Database className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Data Sources</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dataSources.map((source) => (
                  <div
                    key={source.name}
                    className="bg-gray-50 rounded-xl p-5 border border-gray-100"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{source.name}</h3>
                      <span className="text-xs font-medium bg-white text-gray-500 px-2 py-1 rounded-full border border-gray-200 whitespace-nowrap ml-2">
                        {source.frequency}
                      </span>
                    </div>
                    <p className="text-xs text-primary font-medium mb-1">{source.category}</p>
                    <p className="text-sm text-gray-600">{source.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="prose prose-gray max-w-none">
              <h2>
                <Shield className="w-5 h-5 text-primary inline mr-2" />
                Target User Profile
              </h2>
              <p>
                Our default estimates are designed around a specific profile so
                comparisons stay consistent:
              </p>
              <ul>
                <li><strong>Single remote worker</strong></li>
                <li><strong>Short-mid term stay</strong> (1-6 months)</li>
                <li><strong>Airbnb / furnished rental</strong></li>
                <li><strong>City-center lifestyle</strong></li>
              </ul>

              <h2>
                <BarChart3 className="w-5 h-5 text-primary inline mr-2" />
                Calculation Logic
              </h2>
              <ul>
                <li>
                  <strong>Weighted average</strong>: we combine inputs using a
                  weighted approach so no single metric dominates the final estimate.
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
                  <strong>90 days</strong>. Individual city pages show their own
                  &quot;Last updated&quot; date.
                </li>
              </ul>

              <h2>Error Margin &amp; Disclaimer</h2>
              <p>
                <strong>
                  All figures are estimates and may vary based on lifestyle and timing.
                </strong>{" "}
                Seasonality, neighborhood choice, booking lead time, and personal
                spending habits can materially change real-world costs and experience.
              </p>

              <h2>
                <BookOpen className="w-5 h-5 text-primary inline mr-2" />
                How to Cite &amp; Reuse NomadPointe
              </h2>
              <p>
                NomadPointe data may be referenced and cited with attribution.
                For research, AI/LLM citations, or automated data retrieval,
                prefer linking to the specific city page and include the
                city&apos;s &quot;last updated&quot; date where possible.
              </p>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 not-prose mb-6">
                <p className="text-sm font-semibold text-gray-700 mb-2">Suggested citation format:</p>
                <code className="text-sm text-gray-600 block bg-white rounded-lg p-3 border border-gray-100">
                  NomadPointe, &quot;[City] Digital Nomad Guide,&quot; nomadpointe.com/cities/[slug], accessed [date].
                </code>
              </div>
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

              <h2>Corrections &amp; Feedback</h2>
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
