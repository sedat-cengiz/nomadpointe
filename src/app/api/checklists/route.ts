import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

// GET /api/checklists - Get user's checklists
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const tripId = searchParams.get("tripId");
    const citySlug = searchParams.get("citySlug");
    const type = searchParams.get("type");

    let query = supabase
      .from("checklists")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false });

    if (tripId) query = query.eq("trip_id", tripId);
    if (citySlug) query = query.eq("city_slug", citySlug);
    if (type) query = query.eq("type", type);

    const { data: checklists, error } = await query;

    if (error) {
      console.error("Error fetching checklists:", error);
      return NextResponse.json(
        { error: "Failed to fetch checklists" },
        { status: 500 }
      );
    }

    return NextResponse.json({ checklists: checklists || [] });
  } catch (error) {
    console.error("Checklists API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/checklists - Create a new checklist
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
    const { name, type, tripId, citySlug, items } = body;

    if (!name || !type) {
      return NextResponse.json(
        { error: "Name and type are required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    
    const { data: checklist, error } = await supabase
      .from("checklists")
      .insert({
        user_id: session.user.id,
        name,
        type,
        trip_id: tripId || null,
        city_slug: citySlug || null,
        items: items || [],
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating checklist:", error);
      return NextResponse.json(
        { error: "Failed to create checklist" },
        { status: 500 }
      );
    }

    return NextResponse.json({ checklist });
  } catch (error) {
    console.error("Checklists API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

