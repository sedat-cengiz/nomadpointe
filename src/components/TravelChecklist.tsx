"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  CheckSquare,
  Square,
  Plus,
  Trash2,
  FileCheck,
  Briefcase,
  Plane,
  ChevronDown,
  ChevronUp,
  Loader2,
  X,
} from "lucide-react";
import { ChecklistItem } from "@/lib/supabase/types";
import { getChecklistTemplate } from "@/lib/checklistTemplates";

interface TravelChecklistProps {
  citySlug?: string;
  tripId?: string;
  compact?: boolean;
}

type ChecklistType = "visa" | "packing" | "general" | "custom";

const CHECKLIST_TYPES = [
  { id: "visa" as const, name: "Visa Checklist", icon: FileCheck, color: "text-blue-500" },
  { id: "packing" as const, name: "Packing List", icon: Briefcase, color: "text-emerald-500" },
  { id: "general" as const, name: "Travel Prep", icon: Plane, color: "text-amber-500" },
];

export default function TravelChecklist({
  citySlug,
  tripId,
  compact = false,
}: TravelChecklistProps) {
  const { data: session } = useSession();
  const [activeType, setActiveType] = useState<ChecklistType>("visa");
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [isExpanded, setIsExpanded] = useState(!compact);
  const [newItemText, setNewItemText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Load items from localStorage (works for both guests and logged-in users as a cache)
  useEffect(() => {
    const key = `checklist_${activeType}_${citySlug || tripId || "default"}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      setItems(JSON.parse(stored));
    } else {
      // Load template
      const template = getChecklistTemplate(activeType as "visa" | "packing" | "general");
      setItems(template);
    }
  }, [activeType, citySlug, tripId]);

  // Save items to localStorage
  const saveItems = (newItems: ChecklistItem[]) => {
    const key = `checklist_${activeType}_${citySlug || tripId || "default"}`;
    localStorage.setItem(key, JSON.stringify(newItems));
    setItems(newItems);
  };

  const toggleItem = (id: string) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    saveItems(newItems);
  };

  const addItem = () => {
    if (!newItemText.trim()) return;
    const newItem: ChecklistItem = {
      id: `custom_${Date.now()}`,
      text: newItemText.trim(),
      checked: false,
      category: "Custom",
    };
    saveItems([...items, newItem]);
    setNewItemText("");
  };

  const removeItem = (id: string) => {
    const newItems = items.filter((item) => item.id !== id);
    saveItems(newItems);
  };

  const resetChecklist = () => {
    const template = getChecklistTemplate(activeType as "visa" | "packing" | "general");
    saveItems(template);
  };

  const completedCount = items.filter((item) => item.checked).length;
  const progress = items.length > 0 ? (completedCount / items.length) * 100 : 0;

  // Group items by category
  const groupedItems = items.reduce(
    (acc, item) => {
      const category = item.category || "Other";
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    },
    {} as Record<string, ChecklistItem[]>
  );

  const activeTypeInfo = CHECKLIST_TYPES.find((t) => t.id === activeType);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <CheckSquare className="w-5 h-5 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold text-gray-900">Travel Checklists</h3>
            <p className="text-sm text-gray-500">
              {completedCount}/{items.length} completed
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* Progress Bar (Mini) */}
          <div className="hidden sm:block w-24">
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="border-t border-gray-100">
          {/* Type Tabs */}
          <div className="flex border-b border-gray-100">
            {CHECKLIST_TYPES.map((type) => {
              const Icon = type.icon;
              const isActive = activeType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setActiveType(type.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-primary border-b-2 border-primary bg-primary/5"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? type.color : ""}`} />
                  <span className="hidden sm:inline">{type.name}</span>
                </button>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="px-6 pt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-500">Progress</span>
              <span className="font-medium text-gray-900">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Items */}
          <div className="p-6 max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(groupedItems).map(([category, categoryItems]) => (
                  <div key={category}>
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                      {category}
                    </h4>
                    <div className="space-y-2">
                      {categoryItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 group"
                        >
                          <button
                            onClick={() => toggleItem(item.id)}
                            className="flex-shrink-0"
                          >
                            {item.checked ? (
                              <CheckSquare className="w-5 h-5 text-primary" />
                            ) : (
                              <Square className="w-5 h-5 text-gray-300 hover:text-primary transition-colors" />
                            )}
                          </button>
                          <span
                            className={`flex-1 text-sm ${
                              item.checked
                                ? "text-gray-400 line-through"
                                : "text-gray-700"
                            }`}
                          >
                            {item.text}
                          </span>
                          {item.id.startsWith("custom_") && (
                            <button
                              onClick={() => removeItem(item.id)}
                              className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add Custom Item */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newItemText}
                  onChange={(e) => setNewItemText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addItem()}
                  placeholder="Add custom item..."
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <button
                  onClick={addItem}
                  disabled={!newItemText.trim()}
                  className="p-2 bg-primary hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 pb-4 flex items-center justify-between">
            <button
              onClick={resetChecklist}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Reset to default
            </button>
            {!session && (
              <p className="text-xs text-gray-400">
                Sign in to save across devices
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

