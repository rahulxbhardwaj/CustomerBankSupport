import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  console.log("Midleware called !!");
  console.log(request.headers.get('Authorization'));
}


export const config = {
  matcher: '/dashboard',
}