import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, GitCompare } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuickStats from "@/components/QuickStats";
import AffiliateWidget from "@/components/AffiliateWidget";
import BudgetCalculator from "@/components/BudgetCalculator";
import SeasonalityTracker from "@/components/SeasonalityTracker";
import CommunityLinks from "@/components/CommunityLinks";
import FoodGuide from "@/components/FoodGuide";
import CommunityReviews from "@/components/CommunityReviews";
import VisaDetails from "@/components/VisaDetails";
import PracticalInfo from "@/components/PracticalInfo";
import HealthInfo from "@/components/HealthInfo";
import FinanceInfo from "@/components/FinanceInfo";
import TransportInfo from "@/components/TransportInfo";
import { getCityBySlug, getAllCitySlugs } from "@/data/cities";

interface PageProps {
  params: { slug: string };
}

// Generate static params for all cities
export async function generateStaticParams() {
  const slugs = getAllCitySlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const city = getCityBySlug(params.slug);

  if (!city) {
    return {
      title: "City Not Found",
    };
  }

  return {
    title: `${city.name} Digital Nomad Guide: Internet, Costs & Visas`,
    description: `Complete guide to living in ${city.name}, ${city.country} as a digital nomad. Internet speed: ${city.internetSpeed} Mbps, Monthly cost: $${city.monthlyCost}. ${city.shortDescription}`,
    keywords: [
      `${city.name} digital nomad`,
      `${city.name} cost of living`,
      `${city.name} remote work`,
      `${city.name} coworking`,
      `${city.name} internet speed`,
      `${city.country} digital nomad`,
    ],
    openGraph: {
      title: `${city.name} Digital Nomad Guide | NomadPoint`,
      description: city.shortDescription,
      images: [
        {
          url: city.heroImage,
          width: 1200,
          height: 630,
          alt: `${city.name}, ${city.country}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${city.name} Digital Nomad Guide | NomadPoint`,
      description: city.shortDescription,
      images: [city.heroImage],
    },
  };
}

export default function CityPage({ params }: PageProps) {
  const city = getCityBySlug(params.slug);

  if (!city) {
    notFound();
  }

  return (
    <>
      <Header />

      <main className="flex-1">
        {/* Hero Image */}
        <section className="relative h-[40vh] md:h-[50vh] lg:h-[60vh]">
          <Image
            src={city.heroImage}
            alt={`${city.name}, ${city.country}`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* Back Button */}
          <div className="absolute top-6 left-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-full transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              All Cities
            </Link>
          </div>

          {/* City Title */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-12">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                    {city.name}
                  </h1>
                  <p className="text-xl text-white/80">
                    {city.country} • {city.continent}
                  </p>
                </div>
                <Link
                  href={`/compare?cities=${city.slug}`}
                  className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-6 py-3 rounded-xl transition-colors"
                >
                  <GitCompare className="w-5 h-5" />
                  Compare with other cities
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Main Content - Left Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Short Description */}
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {city.shortDescription}
                  </p>
                </div>

                {/* Long Description */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: city.longDescription }}
                  />
                </div>

                {/* Visa & Legal Information */}
                <VisaDetails city={city} />

                {/* Practical Information */}
                <PracticalInfo city={city} />

                {/* Health & Safety */}
                <HealthInfo city={city} />

                {/* Finance & Banking */}
                <FinanceInfo city={city} />

                {/* Transportation */}
                <TransportInfo city={city} />

                {/* Food Guide */}
                <FoodGuide city={city} />

                {/* Community Reviews */}
                <CommunityReviews city={city} />

                {/* Seasonality Tracker */}
                <SeasonalityTracker city={city} />

                {/* Community Links */}
                <CommunityLinks city={city} />
              </div>

              {/* Sidebar - Right Column */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <QuickStats city={city} />

                {/* Budget Calculator */}
                <BudgetCalculator city={city} />

                {/* Affiliate Widgets */}
                <AffiliateWidget cityName={city.name} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

