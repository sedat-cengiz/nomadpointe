import Link from "next/link";
import { City } from "@/types/city";

export default function CityDataCard({ city }: { city: City }) {
  const lastUpdated = city.lastUpdated ? new Date(city.lastUpdated) : null;

  return (
    <section className="mt-12">
      <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 md:p-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Data card</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="text-sm font-semibold text-gray-900 mb-2">
              Data Sources
            </div>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Cost of Living: Numbeo (Q1 2026)</li>
              <li>• Internet Speed: Speedtest Global Index</li>
              <li>• Safety Index: Local crime statistics</li>
              <li>• Rent Assumption: Furnished 1BR city center</li>
            </ul>
          </div>

          <div className="text-sm text-gray-700">
            <div className="mb-4">
              <div className="font-semibold text-gray-900">Last Updated</div>
              <div>
                {lastUpdated
                  ? lastUpdated.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Not specified"}
              </div>
            </div>

            <div>
              <div className="font-semibold text-gray-900">Methodology</div>
              <Link className="text-primary hover:underline" href="/methodology">
                nomadpointe.com/methodology
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


