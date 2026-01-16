export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          avatar_url: string | null;
          preferred_currency: string;
          preferred_lifestyle: string;
          passport_country: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name?: string | null;
          avatar_url?: string | null;
          preferred_currency?: string;
          preferred_lifestyle?: string;
          passport_country?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          avatar_url?: string | null;
          preferred_currency?: string;
          preferred_lifestyle?: string;
          passport_country?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      favorites: {
        Row: {
          id: string;
          user_id: string;
          city_slug: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          city_slug: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          city_slug?: string;
          created_at?: string;
        };
      };
      trips: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          start_date: string | null;
          end_date: string | null;
          total_budget: number | null;
          status: 'draft' | 'planned' | 'active' | 'completed';
          is_public: boolean;
          share_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          description?: string | null;
          start_date?: string | null;
          end_date?: string | null;
          total_budget?: number | null;
          status?: 'draft' | 'planned' | 'active' | 'completed';
          is_public?: boolean;
          share_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          description?: string | null;
          start_date?: string | null;
          end_date?: string | null;
          total_budget?: number | null;
          status?: 'draft' | 'planned' | 'active' | 'completed';
          is_public?: boolean;
          share_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      trip_cities: {
        Row: {
          id: string;
          trip_id: string;
          city_slug: string;
          order_index: number;
          start_date: string | null;
          end_date: string | null;
          nights: number | null;
          estimated_cost: number | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          trip_id: string;
          city_slug: string;
          order_index: number;
          start_date?: string | null;
          end_date?: string | null;
          nights?: number | null;
          estimated_cost?: number | null;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          trip_id?: string;
          city_slug?: string;
          order_index?: number;
          start_date?: string | null;
          end_date?: string | null;
          nights?: number | null;
          estimated_cost?: number | null;
          notes?: string | null;
          created_at?: string;
        };
      };
      checklists: {
        Row: {
          id: string;
          user_id: string;
          trip_id: string | null;
          city_slug: string | null;
          type: 'visa' | 'packing' | 'general' | 'custom';
          name: string;
          items: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          trip_id?: string | null;
          city_slug?: string | null;
          type: 'visa' | 'packing' | 'general' | 'custom';
          name: string;
          items?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          trip_id?: string | null;
          city_slug?: string | null;
          type?: 'visa' | 'packing' | 'general' | 'custom';
          name?: string;
          items?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      visited_cities: {
        Row: {
          id: string;
          user_id: string;
          city_slug: string;
          visited_at: string | null;
          rating: number | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          city_slug: string;
          visited_at?: string | null;
          rating?: number | null;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          city_slug?: string;
          visited_at?: string | null;
          rating?: number | null;
          notes?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      trip_status: 'draft' | 'planned' | 'active' | 'completed';
      checklist_type: 'visa' | 'packing' | 'general' | 'custom';
    };
  };
}

// Helper types
export type User = Database['public']['Tables']['users']['Row'];
export type Favorite = Database['public']['Tables']['favorites']['Row'];
export type Trip = Database['public']['Tables']['trips']['Row'];
export type TripCity = Database['public']['Tables']['trip_cities']['Row'];
export type Checklist = Database['public']['Tables']['checklists']['Row'];
export type VisitedCity = Database['public']['Tables']['visited_cities']['Row'];

// Checklist item type
export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
  category?: string;
}

