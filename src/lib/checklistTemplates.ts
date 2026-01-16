import { ChecklistItem } from "./supabase/types";

export interface ChecklistTemplate {
  type: "visa" | "packing" | "general";
  name: string;
  items: ChecklistItem[];
}

export const visaChecklistTemplate: ChecklistItem[] = [
  { id: "v1", text: "Valid passport (6+ months validity)", checked: false, category: "Documents" },
  { id: "v2", text: "Passport-sized photos", checked: false, category: "Documents" },
  { id: "v3", text: "Proof of income / bank statements", checked: false, category: "Financial" },
  { id: "v4", text: "Travel insurance document", checked: false, category: "Insurance" },
  { id: "v5", text: "Return flight ticket / itinerary", checked: false, category: "Travel" },
  { id: "v6", text: "Hotel booking confirmation", checked: false, category: "Accommodation" },
  { id: "v7", text: "Employment verification letter", checked: false, category: "Work" },
  { id: "v8", text: "Visa application form completed", checked: false, category: "Application" },
  { id: "v9", text: "Visa fee payment", checked: false, category: "Financial" },
  { id: "v10", text: "Schedule visa appointment", checked: false, category: "Application" },
];

export const packingChecklistTemplate: ChecklistItem[] = [
  // Tech
  { id: "p1", text: "Laptop + charger", checked: false, category: "Tech" },
  { id: "p2", text: "Phone + charger", checked: false, category: "Tech" },
  { id: "p3", text: "Power adapter (country-specific)", checked: false, category: "Tech" },
  { id: "p4", text: "Portable battery pack", checked: false, category: "Tech" },
  { id: "p5", text: "Headphones / earbuds", checked: false, category: "Tech" },
  { id: "p6", text: "USB cables", checked: false, category: "Tech" },
  // Documents
  { id: "p7", text: "Passport", checked: false, category: "Documents" },
  { id: "p8", text: "Visa documents", checked: false, category: "Documents" },
  { id: "p9", text: "Travel insurance card", checked: false, category: "Documents" },
  { id: "p10", text: "Credit/debit cards", checked: false, category: "Documents" },
  { id: "p11", text: "Emergency cash (USD)", checked: false, category: "Documents" },
  // Health
  { id: "p12", text: "Prescription medications", checked: false, category: "Health" },
  { id: "p13", text: "First aid kit basics", checked: false, category: "Health" },
  { id: "p14", text: "Sunscreen", checked: false, category: "Health" },
  { id: "p15", text: "Insect repellent", checked: false, category: "Health" },
  // Clothing
  { id: "p16", text: "Comfortable walking shoes", checked: false, category: "Clothing" },
  { id: "p17", text: "Weather-appropriate clothing", checked: false, category: "Clothing" },
  { id: "p18", text: "Light rain jacket", checked: false, category: "Clothing" },
  // Work
  { id: "p19", text: "Laptop stand", checked: false, category: "Work" },
  { id: "p20", text: "Portable mouse", checked: false, category: "Work" },
];

export const generalTravelChecklistTemplate: ChecklistItem[] = [
  { id: "g1", text: "Book accommodation", checked: false, category: "Planning" },
  { id: "g2", text: "Book flights", checked: false, category: "Planning" },
  { id: "g3", text: "Research coworking spaces", checked: false, category: "Work" },
  { id: "g4", text: "Get travel insurance", checked: false, category: "Insurance" },
  { id: "g5", text: "Notify bank of travel", checked: false, category: "Financial" },
  { id: "g6", text: "Set up VPN", checked: false, category: "Tech" },
  { id: "g7", text: "Download offline maps", checked: false, category: "Tech" },
  { id: "g8", text: "Research local SIM options", checked: false, category: "Tech" },
  { id: "g9", text: "Learn basic local phrases", checked: false, category: "Preparation" },
  { id: "g10", text: "Check vaccination requirements", checked: false, category: "Health" },
];

export const getChecklistTemplate = (type: "visa" | "packing" | "general"): ChecklistItem[] => {
  switch (type) {
    case "visa":
      return [...visaChecklistTemplate];
    case "packing":
      return [...packingChecklistTemplate];
    case "general":
      return [...generalTravelChecklistTemplate];
    default:
      return [];
  }
};

