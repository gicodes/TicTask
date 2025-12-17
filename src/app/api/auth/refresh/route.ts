import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = cookies();
  const allCookies = (await cookieStore).getAll();

  if (allCookies.length === 0) {
    return NextResponse.json(
      { error: "No refresh cookie" },
      { status: 401 }
    );
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Refresh failed" },
      { status: 401 }
    );
  }

  const data = await res.json();

  return NextResponse.json({
    accessToken: data.accessToken,
  });
}
