import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for NomadPointe - Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "January 15, 2026";

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-500 mb-8">Last updated: {lastUpdated}</p>

            <div className="prose prose-gray max-w-none">
              <h2>1. Introduction</h2>
              <p>
                Welcome to NomadPointe ("we," "our," or "us"). We respect your privacy and are 
                committed to protecting your personal data. This privacy policy explains how we 
                collect, use, disclose, and safeguard your information when you visit our website 
                nomadpointe.com (the "Site").
              </p>

              <h2>2. Information We Collect</h2>
              <h3>2.1 Information You Provide</h3>
              <p>We may collect information that you voluntarily provide when you:</p>
              <ul>
                <li>Subscribe to our newsletter</li>
                <li>Contact us through our website</li>
                <li>Leave comments or feedback</li>
              </ul>
              <p>This information may include your name and email address.</p>

              <h3>2.2 Automatically Collected Information</h3>
              <p>When you visit our Site, we automatically collect certain information, including:</p>
              <ul>
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent</li>
                <li>Referring website</li>
                <li>Device information</li>
              </ul>

              <h2>3. How We Use Your Information</h2>
              <p>We use the collected information for the following purposes:</p>
              <ul>
                <li>To provide and maintain our website</li>
                <li>To improve user experience</li>
                <li>To send newsletters (if subscribed)</li>
                <li>To analyze website traffic and usage patterns</li>
                <li>To respond to your inquiries</li>
              </ul>

              <h2>4. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to track activity on our Site 
                and store certain information. Cookies are files with a small amount of data 
                that may include an anonymous unique identifier.
              </p>
              <h3>Types of Cookies We Use:</h3>
              <ul>
                <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our Site (Google Analytics)</li>
                <li><strong>Advertising Cookies:</strong> Used by our affiliate partners to track referrals</li>
              </ul>
              <p>
                You can instruct your browser to refuse all cookies or to indicate when a cookie 
                is being sent. However, some features of our Site may not function properly without cookies.
              </p>

              <h2>5. Third-Party Services</h2>
              <p>We may employ third-party companies and services including:</p>
              <ul>
                <li><strong>Google Analytics:</strong> For website analytics and traffic analysis</li>
                <li><strong>Affiliate Partners:</strong> SafetyWing, Booking.com, NordVPN, Wise - for referral tracking</li>
              </ul>
              <p>
                These third parties have access to your Personal Data only to perform specific tasks 
                on our behalf and are obligated not to disclose or use it for any other purpose. 
                Please review their respective privacy policies.
              </p>

              <h2>6. Affiliate Links Disclosure</h2>
              <p>
                Our website contains affiliate links to products and services. When you click on 
                these links and make a purchase, we may earn a commission at no additional cost to you. 
                These affiliate partners may use cookies to track referrals. For more information, 
                please see our <a href="/affiliate-disclosure" className="text-primary hover:underline">Affiliate Disclosure</a>.
              </p>

              <h2>7. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your 
                personal data against unauthorized access, alteration, disclosure, or destruction. 
                However, no method of transmission over the Internet or electronic storage is 
                100% secure.
              </p>

              <h2>8. Your Rights</h2>
              <p>Depending on your location, you may have the following rights:</p>
              <ul>
                <li>Right to access your personal data</li>
                <li>Right to rectification of inaccurate data</li>
                <li>Right to erasure ("right to be forgotten")</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
              </ul>
              <p>
                To exercise any of these rights, please contact us at privacy@nomadpointe.com.
              </p>

              <h2>9. Children's Privacy</h2>
              <p>
                Our Site is not intended for children under 13 years of age. We do not knowingly 
                collect personal information from children under 13. If we discover that a child 
                under 13 has provided us with personal information, we will delete such information 
                from our servers.
              </p>

              <h2>10. International Data Transfers</h2>
              <p>
                Your information may be transferred to and maintained on servers located outside 
                your country of residence. By using our Site, you consent to such transfers.
              </p>

              <h2>11. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any 
                changes by posting the new Privacy Policy on this page and updating the 
                "Last updated" date. You are advised to review this Privacy Policy periodically 
                for any changes.
              </p>

              <h2>12. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul>
                <li>Email: privacy@nomadpointe.com</li>
                <li>Website: nomadpointe.com</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
