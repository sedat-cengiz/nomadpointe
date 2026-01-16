import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

// PUT /api/checklists/[id] - Update a checklist
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
    const { name, items } = body;

    const supabase = await createClient();

    // Verify ownership
    const { data: existing } = await supabase
      .from("checklists")
      .select("user_id")
      .eq("id", id)
      .single();

    if (!existing || existing.user_id !== session.user.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const updateData: Record<string, unknown> = {};
    if (name !== undefined) updateData.name = name;
    if (items !== undefined) updateData.items = items;

    const { data: checklist, error } = await supabase
      .from("checklists")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating checklist:", error);
      return NextResponse.json(
        { error: "Failed to update checklist" },
        { status: 500 }
      );
    }

    return NextResponse.json({ checklist });
  } catch (error) {
    console.error("Checklist API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/checklists/[id] - Delete a checklist
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
      .from("checklists")
      .select("user_id")
      .eq("id", id)
      .single();

    if (!existing || existing.user_id !== session.user.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { error } = await supabase
      .from("checklists")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting checklist:", error);
      return NextResponse.json(
        { error: "Failed to delete checklist" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Checklist API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

