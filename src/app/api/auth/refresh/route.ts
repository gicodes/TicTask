import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const backendUrl = `${process.env.API_URL}/auth/refresh`;

  const forwardedHeaders = new Headers();
  const cookieHeader = req.headers.get("cookie");
  if (cookieHeader) forwardedHeaders.set("cookie", cookieHeader);

  const resp = await fetch(backendUrl, {
    method: "POST",
    headers: forwardedHeaders,
  });

  const text = await resp.text();
  return new NextResponse(text, {
    status: resp.status,
    headers: {
      ...(resp.headers.get("set-cookie") ? { "set-cookie": resp.headers.get("set-cookie")! } : {}),
      "content-type": resp.headers.get("content-type") || "text/plain",
    },
  });
}
