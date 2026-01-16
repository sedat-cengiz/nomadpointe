import { Database, ShieldCheck, Calendar, Link as LinkIcon } from "lucide-react";
import { City } from "@/types/city";

function coverageFlags(city: City) {
  return [
    { label: "Neighborhoods", ok: Boolean(city.neighborhoods?.length) },
    { label: "Coworking", ok: Boolean(city.coworkingSpaces?.length) },
    { label: "Visa", ok: Boolean(city.visa) },
    { label: "Practical", ok: Boolean(city.practicalInfo) },
    { label: "Health", ok: Boolean(city.healthInfo) },
    { label: "Finance", ok: Boolean(city.financeInfo) },
    { label: "Transport", ok: Boolean(city.transportInfo) },
    { label: "Food & cafes", ok: Boolean(city.foodAndWorkspace) },
    { label: "Reviews", ok: Boolean(city.reviews?.length) },
  ];
}

export default function DataProvenance({ city }: { city: City }) {
  const sources = city.dataSource?.filter(Boolean) ?? [];
  const hasMeta = Boolean(city.lastUpdated || sources.length > 0);
  const flags = coverageFlags(city);

  if (!hasMeta && flags.every((f) => !f.ok)) return null;

  return (
    <section className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
          <Database className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Data & sources</h3>
          <p className="text-sm text-gray-500">Transparency for this city profile</p>
        </div>
      </div>

      {city.lastUpdated && (
        <div className="flex items-center gap-2 text-sm text-gray-700 mb-3">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span>
            Last updated: <span className="font-medium">{city.lastUpdated}</span>
          </span>
        </div>
      )}

      {sources.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
            <LinkIcon className="w-4 h-4 text-gray-400" />
            Sources
          </div>
          <div className="flex flex-wrap gap-2">
            {sources.slice(0, 8).map((s) => (
              <span
                key={s}
                className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
          <ShieldCheck className="w-4 h-4 text-gray-400" />
          Data coverage
        </div>
        <div className="flex flex-wrap gap-2">
          {flags.map((f) => (
            <span
              key={f.label}
              className={`text-xs px-2 py-1 rounded-full ${
                f.ok ? "bg-emerald-50 text-emerald-700" : "bg-gray-50 text-gray-400"
              }`}
            >
              {f.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}


