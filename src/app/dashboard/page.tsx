"use client";

import { useState, useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CityCard from "@/components/CityCard";
import { useFavorites } from "@/hooks/useFavorites";
import { useCompare } from "@/hooks/useCompare";
import { cities, getCityBySlug } from "@/data/cities";
import {
  Heart,
  Map,
  Globe,
  TrendingUp,
  Calendar,
  ArrowRight,
  Loader2,
  Plus,
  ChevronRight,
  Star,
  MapPin,
} from "lucide-react";

type TabType = "overview" | "favorites" | "trips" | "visited";

function DashboardContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const { favorites, isFavorite, toggleFavorite, isLoading: favoritesLoading } = useFavorites();
  const { isSelected, toggleCity } = useCompare();

  // Get initial tab from URL
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && ["overview", "favorites", "trips", "visited"].includes(tab)) {
      setActiveTab(tab as TabType);
    }
  }, [searchParams]);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/dashboard");
    }
  }, [status, router]);

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  const favoriteCities = favorites
    .map((slug) => getCityBySlug(slug))
    .filter((city) => city !== undefined);

  const tabs = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "favorites", label: "Favorites", icon: Heart, count: favorites.length },
    { id: "trips", label: "My Trips", icon: Map },
    { id: "visited", label: "Visited", icon: Globe },
  ];

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50">
        {/* Profile Header */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Avatar */}
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  width={96}
                  height={96}
                  className="rounded-2xl border-4 border-white/10"
                />
              ) : (
                <div className="w-24 h-24 bg-primary rounded-2xl flex items-center justify-center border-4 border-white/10">
                  <span className="text-3xl font-bold">
                    {session?.user?.name?.[0] || "U"}
                  </span>
                </div>
              )}

              {/* User Info */}
              <div className="text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold">
                  {session?.user?.name || "Nomad"}
                </h1>
                <p className="text-slate-400 mt-1">{session?.user?.email}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Heart className="w-4 h-4 text-red-400" />
                    <span>{favorites.length} Favorites</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Map className="w-4 h-4 text-emerald-400" />
                    <span>0 Trips</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="w-4 h-4 text-amber-400" />
                    <span>0 Visited</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="md:ml-auto">
                <Link
                  href="/trips/new"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Plan New Trip
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="bg-white border-b border-gray-100 sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-1 overflow-x-auto pb-px">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                    {tab.count !== undefined && tab.count > 0 && (
                      <span className="w-5 h-5 bg-gray-100 text-gray-700 text-xs font-bold rounded-full flex items-center justify-center">
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                        <Heart className="w-6 h-6 text-red-500" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">
                          {favorites.length}
                        </p>
                        <p className="text-gray-500 text-sm">Favorite Cities</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                        <Map className="w-6 h-6 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">0</p>
                        <p className="text-gray-500 text-sm">Planned Trips</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                        <Globe className="w-6 h-6 text-amber-500" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">0</p>
                        <p className="text-gray-500 text-sm">Cities Visited</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Favorites */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">
                      Recent Favorites
                    </h2>
                    {favorites.length > 0 && (
                      <button
                        onClick={() => setActiveTab("favorites")}
                        className="text-primary hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                      >
                        View All
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {favoritesLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="w-6 h-6 text-primary animate-spin" />
                    </div>
                  ) : favoriteCities.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {favoriteCities.slice(0, 3).map((city) => (
                        <CityCard
                          key={city.slug}
                          city={city}
                          isFavorite={isFavorite(city.slug)}
                          onToggleFavorite={toggleFavorite}
                          isSelected={isSelected(city.slug)}
                          onToggleCompare={toggleCity}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No favorites yet
                      </h3>
                      <p className="text-gray-500 mb-4">
                        Start exploring cities and save your favorites
                      </p>
                      <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-primary hover:text-blue-700 font-medium"
                      >
                        Explore Cities
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Link
                    href="/trips/new"
                    className="bg-gradient-to-br from-primary to-blue-700 text-white rounded-2xl p-6 hover:shadow-lg transition-shadow group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold">Plan Your Trip</h3>
                        <p className="text-white/80 text-sm">
                          Create a multi-city itinerary
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 opacity-70 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>

                  <Link
                    href="/compare"
                    className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900">
                          Compare Cities
                        </h3>
                        <p className="text-gray-500 text-sm">
                          Side-by-side comparison
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </div>
              </div>
            )}

            {/* Favorites Tab */}
            {activeTab === "favorites" && (
              <div>
                {favoritesLoading ? (
                  <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  </div>
                ) : favoriteCities.length > 0 ? (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-gray-900">
                        {favorites.length} Favorite{" "}
                        {favorites.length === 1 ? "City" : "Cities"}
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {favoriteCities.map((city) => (
                        <CityCard
                          key={city.slug}
                          city={city}
                          isFavorite={isFavorite(city.slug)}
                          onToggleFavorite={toggleFavorite}
                          isSelected={isSelected(city.slug)}
                          onToggleCompare={toggleCity}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Heart className="w-10 h-10 text-red-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      No favorites yet
                    </h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-6">
                      Browse our collection of cities and click the heart icon
                      to save your favorites for quick access.
                    </p>
                    <Link
                      href="/"
                      className="inline-flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                    >
                      <MapPin className="w-5 h-5" />
                      Explore Cities
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Trips Tab */}
            {activeTab === "trips" && (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Map className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  No trips planned
                </h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  Start planning your next adventure! Create multi-city
                  itineraries with automatic budget calculations.
                </p>
                <Link
                  href="/trips/new"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Plan Your First Trip
                </Link>
              </div>
            )}

            {/* Visited Tab */}
            {activeTab === "visited" && (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-10 h-10 text-amber-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Track your journey
                </h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  Mark cities as visited to track your nomad journey and earn
                  badges. Coming soon!
                </p>
                <button
                  disabled
                  className="inline-flex items-center gap-2 bg-gray-100 text-gray-400 px-6 py-3 rounded-xl font-semibold cursor-not-allowed"
                >
                  <Globe className="w-5 h-5" />
                  Coming Soon
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}

