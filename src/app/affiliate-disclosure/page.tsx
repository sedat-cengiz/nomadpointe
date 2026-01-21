import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Home, Lock, ArrowLeftRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: "Affiliate Disclosure for NomadPointe - Transparency about our affiliate relationships and how we earn revenue.",
};

export default function AffiliateDisclosurePage() {
  const lastUpdated = "January 15, 2026";

  const affiliatePartners = [
    {
      name: "SafetyWing",
      icon: Shield,
      description: "Travel and health insurance for digital nomads",
      commission: "We earn a commission when you purchase insurance through our links",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      name: "Booking.com",
      icon: Home,
      description: "Hotel and accommodation bookings worldwide",
      commission: "We earn a percentage of completed bookings made through our links",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      name: "NordVPN",
      icon: Lock,
      description: "VPN service for secure internet connection",
      commission: "We earn a commission for each subscription purchased through our links",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      name: "Wise",
      icon: ArrowLeftRight,
      description: "International money transfers with low fees",
      commission: "We earn a referral bonus when you sign up and make a transfer",
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
    },
  ];

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Affiliate Disclosure
            </h1>
            <p className="text-gray-500 mb-8">Last updated: {lastUpdated}</p>

            {/* Summary Box */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
              <h2 className="text-lg font-semibold text-amber-800 mb-2">
                📋 Quick Summary
              </h2>
              <p className="text-amber-700">
                NomadPointe earns money through affiliate partnerships. When you click certain 
                links on our site and make a purchase, we may earn a commission at no extra 
                cost to you. This helps us keep the site running and provide free content.
              </p>
            </div>

            <div className="prose prose-gray max-w-none">
              <h2>Our Commitment to Transparency</h2>
              <p>
                At NomadPointe, we believe in complete transparency with our readers. This page 
                discloses our affiliate relationships and explains how we earn revenue while 
                providing you with valuable content about digital nomad destinations.
              </p>

              <h2>What Are Affiliate Links?</h2>
              <p>
                Affiliate links are special URLs that track when visitors click through from 
                our site to a partner's website. If you make a purchase or sign up for a 
                service through these links, we may earn a small commission. This commission 
                comes from the company—<strong>you never pay extra</strong>.
              </p>

              <h2>Our Affiliate Partners</h2>
              <p>
                We partner with companies that we believe provide genuine value to digital 
                nomads. Here are our current affiliate relationships:
              </p>
            </div>

            {/* Affiliate Partners Cards */}
            <div className="grid gap-4 my-8">
              {affiliatePartners.map((partner) => {
                const IconComponent = partner.icon;
                return (
                  <div
                    key={partner.name}
                    className={`${partner.bgColor} rounded-xl p-6 border border-gray-100`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`${partner.color} p-2 bg-white rounded-lg shadow-sm`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{partner.name}</h3>
                        <p className="text-gray-600 text-sm mt-1">{partner.description}</p>
                        <p className="text-gray-500 text-sm mt-2 italic">
                          {partner.commission}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="prose prose-gray max-w-none">
              <h2>How We Choose Partners</h2>
              <p>
                We only recommend products and services that we believe will benefit digital 
                nomads. Our selection criteria include:
              </p>
              <ul>
                <li><strong>Relevance:</strong> The product must be useful for remote workers and travelers</li>
                <li><strong>Quality:</strong> We research and verify the service quality</li>
                <li><strong>Value:</strong> The offering must provide good value for money</li>
                <li><strong>Reputation:</strong> We partner with established, trustworthy companies</li>
              </ul>

              <h2>Editorial Independence</h2>
              <p>
                Our affiliate relationships do not influence our editorial content. We provide 
                honest information about destinations, costs, and services regardless of 
                whether we earn commissions. If we recommend something, it's because we 
                genuinely believe it will help you as a digital nomad.
              </p>

              <h2>FTC Compliance</h2>
              <p>
                This disclosure is provided in accordance with the Federal Trade Commission's 
                16 CFR, Part 255: "Guides Concerning the Use of Endorsements and Testimonials 
                in Advertising." We are committed to transparent and ethical business practices.
              </p>

              <h2>Your Choice</h2>
              <p>
                You are never obligated to use our affiliate links. If you prefer not to, you 
                can simply search for the service directly in your browser. However, using our 
                links is a free way to support our work and help us continue providing valuable 
                content for the digital nomad community.
              </p>

              <h2>Questions?</h2>
              <p>
                If you have any questions about our affiliate relationships or this disclosure, 
                please don't hesitate to contact us at:
              </p>
              <ul>
                <li>Email: affiliates@nomadpointe.com</li>
              </ul>

              <p className="mt-8 text-gray-500 text-sm">
                Thank you for supporting NomadPointe! Your trust means everything to us. 🙏
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
