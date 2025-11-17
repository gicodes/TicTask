import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = cookies();
    const refresh = (await cookieStore).get("refreshToken")?.value;

    if (!refresh) {
      return NextResponse.json({ message: "Missing refresh token" }, { status: 401 });
    }

    const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "x-refresh-token": refresh,
      },
      credentials: "include",
    });

    if (!backendRes.ok) {
      return NextResponse.json({ message: "Refresh failed" }, { status: 401 });
    }

    const data = await backendRes.json();

    return NextResponse.json({
      accessToken: data.accessToken,
    });
  } catch (err) {
    console.error("Refresh route error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
