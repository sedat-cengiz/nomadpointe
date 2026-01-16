import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  PlugZap,
  Smartphone,
  CreditCard,
  Droplets,
  Shield,
  Plane,
  Wifi,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import { City, lifestyleOptions } from "@/types/city";

function money(n: number) {
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

function sectionHasAny(city: City) {
  return Boolean(
    city.practicalInfo ||
      city.transportInfo ||
      city.financeInfo ||
      city.healthInfo ||
      city.visa ||
      city.coworkingSpaces?.length ||
      city.internetSpeed ||
      city.monthlyCost
  );
}

export default function FirstTimeNomadEssentials({ city }: { city: City }) {
  if (!sectionHasAny(city)) return null;

  const practical = city.practicalInfo;
  const finance = city.financeInfo;
  const health = city.healthInfo;
  const transport = city.transportInfo;
  const visa = city.visa;

  const hasArrival =
    Boolean(practical?.emergencyNumber) ||
    Boolean(practical?.plugType) ||
    Boolean(practical?.voltage) ||
    Boolean(practical?.simOptions?.length) ||
    Boolean(finance?.atmFees) ||
    Boolean(finance?.cardAcceptance) ||
    Boolean(health?.waterSafety) ||
    Boolean(transport?.mainAirport) ||
    Boolean(transport?.airportToCenter) ||
    Boolean(transport?.rideshareApps?.length);

  const hasBudget = Boolean(city.monthlyCost && city.monthlyCost > 0);

  const hasWorkSetup = Boolean(city.internetSpeed) || Boolean(city.coworkingSpaces?.length);

  const hasVisa = Boolean(visa);

  const coworkingCount = city.coworkingSpaces?.length || 0;

  return (
    <section className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-primary" />
            First-time Nomad Essentials
          </h2>
          <p className="text-gray-600 mt-1">
            A practical checklist for your first days in {city.name}—only based on the data available on this page.
          </p>
        </div>
        <Link
          href="/trips/new"
          className="hidden sm:inline-flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold transition-colors"
        >
          Plan this trip
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Arrival (48 hours) */}
        {hasArrival && (
          <div className="border border-gray-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-gray-900">First 48 hours</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              {transport?.mainAirport && transport?.airportToCenter && (
                <li className="flex gap-2">
                  <Plane className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span>
                    <span className="font-medium">Airport:</span> {transport.mainAirport} • {transport.airportToCenter}
                  </span>
                </li>
              )}
              {transport?.rideshareApps?.length ? (
                <li className="flex gap-2">
                  <Plane className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span>
                    <span className="font-medium">Rideshare:</span> {transport.rideshareApps.slice(0, 3).join(", ")}
                  </span>
                </li>
              ) : null}
              {practical?.simOptions?.length ? (
                <li className="flex gap-2">
                  <Smartphone className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span>
                    <span className="font-medium">SIM options:</span>{" "}
                    {practical.simOptions
                      .slice(0, 2)
                      .map((s) => `${s.provider} (${s.dataPrice}${s.esimAvailable ? ", eSIM" : ""})`)
                      .join(" • ")}
                  </span>
                </li>
              ) : null}
              {practical?.plugType || practical?.voltage ? (
                <li className="flex gap-2">
                  <PlugZap className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span>
                    <span className="font-medium">Power:</span>{" "}
                    {[practical?.plugType ? `Plug ${practical.plugType}` : null, practical?.voltage ? practical.voltage : null]
                      .filter(Boolean)
                      .join(" • ")}
                  </span>
                </li>
              ) : null}
              {finance?.cardAcceptance || finance?.atmFees ? (
                <li className="flex gap-2">
                  <CreditCard className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span>
                    <span className="font-medium">Payments:</span>{" "}
                    {[finance?.cardAcceptance ? `Card: ${finance.cardAcceptance}` : null, finance?.atmFees ? `ATM fees: ${finance.atmFees}` : null]
                      .filter(Boolean)
                      .join(" • ")}
                  </span>
                </li>
              ) : null}
              {health?.waterSafety ? (
                <li className="flex gap-2">
                  <Droplets className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span>
                    <span className="font-medium">Water:</span> {health.waterSafety}
                  </span>
                </li>
              ) : null}
              {practical?.emergencyNumber ? (
                <li className="flex gap-2">
                  <Shield className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span>
                    <span className="font-medium">Emergency:</span> {practical.emergencyNumber}
                  </span>
                </li>
              ) : null}
            </ul>
          </div>
        )}

        {/* Budget reality */}
        {hasBudget && (
          <div className="border border-gray-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Briefcase className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-gray-900">Budget reality</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Quick estimates derived from the city&apos;s average monthly cost.
            </p>
            <div className="space-y-2">
              {lifestyleOptions.map((l) => {
                const monthly = city.monthlyCost * l.multiplier;
                const twoWeeks = (monthly / 30) * 14;
                return (
                  <div
                    key={l.id}
                    className="flex items-center justify-between text-sm bg-gray-50 rounded-xl px-3 py-2"
                  >
                    <span className="text-gray-700 font-medium">{l.label}</span>
                    <span className="text-gray-700">
                      {money(monthly)}/mo • {money(twoWeeks)}/14d
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Work setup */}
        {(hasWorkSetup || hasVisa) && (
          <div className="border border-gray-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Wifi className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-gray-900">Work setup & basics</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              {city.internetSpeed ? (
                <li className="flex gap-2">
                  <Wifi className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span>
                    <span className="font-medium">Internet:</span> ~{city.internetSpeed} Mbps
                  </span>
                </li>
              ) : null}
              {coworkingCount > 0 ? (
                <li className="flex gap-2">
                  <Briefcase className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span>
                    <span className="font-medium">Coworking:</span> {coworkingCount}+ options listed
                  </span>
                </li>
              ) : null}
              {visa ? (
                <li className="flex gap-2">
                  <Shield className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span>
                    <span className="font-medium">Visa:</span>{" "}
                    {visa.hasNomadVisa ? visa.visaName || "Digital nomad visa available" : "No dedicated nomad visa listed"}
                    {visa.maxStayDays ? ` • up to ${visa.maxStayDays} days` : ""}
                  </span>
                </li>
              ) : null}
              {practical?.timezone ? (
                <li className="flex gap-2">
                  <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span>
                    <span className="font-medium">Timezone:</span> {practical.timezone}
                  </span>
                </li>
              ) : null}
            </ul>
          </div>
        )}
      </div>

      <div className="sm:hidden mt-6">
        <Link
          href="/trips/new"
          className="inline-flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-semibold transition-colors w-full justify-center"
        >
          Plan this trip
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}


