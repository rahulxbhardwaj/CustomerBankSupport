import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();

  if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) {
    if (!token) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (err) {
      console.error("JWT Verification Error:", err);
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  } else if (pathname === "/api/fetchUserData" || pathname === "/api/transfer/sendmoney") {
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (err) {
      console.error("JWT Verification Error:", err);
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/fetchUserData",
    "/api/transfer/sendmoney",
  ],
};
