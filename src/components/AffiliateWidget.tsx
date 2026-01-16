"use client";

import { Shield, Home, Lock, ExternalLink, ArrowLeftRight } from "lucide-react";
import { getAffiliateConfigs, isAffiliateConfigured } from "@/lib/affiliates";
import { trackAffiliateClick } from "@/lib/analytics";

interface AffiliateWidgetProps {
  cityName: string;
  countryName?: string;
  limit?: number;
  placement?: string;
}

// Map icon names to components
const iconMap = {
  Shield,
  Home,
  Lock,
  ArrowLeftRight,
  ExternalLink,
};

export default function AffiliateWidget({ 
  cityName, 
  countryName, 
  limit = 3,
  placement = "affiliate_widget"
}: AffiliateWidgetProps) {
  const affiliateConfigs = getAffiliateConfigs(limit);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900">Nomad Essentials</h3>

      {affiliateConfigs.map((affiliate) => {
        const IconComponent = iconMap[affiliate.icon as keyof typeof iconMap] || Shield;
        const url = affiliate.getUrl(cityName, countryName);
        const isConfigured = isAffiliateConfigured(affiliate.id);
        
        return (
          <div
            key={affiliate.id}
            className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 ${affiliate.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}
              >
                <IconComponent className={`w-6 h-6 ${affiliate.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900">
                  {affiliate.title}
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  {affiliate.description}
                </p>
                <a
                  href={url}
                  onClick={() => trackAffiliateClick(`${affiliate.id}:${placement}`, cityName)}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className={`inline-flex items-center gap-2 mt-3 px-4 py-2 ${affiliate.ctaColor} text-white text-sm font-medium rounded-lg transition-colors`}
                >
                  {affiliate.cta}
                  <ExternalLink className="w-4 h-4" />
                </a>
                {!isConfigured && (
                  <span className="block text-xs text-amber-600 mt-1">
                    (Affiliate ID not configured)
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Disclaimer */}
      <p className="text-xs text-gray-400 mt-4">
        * Some links may be affiliate links. We may earn a commission at no
        extra cost to you.
      </p>
    </div>
  );
}

/**
 * Insurance-focused CTA component for embedding in content
 */
export function InsuranceCTA({ 
  variant = "default" 
}: { 
  variant?: "default" | "compact" | "banner" 
}) {
  const affiliateConfigs = getAffiliateConfigs();
  const safetyWingConfig = affiliateConfigs.find(c => c.id === "safetywing");
  
  if (!safetyWingConfig) return null;
  
  const url = safetyWingConfig.getUrl();
  
  if (variant === "compact") {
    return (
      <a
        href={url}
        onClick={() => trackAffiliateClick(`${safetyWingConfig.id}:insurance_cta_compact`)}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
      >
        <Shield className="w-4 h-4" />
        Get Nomad Insurance
        <ExternalLink className="w-3 h-3" />
      </a>
    );
  }
  
  if (variant === "banner") {
    return (
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 rounded-xl p-3">
            <Shield className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg">Don&apos;t forget travel insurance!</h3>
            <p className="text-white/90 text-sm mt-1">
              SafetyWing offers affordable insurance designed specifically for digital nomads.
            </p>
          </div>
          <a
            href={url}
            onClick={() => trackAffiliateClick(`${safetyWingConfig.id}:insurance_cta_banner`)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors flex items-center gap-2"
          >
            Get Coverage
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }
  
  // Default variant
  return (
    <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
      <div className="flex items-start gap-4">
        <div className="bg-emerald-100 rounded-xl p-3">
          <Shield className="w-6 h-6 text-emerald-600" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">Nomad Health Insurance</h4>
          <p className="text-sm text-gray-600 mt-1">
            Stay protected wherever you work. SafetyWing is built for digital nomads.
          </p>
          <a
            href={url}
            onClick={() => trackAffiliateClick(`${safetyWingConfig.id}:insurance_cta_default`)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-2 mt-3 text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Learn more about SafetyWing
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
