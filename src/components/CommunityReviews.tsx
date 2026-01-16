"use client";

import { Star, MessageCircle, Users, Briefcase, Heart, AlertCircle, Sparkles } from "lucide-react";
import { City, CityReview } from "@/types/city";
import Image from "next/image";

interface CommunityReviewsProps {
  city: City;
}

// Badge colors and icons for review types
const reviewTypeConfig = {
  fan: {
    label: "Nomad Fan",
    icon: Heart,
    bgColor: "bg-rose-50",
    textColor: "text-rose-600",
    borderColor: "border-rose-200",
    source: "via NomadList",
  },
  realist: {
    label: "The Realist",
    icon: AlertCircle,
    bgColor: "bg-amber-50",
    textColor: "text-amber-600",
    borderColor: "border-amber-200",
    source: "via r/digitalnomad",
  },
  worker: {
    label: "Remote Worker",
    icon: Briefcase,
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    borderColor: "border-blue-200",
    source: "via Nomad Forums",
  },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: CityReview }) {
  const config = reviewTypeConfig[review.type];
  const TypeIcon = config.icon;

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg hover:border-gray-200 transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-gray-100">
            <Image
              src={review.avatar}
              alt={review.user}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{review.user}</h4>
            <p className="text-xs text-gray-500">
              {review.date} · <span className="text-gray-400">{config.source}</span>
            </p>
          </div>
        </div>
        <StarRating rating={review.rating} />
      </div>

      {/* Type Badge */}
      <div className="mb-3">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor} border ${config.borderColor}`}
        >
          <TypeIcon className="w-3 h-3" />
          {config.label}
        </span>
      </div>

      {/* Review Text */}
      <p className="text-gray-700 leading-relaxed">{review.text}</p>
    </div>
  );
}

export default function CommunityReviews({ city }: CommunityReviewsProps) {
  const reviews = city.reviews;

  if (!reviews || reviews.length === 0) {
    return null;
  }

  const handleJoinDiscussion = () => {
    // Scroll to Disqus comments section if exists
    const disqusSection = document.getElementById("disqus_thread");
    if (disqusSection) {
      disqusSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-50 to-purple-50 px-6 py-4 border-b border-gray-100">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-violet-500" />
              Community Reviews
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              What digital nomads are saying about {city.name}
            </p>
          </div>
          <div className="flex items-center gap-1.5 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-violet-200/50">
            <Sparkles className="w-3.5 h-3.5 text-violet-500" />
            <span className="text-xs text-violet-700 font-medium">AI-Curated</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3 flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 bg-green-400 rounded-full"></span>
          Compiled from Reddit, NomadList & nomad forums by AI
        </p>
      </div>

      {/* Reviews Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Join Discussion CTA */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-gray-700 font-medium">
                Been to {city.name}? Add your real experience! 💬
              </p>
              <p className="text-sm text-gray-500">
                Help fellow nomads with your first-hand insights
              </p>
            </div>
            <button
              onClick={handleJoinDiscussion}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Add Your Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

