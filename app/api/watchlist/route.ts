import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/better-auth/auth";
import { connectToDatabase } from "@/database/mongoose";
import { Watchlist } from "@/database/models/watchlist.model";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { symbol, company } = await req.json().catch(() => ({}));
    const cleanSymbol = typeof symbol === "string" ? symbol.trim().toUpperCase() : "";
    const cleanCompany = typeof company === "string" ? company.trim() : cleanSymbol;

    if (!cleanSymbol) {
      return NextResponse.json({ error: "Symbol is required" }, { status: 400 });
    }

    await connectToDatabase();

    try {
      await Watchlist.create({
        userId: session.user.id,
        symbol: cleanSymbol,
        company: cleanCompany || cleanSymbol,
      });
      return NextResponse.json({ added: true });
    } catch (e: any) {
      // If duplicate key error, treat as idempotent success
      if (e?.code === 11000) {
        return NextResponse.json({ added: true, duplicate: true });
      }
      console.error("Watchlist POST error", e);
      return NextResponse.json({ error: "Failed to add to watchlist" }, { status: 500 });
    }
  } catch (e) {
    console.error("Watchlist POST outer error", e);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { symbol } = await req.json().catch(() => ({}));
    const cleanSymbol = typeof symbol === "string" ? symbol.trim().toUpperCase() : "";
    if (!cleanSymbol) {
      return NextResponse.json({ error: "Symbol is required" }, { status: 400 });
    }

    await connectToDatabase();

    await Watchlist.findOneAndDelete({ userId: session.user.id, symbol: cleanSymbol });
    return NextResponse.json({ removed: true });
  } catch (e) {
    console.error("Watchlist DELETE error", e);
    return NextResponse.json({ error: "Failed to remove from watchlist" }, { status: 500 });
  }
}
