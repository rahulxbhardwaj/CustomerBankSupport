import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Middleware disabled - using getServerSideProps for auth instead
  // This is because Replit's iframe blocks cookies
  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard',
}