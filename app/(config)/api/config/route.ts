import { getAppConfig } from "@/lib/config";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const config = getAppConfig();
    
    return NextResponse.json(config, {
      headers: {
        'Cache-Control': 's-maxage=600, stale-while-revalidate'
      }
    });
  } catch (error) {
    console.error('Error loading config:', error);
    return NextResponse.json({ error: 'Failed to load config' }, { status: 500 });
  }
}