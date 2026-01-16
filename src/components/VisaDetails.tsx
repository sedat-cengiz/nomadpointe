"use client";

import {
  FileCheck,
  Clock,
  DollarSign,
  Calendar,
  FileText,
  AlertTriangle,
  ExternalLink,
  CheckCircle,
  XCircle,
  RefreshCw,
} from "lucide-react";
import { City } from "@/types/city";

interface VisaDetailsProps {
  city: City;
}

export default function VisaDetails({ city }: VisaDetailsProps) {
  const visa = city.visa;

  if (!visa) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-amber-600" />
          Visa & Legal Information
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Entry requirements and visa options for {city.name}, {city.country}
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Visa Status Badge */}
        <div className="flex items-center gap-3">
          {visa.hasNomadVisa ? (
            <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">Digital Nomad Visa Available</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-full">
              <XCircle className="w-5 h-5" />
              <span className="font-semibold">No Digital Nomad Visa</span>
            </div>
          )}
        </div>

        {/* Visa Free Entry */}
        {visa.visaFreeDays && (
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-center gap-2 text-blue-700 mb-2">
              <Calendar className="w-5 h-5" />
              <span className="font-semibold">Visa-Free Entry</span>
            </div>
            <p className="text-blue-900 text-lg font-bold">
              {visa.visaFreeDays} days
            </p>
            <p className="text-sm text-blue-600 mt-1">
              Many nationalities can enter without a visa for tourism
            </p>
          </div>
        )}

        {/* Nomad Visa Details */}
        {visa.hasNomadVisa && visa.visaName && (
          <div className="space-y-4">
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
              <h4 className="font-semibold text-amber-900 mb-1">
                {visa.visaName}
              </h4>
              {visa.mainRequirement && (
                <p className="text-amber-700 text-sm">
                  Main requirement: {visa.mainRequirement}
                </p>
              )}
            </div>

            {/* Key Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Duration */}
              {visa.maxStayDays && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Maximum Stay</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900">
                    {visa.maxStayDays >= 365
                      ? `${Math.round(visa.maxStayDays / 365)} year${visa.maxStayDays >= 730 ? "s" : ""}`
                      : `${visa.maxStayDays} days`}
                  </p>
                </div>
              )}

              {/* Processing Time */}
              {visa.processingTime && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <RefreshCw className="w-4 h-4" />
                    <span className="text-sm">Processing Time</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900">
                    {visa.processingTime}
                  </p>
                </div>
              )}

              {/* Visa Fee */}
              {visa.visaFee !== undefined && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm">Application Fee</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900">
                    ${visa.visaFee}
                  </p>
                </div>
              )}

              {/* Extension Fee */}
              {visa.extensionFee !== undefined && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <RefreshCw className="w-4 h-4" />
                    <span className="text-sm">Extension Fee</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900">
                    ${visa.extensionFee}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Required Documents */}
        {visa.requiredDocuments && visa.requiredDocuments.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Required Documents
            </h4>
            <ul className="space-y-2">
              {visa.requiredDocuments.map((doc, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Extension Options */}
        {visa.extensionOptions && (
          <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
            <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Extension Options
            </h4>
            <p className="text-purple-700 text-sm">{visa.extensionOptions}</p>
          </div>
        )}

        {/* Tax Implications */}
        {visa.taxImplications && (
          <div className="bg-red-50 rounded-xl p-4 border border-red-100">
            <h4 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Tax Considerations
            </h4>
            <p className="text-red-700 text-sm">{visa.taxImplications}</p>
          </div>
        )}

        {/* Apply Link */}
        {visa.applicationUrl && (
          <a
            href={visa.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            Apply for Visa
            <ExternalLink className="w-4 h-4" />
          </a>
        )}

        {/* Disclaimer */}
        <p className="text-xs text-gray-400 mt-4">
          Visa requirements vary by nationality. Always verify with official
          government sources before traveling.
        </p>
      </div>
    </div>
  );
}

