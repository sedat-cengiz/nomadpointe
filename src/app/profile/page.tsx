"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  User,
  Mail,
  Globe,
  DollarSign,
  Loader2,
  Save,
  Check,
} from "lucide-react";

const CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "THB", symbol: "฿", name: "Thai Baht" },
  { code: "MXN", symbol: "$", name: "Mexican Peso" },
  { code: "BRL", symbol: "R$", name: "Brazilian Real" },
  { code: "IDR", symbol: "Rp", name: "Indonesian Rupiah" },
  { code: "VND", symbol: "₫", name: "Vietnamese Dong" },
];

const LIFESTYLES = [
  {
    id: "budget",
    name: "Budget Backpacker",
    description: "Hostels, street food, public transport",
  },
  {
    id: "comfortable",
    name: "Comfortable Nomad",
    description: "Private apartment, eating out, occasional taxi",
  },
  {
    id: "executive",
    name: "Digital Executive",
    description: "Premium housing, fine dining, premium services",
  },
];

const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Netherlands",
  "Sweden",
  "Spain",
  "Italy",
  "Brazil",
  "Mexico",
  "Argentina",
  "Japan",
  "South Korea",
  "Singapore",
  "India",
  "Turkey",
  "Other",
];

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Form state
  const [preferredCurrency, setPreferredCurrency] = useState("USD");
  const [preferredLifestyle, setPreferredLifestyle] = useState("comfortable");
  const [passportCountry, setPassportCountry] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/profile");
    }
  }, [status, router]);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save - in real implementation, this would call the API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
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
      <main className="flex-1 bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Profile Settings
          </h1>

          {/* Profile Card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Account Information
            </h2>

            <div className="flex items-center gap-6 mb-6">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  width={80}
                  height={80}
                  className="rounded-xl"
                />
              ) : (
                <div className="w-20 h-20 bg-primary rounded-xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {session?.user?.name?.[0] || "U"}
                  </span>
                </div>
              )}
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {session?.user?.name}
                </h3>
                <p className="text-gray-500 flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4" />
                  {session?.user?.email}
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
              Account information is managed through your OAuth provider (Google
              or GitHub). To change your name or email, please update it there.
            </p>
          </div>

          {/* Preferences Card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              Preferences
            </h2>

            <div className="space-y-6">
              {/* Currency Preference */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Currency
                </label>
                <select
                  value={preferredCurrency}
                  onChange={(e) => setPreferredCurrency(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                >
                  {CURRENCIES.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-500 mt-2">
                  All costs will be displayed in this currency
                </p>
              </div>

              {/* Lifestyle Preference */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Travel Lifestyle
                </label>
                <div className="space-y-3">
                  {LIFESTYLES.map((lifestyle) => (
                    <button
                      key={lifestyle.id}
                      onClick={() => setPreferredLifestyle(lifestyle.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left ${
                        preferredLifestyle === lifestyle.id
                          ? "border-primary bg-primary/5"
                          : "border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      <div>
                        <div
                          className={`font-medium ${
                            preferredLifestyle === lifestyle.id
                              ? "text-primary"
                              : "text-gray-900"
                          }`}
                        >
                          {lifestyle.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {lifestyle.description}
                        </div>
                      </div>
                      {preferredLifestyle === lifestyle.id && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  This affects budget calculations and recommendations
                </p>
              </div>
            </div>
          </div>

          {/* Passport Country Card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Visa Information
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Passport Country
              </label>
              <select
                value={passportCountry}
                onChange={(e) => setPassportCountry(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              >
                <option value="">Select your passport country</option>
                {COUNTRIES.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-500 mt-2">
                Used to show relevant visa information for your nationality
              </p>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-semibold transition-colors disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : saved ? (
              <Check className="w-5 h-5" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            {isSaving ? "Saving..." : saved ? "Saved!" : "Save Preferences"}
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}

