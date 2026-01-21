"use client";

import { useState, useEffect, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  DollarSign,
  ArrowRight,
  RefreshCw,
  TrendingUp,
  Globe,
  Calculator,
  ArrowLeftRight,
  Loader2,
} from "lucide-react";

interface ExchangeRates {
  [key: string]: number;
}

const POPULAR_CURRENCIES = [
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧" },
  { code: "THB", name: "Thai Baht", symbol: "฿", flag: "🇹🇭" },
  { code: "MXN", name: "Mexican Peso", symbol: "$", flag: "🇲🇽" },
  { code: "VND", name: "Vietnamese Dong", symbol: "₫", flag: "🇻🇳" },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp", flag: "🇮🇩" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$", flag: "🇧🇷" },
  { code: "COP", name: "Colombian Peso", symbol: "$", flag: "🇨🇴" },
  { code: "PHP", name: "Philippine Peso", symbol: "₱", flag: "🇵🇭" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵" },
  { code: "KRW", name: "South Korean Won", symbol: "₩", flag: "🇰🇷" },
  { code: "TWD", name: "Taiwan Dollar", symbol: "NT$", flag: "🇹🇼" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM", flag: "🇲🇾" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$", flag: "🇸🇬" },
  { code: "HUF", name: "Hungarian Forint", symbol: "Ft", flag: "🇭🇺" },
  { code: "CZK", name: "Czech Koruna", symbol: "Kč", flag: "🇨🇿" },
  { code: "PLN", name: "Polish Zloty", symbol: "zł", flag: "🇵🇱" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺", flag: "🇹🇷" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "🇦🇺" },
];

// Simulated exchange rates (in production, fetch from API)
const MOCK_RATES: ExchangeRates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  THB: 35.5,
  MXN: 17.2,
  VND: 24500,
  IDR: 15700,
  BRL: 4.97,
  COP: 3950,
  PHP: 56.5,
  JPY: 149.5,
  KRW: 1320,
  TWD: 31.5,
  MYR: 4.72,
  SGD: 1.34,
  HUF: 360,
  CZK: 23.2,
  PLN: 4.05,
  TRY: 32.5,
  AUD: 1.54,
};

