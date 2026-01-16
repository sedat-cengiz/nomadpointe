import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { nanoid } from "nanoid";

// GET /api/trips - Get user's trips
export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const supabase = await createClient();
    const { data: trips, error } = await supabase
      .from("trips")
      .select(`
        *,
        trip_cities (
          id,
          city_slug,
          order_index,
          start_date,
          end_date,
          nights,
          estimated_cost,
          notes
        )
      `)
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching trips:", error);
      return NextResponse.json(
        { error: "Failed to fetch trips" },
        { status: 500 }
      );
    }

    return NextResponse.json({ trips: trips || [] });
  } catch (error) {
    console.error("Trips API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/trips - Create a new trip
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, description, cities, isPublic } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Trip name is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    
    // Calculate total budget from cities if provided
    let totalBudget = 0;
    let startDate = null;
    let endDate = null;
    
    if (cities && cities.length > 0) {
      totalBudget = cities.reduce((sum: number, city: { estimated_cost?: number }) => 
        sum + (city.estimated_cost || 0), 0);
      
      // Get date range
      const dates = cities
        .filter((c: { start_date?: string }) => c.start_date)
        .map((c: { start_date: string }) => new Date(c.start_date));
      const endDates = cities
        .filter((c: { end_date?: string }) => c.end_date)
        .map((c: { end_date: string }) => new Date(c.end_date));
      
      if (dates.length > 0) {
        startDate = new Date(Math.min(...dates.map((d: Date) => d.getTime()))).toISOString().split('T')[0];
      }
      if (endDates.length > 0) {
        endDate = new Date(Math.max(...endDates.map((d: Date) => d.getTime()))).toISOString().split('T')[0];
      }
    }

    // Create trip
    const { data: trip, error: tripError } = await supabase
      .from("trips")
      .insert({
        user_id: session.user.id,
        name,
        description: description || null,
        start_date: startDate,
        end_date: endDate,
        total_budget: totalBudget || null,
        status: "draft",
        is_public: isPublic || false,
        share_id: isPublic ? nanoid(10) : null,
      })
      .select()
      .single();

    if (tripError) {
      console.error("Error creating trip:", tripError);
      return NextResponse.json(
        { error: "Failed to create trip" },
        { status: 500 }
      );
    }

    // Add cities if provided
    if (cities && cities.length > 0) {
      const tripCities = cities.map((city: {
        city_slug: string;
        start_date?: string;
        end_date?: string;
        nights?: number;
        estimated_cost?: number;
        notes?: string;
      }, index: number) => ({
        trip_id: trip.id,
        city_slug: city.city_slug,
        order_index: index,
        start_date: city.start_date || null,
        end_date: city.end_date || null,
        nights: city.nights || null,
        estimated_cost: city.estimated_cost || null,
        notes: city.notes || null,
      }));

      const { error: citiesError } = await supabase
        .from("trip_cities")
        .insert(tripCities);

      if (citiesError) {
        console.error("Error adding trip cities:", citiesError);
        // Trip created but cities failed - could clean up but leaving for now
      }
    }

    return NextResponse.json({ trip });
  } catch (error) {
    console.error("Trips API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

