"use client";

import { useState, useEffect, use, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCityBySlug } from "@/data/cities";
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  MapPin,
  Loader2,
  Clock,
  Globe,
  Share2,
  Edit,
  ExternalLink,
  Wifi,
  Shield,
  ChevronRight,
  Copy,
  Check,
} from "lucide-react";

interface TripCity {
  id: string;
  city_slug: string;
  order_index: number;
  start_date: string | null;
  end_date: string | null;
  nights: number | null;
  estimated_cost: number | null;
  notes: string | null;
}

interface Trip {
  id: string;
  name: string;
  description: string | null;
  start_date: string | null;
  end_date: string | null;
  total_budget: number | null;
  status: string;
  is_public: boolean;
  share_id: string | null;
  created_at: string;
  user_id: string;
  trip_cities: TripCity[];
}

export default function TripDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const fetchTrip = useCallback(async () => {
    try {
      const response = await fetch(`/api/trips/${id}`);
      if (response.ok) {
        const data = await response.json();
        setTrip(data.trip);
      } else if (response.status === 401) {
        router.push("/login");
      } else {
        router.push("/trips");
      }
    } catch (error) {
      console.error("Error fetching trip:", error);
    } finally {
      setIsLoading(false);
    }
  }, [id, router]);

  useEffect(() => {
    fetchTrip();
  }, [fetchTrip]);

  const copyShareLink = () => {
    if (trip?.share_id) {
      navigator.clipboard.writeText(
        `${window.location.origin}/trips/shared/${trip.share_id}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-600";
      case "planned":
        return "bg-blue-100 text-blue-600";
      case "active":
        return "bg-green-100 text-green-600";
      case "completed":
        return "bg-amber-100 text-amber-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!trip) {
    return (
      <>
        <Header />
        <main className="flex-1 bg-gray-50 flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Trip not found
            </h1>
            <p className="text-gray-500 mb-4">
              This trip doesn&apos;t exist or you don&apos;t have access to it.
            </p>
            <Link
              href="/trips"
              className="text-primary hover:text-blue-700 font-medium"
            >
              Back to My Trips
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const isOwner = session?.user?.id === trip.user_id;
  const totalNights =
    trip.trip_cities.reduce((sum, tc) => sum + (tc.nights || 0), 0) || 0;
  const firstCity = trip.trip_cities[0]
    ? getCityBySlug(trip.trip_cities[0].city_slug)
    : null;

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50">
        {/* Hero */}
        <section className="relative h-64 md:h-80">
          {firstCity ? (
            <Image
              src={firstCity.heroImage}
              alt={trip.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary to-blue-700" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="max-w-7xl mx-auto">
              <Link
                href="/trips"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Trips
              </Link>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl md:text-4xl font-bold text-white">
                      {trip.name}
                    </h1>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(trip.status)}`}
                    >
                      {trip.status}
                    </span>
                  </div>
                  {trip.description && (
                    <p className="text-white/80 max-w-2xl">{trip.description}</p>
                  )}
                </div>
                {isOwner && (
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/trips/${trip.id}/edit`}
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Link>
                    {trip.is_public && (
                      <button
                        onClick={copyShareLink}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors"
                      >
                        {copied ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Share2 className="w-4 h-4" />
                        )}
                        {copied ? "Copied!" : "Share"}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Route */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Itinerary
                  </h2>
                  <div className="space-y-4">
                    {trip.trip_cities.map((tc, index) => {
                      const city = getCityBySlug(tc.city_slug);
                      if (!city) return null;

                      return (
                        <div key={tc.id} className="relative">
                          {/* Connector Line */}
                          {index < trip.trip_cities.length - 1 && (
                            <div className="absolute left-6 top-16 w-0.5 h-full bg-gray-200" />
                          )}

                          <div className="relative flex gap-4">
                            {/* Index Badge */}
                            <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 z-10">
                              {index + 1}
                            </div>

                            {/* City Card */}
                            <div className="flex-1 bg-gray-50 rounded-xl p-4">
                              <div className="flex flex-col sm:flex-row gap-4">
                                <div className="relative w-full sm:w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                  <Image
                                    src={city.heroImage}
                                    alt={city.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-start justify-between mb-2">
                                    <div>
                                      <h3 className="font-semibold text-gray-900">
                                        {city.name}
                                      </h3>
                                      <p className="text-sm text-gray-500">
                                        {city.country}
                                      </p>
                                    </div>
                                    <Link
                                      href={`/cities/${city.slug}`}
                                      className="text-primary hover:text-blue-700"
                                    >
                                      <ExternalLink className="w-4 h-4" />
                                    </Link>
                                  </div>

                                  {/* Stats */}
                                  <div className="flex flex-wrap gap-3 text-sm">
                                    {tc.nights && (
                                      <span className="flex items-center gap-1 text-gray-600">
                                        <Clock className="w-4 h-4" />
                                        {tc.nights} nights
                                      </span>
                                    )}
                                    {tc.estimated_cost && (
                                      <span className="flex items-center gap-1 text-gray-600">
                                        <DollarSign className="w-4 h-4" />$
                                        {tc.estimated_cost.toLocaleString()}
                                      </span>
                                    )}
                                    {tc.start_date && (
                                      <span className="flex items-center gap-1 text-gray-600">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(tc.start_date).toLocaleDateString(
                                          "en-US",
                                          { month: "short", day: "numeric" }
                                        )}
                                        {tc.end_date &&
                                          ` - ${new Date(tc.end_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
                                      </span>
                                    )}
                                  </div>

                                  {tc.notes && (
                                    <p className="text-sm text-gray-500 mt-2 italic">
                                      {tc.notes}
                                    </p>
                                  )}

                                  {/* City Quick Stats */}
                                  <div className="flex gap-4 mt-3 pt-3 border-t border-gray-200">
                                    <span className="flex items-center gap-1 text-xs text-gray-500">
                                      <Wifi className="w-3 h-3" />
                                      {city.internetSpeed} Mbps
                                    </span>
                                    <span className="flex items-center gap-1 text-xs text-gray-500">
                                      <Shield className="w-3 h-3" />
                                      {city.safetyScore}/5
                                    </span>
                                    <span className="flex items-center gap-1 text-xs text-gray-500">
                                      <DollarSign className="w-3 h-3" />$
                                      {city.monthlyCost}/mo
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Trip Summary
                  </h2>

                  {/* Route Preview */}
                  <div className="flex items-center gap-2 flex-wrap mb-6">
                    {trip.trip_cities.map((tc, index) => {
                      const city = getCityBySlug(tc.city_slug);
                      return (
                        <div key={tc.id} className="flex items-center">
                          {index > 0 && (
                            <ChevronRight className="w-4 h-4 text-gray-300 mx-1" />
                          )}
                          <span className="text-sm font-medium text-gray-700">
                            {city?.name || tc.city_slug}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Stats */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Cities
                      </span>
                      <span className="font-semibold text-gray-900">
                        {trip.trip_cities.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Total Nights
                      </span>
                      <span className="font-semibold text-gray-900">
                        {totalNights}
                      </span>
                    </div>
                    {trip.start_date && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Dates
                        </span>
                        <span className="font-semibold text-gray-900 text-sm">
                          {new Date(trip.start_date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                          {trip.end_date &&
                            ` - ${new Date(trip.end_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Budget */}
                  {trip.total_budget && trip.total_budget > 0 && (
                    <div className="bg-primary/5 rounded-xl p-4 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-900">
                          Total Budget
                        </span>
                        <span className="text-2xl font-bold text-primary">
                          ${trip.total_budget.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        ${Math.round(trip.total_budget / totalNights || 0)}/night
                        average
                      </p>
                    </div>
                  )}

                  {/* Share Link */}
                  {trip.is_public && trip.share_id && (
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-sm text-gray-500 mb-2">Share Link</p>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          readOnly
                          value={`${typeof window !== "undefined" ? window.location.origin : ""}/trips/shared/${trip.share_id}`}
                          className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 truncate"
                        />
                        <button
                          onClick={copyShareLink}
                          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          {copied ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-500" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