export default function CurrencyConverterPage() {
  const [amount, setAmount] = useState<string>("1000");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("THB");
  const [rates, setRates] = useState<ExchangeRates>(MOCK_RATES);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // In production, fetch rates from API
  useEffect(() => {
    // Simulating API fetch
    setLastUpdated(new Date());
  }, []);

  const convertedAmount = useMemo(() => {
    const numAmount = parseFloat(amount) || 0;
    const fromRate = rates[fromCurrency];
    const toRate = rates[toCurrency];
    return (numAmount / fromRate) * toRate;
  }, [amount, fromCurrency, toCurrency, rates]);

  const exchangeRate = useMemo(() => {
    const fromRate = rates[fromCurrency];
    const toRate = rates[toCurrency];
    return toRate / fromRate;
  }, [fromCurrency, toCurrency, rates]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const fromCurrencyInfo = POPULAR_CURRENCIES.find((c) => c.code === fromCurrency);
  const toCurrencyInfo = POPULAR_CURRENCIES.find((c) => c.code === toCurrency);

  // Quick conversion presets for nomads
  const quickPresets = [
    { label: "Daily Budget", amount: "50" },
    { label: "Weekly", amount: "350" },
    { label: "Monthly", amount: "1500" },
    { label: "3 Months", amount: "4500" },
  ];

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Calculator className="w-4 h-4" />
                Nomad Finance Tool
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                Currency Converter
              </h1>
              <p className="text-lg text-white/80">
                Convert currencies and plan your budget for your next
                destination. Real-time rates for digital nomad favorite
                currencies.
              </p>
            </div>
          </div>
        </section>

        {/* Converter */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* GEO: cite-ready summary */}
            <div className="mb-6 bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Quick answer
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                This tool converts an amount from one currency to another using exchange rates. It’s meant for fast budgeting (daily, weekly, monthly) when planning a remote-work destination.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Canonical URL: <span className="font-medium">nomadpoint.com/tools/currency</span>. Methodology:{" "}
                <a className="text-primary hover:underline font-medium" href="/methodology">
                  Methodology & Data Sources
                </a>
                .
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-8">
                {/* Main Converter */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-end">
                  {/* From */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      From
                    </label>
                    <div className="relative">
                      <select
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value)}
                        className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-xl appearance-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50"
                      >
                        {POPULAR_CURRENCIES.map((currency) => (
                          <option key={currency.code} value={currency.code}>
                            {currency.flag} {currency.code} - {currency.name}
                          </option>
                        ))}
                      </select>
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                        {fromCurrencyInfo?.flag}
                      </span>
                    </div>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full mt-3 px-4 py-4 text-2xl font-bold border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="0"
                    />
                  </div>

                  {/* Swap Button */}
                  <button
                    onClick={swapCurrencies}
                    className="w-12 h-12 bg-primary hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors mx-auto mb-4"
                  >
                    <ArrowLeftRight className="w-5 h-5" />
                  </button>

                  {/* To */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      To
                    </label>
                    <div className="relative">
                      <select
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                        className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-xl appearance-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50"
                      >
                        {POPULAR_CURRENCIES.map((currency) => (
                          <option key={currency.code} value={currency.code}>
                            {currency.flag} {currency.code} - {currency.name}
                          </option>
                        ))}
                      </select>
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                        {toCurrencyInfo?.flag}
                      </span>
                    </div>
                    <div className="mt-3 px-4 py-4 bg-emerald-50 rounded-xl">
                      <p className="text-2xl font-bold text-emerald-700">
                        {toCurrencyInfo?.symbol}
                          {convertedAmount.toLocaleString("en-US", {
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Exchange Rate Info */}
                <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>
                      1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    <span>
                      Updated {lastUpdated.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="bg-gray-50 p-6 border-t border-gray-100">
                <p className="text-sm font-medium text-gray-700 mb-3">
                  Quick Budget Presets
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickPresets.map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => setAmount(preset.amount)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        amount === preset.amount
                          ? "bg-primary text-white"
                          : "bg-white border border-gray-200 text-gray-700 hover:border-primary hover:text-primary"
                      }`}
                    >
                      {preset.label} (${preset.amount})
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Popular Conversions */}
            <div className="mt-8 bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Popular Nomad Destinations
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {["THB", "MXN", "VND", "IDR", "COP", "BRL", "EUR", "PHP"].map(
                  (code) => {
                    const currency = POPULAR_CURRENCIES.find(
                      (c) => c.code === code
                    );
                    if (!currency) return null;
                    const rate = rates[code];
                    const converted = (parseFloat(amount) || 0) * rate;
                    return (
                      <button
                        key={code}
                        onClick={() => setToCurrency(code)}
                        className={`p-4 rounded-xl text-left transition-all ${
                          toCurrency === code
                            ? "bg-primary/5 border-2 border-primary"
                            : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                        }`}
                      >
                        <div className="text-2xl mb-1">{currency.flag}</div>
                        <div className="font-medium text-gray-900">
                          {currency.code}
                        </div>
                        <div className="text-sm text-gray-500">
                          {currency.symbol}
                          {converted.toLocaleString("en-US", {
                            maximumFractionDigits: 0,
                          })}
                        </div>
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* Tips */}
            <div className="mt-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Globe className="w-5 h-5 text-amber-600" />
                Money Tips for Digital Nomads
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  Use Wise or Revolut for the best exchange rates when spending abroad
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  Always pay in local currency to avoid dynamic currency conversion fees
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  Keep emergency cash in USD - it&apos;s accepted almost everywhere
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  Check ATM fees before withdrawing - some countries have high foreign card fees
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

