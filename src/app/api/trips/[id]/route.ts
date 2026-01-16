import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

// GET /api/trips/[id] - Get a specific trip
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();
    const supabase = await createClient();

    const { data: trip, error } = await supabase
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
      .eq("id", id)
      .single();

    if (error || !trip) {
      return NextResponse.json(
        { error: "Trip not found" },
        { status: 404 }
      );
    }

    // Check access - owner or public trip
    if (!trip.is_public && trip.user_id !== session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Sort cities by order_index
    if (trip.trip_cities) {
      trip.trip_cities.sort((a: { order_index: number }, b: { order_index: number }) => 
        a.order_index - b.order_index);
    }

    return NextResponse.json({ trip });
  } catch (error) {
    console.error("Trip API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/trips/[id] - Update a trip
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, description, status, isPublic, cities } = body;

    const supabase = await createClient();

    // Verify ownership
    const { data: existing } = await supabase
      .from("trips")
      .select("user_id")
      .eq("id", id)
      .single();

    if (!existing || existing.user_id !== session.user.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Update trip
    const updateData: Record<string, unknown> = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;
    if (isPublic !== undefined) updateData.is_public = isPublic;

    // Recalculate totals if cities provided
    if (cities && cities.length > 0) {
      updateData.total_budget = cities.reduce(
        (sum: number, city: { estimated_cost?: number }) => sum + (city.estimated_cost || 0), 
        0
      );
      
      const dates = cities
        .filter((c: { start_date?: string }) => c.start_date)
        .map((c: { start_date: string }) => new Date(c.start_date));
      const endDates = cities
        .filter((c: { end_date?: string }) => c.end_date)
        .map((c: { end_date: string }) => new Date(c.end_date));
      
      if (dates.length > 0) {
        updateData.start_date = new Date(Math.min(...dates.map((d: Date) => d.getTime())))
          .toISOString().split('T')[0];
      }
      if (endDates.length > 0) {
        updateData.end_date = new Date(Math.max(...endDates.map((d: Date) => d.getTime())))
          .toISOString().split('T')[0];
      }
    }

    const { data: trip, error: updateError } = await supabase
      .from("trips")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      console.error("Error updating trip:", updateError);
      return NextResponse.json(
        { error: "Failed to update trip" },
        { status: 500 }
      );
    }

    // Update cities if provided
    if (cities) {
      // Delete existing cities
      await supabase.from("trip_cities").delete().eq("trip_id", id);

      // Insert new cities
      if (cities.length > 0) {
        const tripCities = cities.map((city: {
          city_slug: string;
          start_date?: string;
          end_date?: string;
          nights?: number;
          estimated_cost?: number;
          notes?: string;
        }, index: number) => ({
          trip_id: id,
          city_slug: city.city_slug,
          order_index: index,
          start_date: city.start_date || null,
          end_date: city.end_date || null,
          nights: city.nights || null,
          estimated_cost: city.estimated_cost || null,
          notes: city.notes || null,
        }));

        await supabase.from("trip_cities").insert(tripCities);
      }
    }

    return NextResponse.json({ trip });
  } catch (error) {
    console.error("Trip API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/trips/[id] - Delete a trip
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const supabase = await createClient();

    // Verify ownership
    const { data: existing } = await supabase
      .from("trips")
      .select("user_id")
      .eq("id", id)
      .single();

    if (!existing || existing.user_id !== session.user.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Delete trip (cascade will delete trip_cities)
    const { error } = await supabase
      .from("trips")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting trip:", error);
      return NextResponse.json(
        { error: "Failed to delete trip" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Trip API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

