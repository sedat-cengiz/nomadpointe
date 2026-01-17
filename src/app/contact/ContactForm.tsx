"use client";

import { useMemo, useState } from "react";

type ContactCategory = "question" | "suggestion" | "complaint";

type ContactFormProps = {
  publicEmail?: string | null;
};

export default function ContactForm({ publicEmail }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState<ContactCategory>("question");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // Honeypot (should stay empty)
  const [website, setWebsite] = useState("");

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return (
      status !== "submitting" &&
      email.trim().length > 0 &&
      subject.trim().length > 0 &&
      message.trim().length > 0
    );
  }, [email, subject, message, status]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          category,
          subject,
          message,
          website, // honeypot
        }),
      });

      const data = (await res.json().catch(() => null)) as
        | { success?: boolean; error?: string }
        | null;

      if (!res.ok || !data?.success) {
        setStatus("error");
        setErrorMessage(data?.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setCategory("question");
      setSubject("");
      setMessage("");
      setWebsite("");
    } catch (err) {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Contact</h1>
        <p className="text-gray-600 mt-2">
          Have a question, suggestion, or complaint? Send us a message and we’ll get
          back to you.
        </p>
        {publicEmail ? (
          <p className="text-gray-500 mt-3 text-sm">
            Prefer email? Reach us at{" "}
            <span className="font-medium text-gray-700">{publicEmail}</span>
          </p>
        ) : null}
      </div>

      {status === "success" ? (
        <div className="rounded-xl border border-green-200 bg-green-50 p-5">
          <p className="font-semibold text-green-900">Message sent</p>
          <p className="text-green-800 mt-1">
            Thanks — we received your message and will respond soon.
          </p>
          <button
            type="button"
            className="mt-4 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-white border border-green-200 text-green-900 hover:bg-green-100 transition-colors"
            onClick={() => setStatus("idle")}
          >
            Send another message
          </button>
        </div>
      ) : null}

      {status !== "success" ? (
        <form onSubmit={onSubmit} className="space-y-5">
          {/* Honeypot */}
          <div className="hidden" aria-hidden="true">
            <label className="block text-sm font-medium text-gray-700">
              Website
            </label>
            <input
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              autoComplete="off"
              tabIndex={-1}
              className="mt-1 block w-full rounded-xl border border-gray-200 px-4 py-3"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name <span className="text-gray-400">(optional)</span>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                className="mt-1 block w-full rounded-xl border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                autoComplete="email"
                className="mt-1 block w-full rounded-xl border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ContactCategory)}
                className="mt-1 block w-full rounded-xl border border-gray-200 px-4 py-3 bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              >
                <option value="question">Question</option>
                <option value="suggestion">Suggestion</option>
                <option value="complaint">Complaint</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Subject <span className="text-red-600">*</span>
              </label>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="mt-1 block w-full rounded-xl border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                placeholder="What is this about?"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message <span className="text-red-600">*</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={7}
              className="mt-1 block w-full rounded-xl border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              placeholder="Write your message..."
            />
          </div>

          {status === "error" ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
              <p className="text-red-900 font-semibold">Couldn’t send message</p>
              <p className="text-red-800 mt-1 text-sm">
                {errorMessage || "Please try again."}
              </p>
            </div>
          ) : null}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={!canSubmit}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary hover:bg-blue-700 text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? "Sending..." : "Send message"}
            </button>
            <p className="text-xs text-gray-500">
              We’ll only use your email to respond.
            </p>
          </div>
        </form>
      ) : null}
    </div>
  );
}


