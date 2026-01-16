import { MapPin, Home, ExternalLink } from "lucide-react";
import { City } from "@/types/city";
import { getBookingUrl } from "@/lib/affiliates";
import TrackedAffiliateLink from "@/components/TrackedAffiliateLink";

function formatPriceLevel(level: City["neighborhoods"] extends (infer T)[] ? (T extends { priceLevel: infer P } ? P : never) : never) {
  switch (level) {
    case "budget":
      return "Budget";
    case "mid":
      return "Mid";
    case "premium":
      return "Premium";
    default:
      return String(level);
  }
}

function formatVibe(vibe: City["neighborhoods"] extends (infer T)[] ? (T extends { vibe: infer V } ? V : never) : never) {
  return String(vibe).replace(/-/g, " ");
}

export default function WhereToStay({ city }: { city: City }) {
  const neighborhoods = city.neighborhoods?.filter((n) => n?.name) ?? [];

  const coworkingNeighborhoods =
    city.coworkingSpaces
      ?.map((c) => c.neighborhood)
      .filter(Boolean)
      .filter((n, i, arr) => arr.indexOf(n) === i) ?? [];

  const shouldRender = neighborhoods.length > 0 || coworkingNeighborhoods.length > 0;
  if (!shouldRender) return null;

  const bookingUrl = getBookingUrl(city.name, city.country);

  return (
    <section className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-primary" />
            Where to stay in {city.name}
          </h2>
          <p className="text-gray-600 mt-1">
            Work‑friendly areas and neighborhoods based on the data we have for this city.
          </p>
        </div>

        <TrackedAffiliateLink
          href={bookingUrl}
          affiliateName="booking"
          placement="where_to_stay"
          cityName={city.name}
          className="hidden sm:inline-flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold transition-colors"
        >
          <Home className="w-4 h-4" />
          Browse stays
          <ExternalLink className="w-4 h-4" />
        </TrackedAffiliateLink>
      </div>

      {neighborhoods.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {neighborhoods.slice(0, 6).map((n) => (
            <div
              key={n.name}
              className="border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{n.name}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-700 capitalize">
                      {formatVibe(n.vibe)}
                    </span>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                      {formatPriceLevel(n.priceLevel)}
                    </span>
                  </div>
                </div>
              </div>

              {n.description && (
                <p className="text-sm text-gray-600 mt-3">{n.description}</p>
              )}

              {n.bestFor?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {n.bestFor.slice(0, 5).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
          <p className="text-gray-700 font-medium">
            Neighborhood details aren&apos;t available yet for {city.name}.
          </p>
          {coworkingNeighborhoods.length > 0 && (
            <p className="text-sm text-gray-600 mt-2">
              Based on coworking locations in our dataset, these areas show up most often:
              <span className="font-medium">
                {" "}
                {coworkingNeighborhoods.slice(0, 6).join(", ")}
              </span>
              .
            </p>
          )}
        </div>
      )}

      <div className="sm:hidden mt-6">
        <TrackedAffiliateLink
          href={bookingUrl}
          affiliateName="booking"
          placement="where_to_stay"
          cityName={city.name}
          className="inline-flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-semibold transition-colors w-full justify-center"
        >
          <Home className="w-5 h-5" />
          Browse stays in {city.name}
          <ExternalLink className="w-5 h-5" />
        </TrackedAffiliateLink>
      </div>
    </section>
  );
}


