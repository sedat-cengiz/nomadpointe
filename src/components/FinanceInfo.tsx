"use client";

import {
  Wallet,
  CreditCard,
  Building,
  Bitcoin,
  ArrowLeftRight,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Banknote,
} from "lucide-react";
import { City } from "@/types/city";

interface FinanceInfoProps {
  city: City;
}

export default function FinanceInfo({ city }: FinanceInfoProps) {
  const finance = city.financeInfo;

  if (!finance) {
    return null;
  }

  const cardAcceptanceConfig = {
    Excellent: {
      bg: "bg-green-100",
      text: "text-green-700",
      description: "Cards accepted almost everywhere",
    },
    Good: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      description: "Cards accepted at most places",
    },
    "Cash Preferred": {
      bg: "bg-amber-100",
      text: "text-amber-700",
      description: "Carry cash for smaller vendors",
    },
  };

  const cryptoConfig = {
    Yes: {
      bg: "bg-green-100",
      text: "text-green-700",
      icon: CheckCircle,
    },
    Regulated: {
      bg: "bg-amber-100",
      text: "text-amber-700",
      icon: AlertTriangle,
    },
    No: {
      bg: "bg-red-100",
      text: "text-red-700",
      icon: XCircle,
    },
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Wallet className="w-5 h-5 text-green-600" />
          Money & Banking
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Currency, payments, and banking in {city.name}
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Currency Info */}
        <div className="bg-green-50 rounded-xl p-4 border border-green-100">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 rounded-xl p-3">
              <Banknote className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-green-700">Local Currency</p>
              <p className="text-2xl font-bold text-green-900">
                {finance.currencySymbol} {finance.currency}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Card Acceptance */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <CreditCard className="w-4 h-4" />
              <span className="text-sm">Card Acceptance</span>
            </div>
            <span
              className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${cardAcceptanceConfig[finance.cardAcceptance].bg} ${cardAcceptanceConfig[finance.cardAcceptance].text}`}
            >
              {finance.cardAcceptance}
            </span>
            <p className="text-xs text-gray-500 mt-2">
              {cardAcceptanceConfig[finance.cardAcceptance].description}
            </p>
          </div>

          {/* ATM Fees */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm">ATM Fees</span>
            </div>
            <p className="text-lg font-bold text-gray-900">{finance.atmFees}</p>
            <p className="text-xs text-gray-500 mt-1">Per withdrawal</p>
          </div>
        </div>

        {/* Digital Banking Services */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <ArrowLeftRight className="w-4 h-4" />
            Digital Banking Services
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {/* Wise */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${finance.wiseAvailable ? "bg-green-100" : "bg-gray-100"}`}
              >
                {finance.wiseAvailable ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-gray-400" />
                )}
              </div>
              <div>
                <p className="font-semibold text-gray-900">Wise</p>
                <p className="text-xs text-gray-500">
                  {finance.wiseAvailable ? "Available" : "Limited"}
                </p>
              </div>
            </div>

            {/* Revolut */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${finance.revolutAvailable ? "bg-green-100" : "bg-gray-100"}`}
              >
                {finance.revolutAvailable ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-gray-400" />
                )}
              </div>
              <div>
                <p className="font-semibold text-gray-900">Revolut</p>
                <p className="text-xs text-gray-500">
                  {finance.revolutAvailable ? "Available" : "Limited"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bank Account */}
        <div
          className={`rounded-xl p-4 border ${finance.bankAccountPossible ? "bg-blue-50 border-blue-100" : "bg-gray-50 border-gray-200"}`}
        >
          <div className="flex items-start gap-3">
            <Building
              className={`w-5 h-5 mt-0.5 ${finance.bankAccountPossible ? "text-blue-600" : "text-gray-400"}`}
            />
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-gray-900">
                  Local Bank Account
                </h4>
                {finance.bankAccountPossible ? (
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                    Possible
                  </span>
                ) : (
                  <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-medium">
                    Difficult
                  </span>
                )}
              </div>
              {finance.bankAccountRequirements && (
                <p className="text-sm text-gray-600 mt-2">
                  {finance.bankAccountRequirements}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Crypto */}
        <div
          className={`rounded-xl p-4 border ${cryptoConfig[finance.cryptoFriendly].bg} border-${cryptoConfig[finance.cryptoFriendly].text.replace("text-", "")}/20`}
        >
          <div className="flex items-start gap-3">
            <Bitcoin
              className={`w-5 h-5 mt-0.5 ${cryptoConfig[finance.cryptoFriendly].text}`}
            />
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-gray-900">
                  Cryptocurrency Status
                </h4>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${cryptoConfig[finance.cryptoFriendly].bg} ${cryptoConfig[finance.cryptoFriendly].text}`}
                >
                  {finance.cryptoFriendly}
                </span>
              </div>
              {finance.cryptoNotes && (
                <p className="text-sm text-gray-600 mt-2">
                  {finance.cryptoNotes}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Tipping Culture */}
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
          <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
            💰 Tipping Culture
          </h4>
          <p className="text-sm text-purple-700">{finance.tippingCulture}</p>
        </div>

        {/* Pro Tips */}
        <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
          <h4 className="font-semibold text-amber-900 mb-2">💡 Money Tips</h4>
          <ul className="space-y-2 text-sm text-amber-800">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              Use Wise or Revolut to avoid foreign transaction fees
            </li>
            {finance.cardAcceptance === "Cash Preferred" && (
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Carry cash for street food, taxis, and small shops
              </li>
            )}
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              Withdraw larger amounts to minimize ATM fee impact
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

