import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

// GET /api/favorites - Get user's favorites
export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ favorites: [] });
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("favorites")
      .select("city_slug, created_at")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching favorites:", error);
      return NextResponse.json({ favorites: [] });
    }

    return NextResponse.json({ 
      favorites: data.map(f => f.city_slug) 
    });
  } catch (error) {
    console.error("Favorites API error:", error);
    return NextResponse.json({ favorites: [] });
  }
}

// POST /api/favorites - Add a favorite
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { citySlug } = await request.json();
    
    if (!citySlug) {
      return NextResponse.json(
        { error: "City slug is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { error } = await supabase
      .from("favorites")
      .insert({
        user_id: session.user.id,
        city_slug: citySlug,
      });

    if (error) {
      // Handle duplicate error gracefully
      if (error.code === "23505") {
        return NextResponse.json({ success: true, message: "Already favorited" });
      }
      console.error("Error adding favorite:", error);
      return NextResponse.json(
        { error: "Failed to add favorite" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Favorites API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/favorites - Remove a favorite
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { citySlug } = await request.json();
    
    if (!citySlug) {
      return NextResponse.json(
        { error: "City slug is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", session.user.id)
      .eq("city_slug", citySlug);

    if (error) {
      console.error("Error removing favorite:", error);
      return NextResponse.json(
        { error: "Failed to remove favorite" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Favorites API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

