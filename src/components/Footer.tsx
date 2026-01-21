import Link from "next/link";
import { Globe, Heart } from "lucide-react";
import { getSafetyWingUrl, getBookingUrl, getNordVpnUrl } from "@/lib/affiliates";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Nomad<span className="text-primary">Pointe</span>
              </span>
            </Link>
            <p className="text-gray-400 max-w-md">
              Your trusted guide to finding the perfect remote work destination.
              Compare cities, check internet speeds, and plan your next
              adventure.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-primary transition-colors"
                >
                  All Cities
                </Link>
              </li>
              <li>
                <Link
                  href="/compare"
                  className="hover:text-primary transition-colors"
                >
                  Compare Cities
                </Link>
              </li>
              <li>
                <Link
                  href="/methodology"
                  className="hover:text-primary transition-colors"
                >
                  Methodology
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/cities/digital-nomad-guide-bali"
                  className="hover:text-primary transition-colors"
                >
                  Bali Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/cities/digital-nomad-guide-lisbon"
                  className="hover:text-primary transition-colors"
                >
                  Lisbon Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/nomadpointe-vs-numbeo"
                  className="hover:text-primary transition-colors"
                >
                  NomadPointe vs Numbeo
                </Link>
              </li>
              <li>
                <Link
                  href="/how-to-interpret-cost-of-living-data"
                  className="hover:text-primary transition-colors"
                >
                  How to interpret cost of living data
                </Link>
              </li>
              <li>
                <a
                  href={getSafetyWingUrl("nomadInsurance", { source: "footer" })}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="hover:text-primary transition-colors"
                >
                  Nomad Insurance
                </a>
              </li>
              <li>
                <a
                  href={getBookingUrl("Lisbon")}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="hover:text-primary transition-colors"
                >
                  Find Accommodation
                </a>
              </li>
              <li>
                <a
                  href={getNordVpnUrl()}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="hover:text-primary transition-colors"
                >
                  Get VPN
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <Link
              href="/contact"
              className="text-gray-400 hover:text-primary text-sm transition-colors"
            >
              Contact
            </Link>
              <Link
                href="/about"
                className="text-gray-400 hover:text-primary text-sm transition-colors"
              >
                About
              </Link>
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-primary text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/affiliate-disclosure"
              className="text-gray-400 hover:text-primary text-sm transition-colors"
            >
              Affiliate Disclosure
            </Link>
          </div>
          
          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {currentYear} NomadPointe. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                NomadPointe data may be referenced and cited with attribution.
              </p>
            </div>
            <p className="text-gray-400 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> for
              digital nomads worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
