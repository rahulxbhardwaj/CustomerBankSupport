import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export function middleware(request: NextRequest) {
  console.log("Middleware called for:", request.nextUrl.pathname);
  
  // Get the token from cookies
  const token = request.cookies.get('authToken')?.value;
  
  console.log("Token from cookie:", token ? "Token exists" : "No token found");

  if (!token) {
    console.log("No token - redirecting to login");
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log("Token verified successfully for user:", decoded);
    
    // Token is valid, allow the request to proceed
    return NextResponse.next();
  } catch (error) {
    console.log("Invalid token - redirecting to login");
    // Token is invalid or expired
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: '/dashboard',
}