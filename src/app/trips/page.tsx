"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCityBySlug } from "@/data/cities";
import {
  Map,
  Plus,
  Calendar,
  DollarSign,
  MapPin,
  Loader2,
  ChevronRight,
  Clock,
  Globe,
  Trash2,
} from "lucide-react";

interface TripCity {
  id: string;
  city_slug: string;
  order_index: number;
  start_date: string | null;
  end_date: string | null;
  nights: number | null;
  estimated_cost: number | null;
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
  trip_cities: TripCity[];
}

export default function TripsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/trips");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      fetchTrips();
    }
  }, [session]);

  const fetchTrips = async () => {
    try {
      const response = await fetch("/api/trips");
      const data = await response.json();
      setTrips(data.trips || []);
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (tripId: string) => {
    if (!confirm("Are you sure you want to delete this trip?")) return;
    
    setDeletingId(tripId);
    try {
      const response = await fetch(`/api/trips/${tripId}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        setTrips(trips.filter((t) => t.id !== tripId));
      }
    } catch (error) {
      console.error("Error deleting trip:", error);
    } finally {
      setDeletingId(null);
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

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50">
        {/* Header */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Trips</h1>
                <p className="text-gray-500 mt-1">
                  Plan and track your nomad adventures
                </p>
              </div>
              <Link
                href="/trips/new"
                className="inline-flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                <Plus className="w-5 h-5" />
                New Trip
              </Link>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            ) : trips.length > 0 ? (
              <div className="space-y-4">
                {trips.map((trip) => {
                  const firstCity = trip.trip_cities[0]
                    ? getCityBySlug(trip.trip_cities[0].city_slug)
                    : null;
                  const totalNights = trip.trip_cities.reduce(
                    (sum, tc) => sum + (tc.nights || 0),
                    0
                  );

                  return (
                    <div
                      key={trip.id}
                      className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row">
                        {/* Image */}
                        <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0">
                          {firstCity ? (
                            <Image
                              src={firstCity.heroImage}
                              alt={firstCity.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 256px"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                              <Globe className="w-12 h-12 text-gray-300" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent md:bg-gradient-to-t" />
                          <div className="absolute bottom-3 left-3 md:hidden">
                            <h3 className="text-white font-bold text-xl">
                              {trip.name}
                            </h3>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-bold text-gray-900 hidden md:block">
                                  {trip.name}
                                </h3>
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(trip.status)}`}
                                >
                                  {trip.status}
                                </span>
                              </div>
                              {trip.description && (
                                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                                  {trip.description}
                                </p>
                              )}
                            </div>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleDelete(trip.id);
                              }}
                              disabled={deletingId === trip.id}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              {deletingId === trip.id ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                              ) : (
                                <Trash2 className="w-5 h-5" />
                              )}
                            </button>
                          </div>

                          {/* Cities */}
                          {trip.trip_cities.length > 0 && (
                            <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
                              {trip.trip_cities.map((tc, index) => {
                                const city = getCityBySlug(tc.city_slug);
                                return (
                                  <div key={tc.id} className="flex items-center">
                                    {index > 0 && (
                                      <ChevronRight className="w-4 h-4 text-gray-300 mx-1" />
                                    )}
                                    <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm whitespace-nowrap">
                                      <MapPin className="w-3 h-3 text-gray-400" />
                                      {city?.name || tc.city_slug}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          )}

                          {/* Stats */}
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            {trip.start_date && (
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(trip.start_date).toLocaleDateString(
                                  "en-US",
                                  { month: "short", day: "numeric" }
                                )}
                                {trip.end_date &&
                                  ` - ${new Date(trip.end_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
                              </div>
                            )}
                            {totalNights > 0 && (
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {totalNights} nights
                              </div>
                            )}
                            {trip.total_budget && trip.total_budget > 0 && (
                              <div className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4" />$
                                {trip.total_budget.toLocaleString("en-US")}
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {trip.trip_cities.length}{" "}
                              {trip.trip_cities.length === 1 ? "city" : "cities"}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
                            <Link
                              href={`/trips/${trip.id}`}
                              className="px-4 py-2 bg-primary hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                            >
                              View Details
                            </Link>
                            <Link
                              href={`/trips/${trip.id}/edit`}
                              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                            >
                              Edit Trip
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Map className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  No trips yet
                </h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  Start planning your next adventure! Create multi-city
                  itineraries with automatic budget calculations and visa
                  information.
                </p>
                <Link
                  href="/trips/new"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Create Your First Trip
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

