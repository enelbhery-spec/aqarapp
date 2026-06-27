import { supabase } from "@/lib/supabase";

export async function getAllAreas() {
  const { data, error } = await supabase
    .from("areas")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching areas:", error);
    return [];
  }

  return data;
}