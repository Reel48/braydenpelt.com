import { NextResponse } from "next/server";
import { getSpotifyNowPlaying } from "@/lib/integrations/spotify";

// Always fresh — this reflects what's playing right now.
export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getSpotifyNowPlaying();
  return NextResponse.json(data, {
    headers: { "Cache-Control": "no-store" },
  });
}
