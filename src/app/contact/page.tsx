import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact NomadPoint with questions, suggestions, or complaints. We'll get back to you as soon as possible.",
};

export default function ContactPage() {
  const publicEmail = process.env.CONTACT_PUBLIC_EMAIL || "support@nomadpoint.com";

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <ContactForm publicEmail={publicEmail} />
        </div>
      </main>
      <Footer />
    </>
  );
}


