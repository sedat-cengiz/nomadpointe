import Link from "next/link";
import { Home, Search, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />

      <main className="flex-1 flex items-center justify-center bg-background">
        <div className="max-w-md mx-auto px-4 py-16 text-center">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="text-8xl font-bold text-gray-200">404</div>
          </div>

          {/* Message */}
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            Looks like this destination doesn&apos;t exist. Maybe it&apos;s time
            to explore somewhere new?
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              <Home className="w-5 h-5" />
              Go Home
            </Link>
            <Link
              href="/#cities"
              className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors"
            >
              <Search className="w-5 h-5" />
              Browse Cities
            </Link>
          </div>

          {/* Popular Destinations */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">
              Popular destinations to explore:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {["bali", "lisbon", "bansko", "medellin", "istanbul"].map(
                (city) => (
                  <Link
                    key={city}
                    href={`/cities/${city}`}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-primary hover:text-primary transition-colors"
                  >
                    {city.charAt(0).toUpperCase() + city.slice(1)}
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

