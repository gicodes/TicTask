import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  if (allCookies.length === 0) {
    return NextResponse.json(
      { error: "No refresh cookie present" },
      { status: 401 }
    );
  }

  const cookieHeader = allCookies
    .map(c => `${c.name}=${c.value}`)
    .join("; ");


  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        Cookie: cookieHeader,
      },
    }
  );

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
