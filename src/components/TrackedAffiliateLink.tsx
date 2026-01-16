"use client";

import { PropsWithChildren } from "react";
import { trackAffiliateClick, trackBookingClick } from "@/lib/analytics";

type AffiliateName = "booking" | "safetywing" | "nordvpn" | "wise" | string;

export default function TrackedAffiliateLink({
  href,
  affiliateName,
  placement,
  cityName,
  className,
  target = "_blank",
  rel = "noopener noreferrer sponsored",
  children,
}: PropsWithChildren<{
  href: string;
  affiliateName: AffiliateName;
  placement: string;
  cityName?: string;
  className?: string;
  target?: string;
  rel?: string;
}>) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={className}
      onClick={() => {
        if (affiliateName === "booking" && cityName) trackBookingClick(cityName);
        trackAffiliateClick(`${affiliateName}:${placement}`, cityName);
      }}
    >
      {children}
    </a>
  );
}


