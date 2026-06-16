import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  // Log the incoming request URL and headers
  const { pathname, searchParams } = request.nextUrl;
  console.log(`[TRIGGER]: ${request.method} ${pathname}${searchParams}`);

  // Log specific service headers if needed
  const serviceId = request.headers.get('x-service-id');
  if (serviceId) {
    console.log(`[SOURCE]: Triggered by service: ${serviceId}`);
  }

  // Continue to the intended destination
  return NextResponse.next();
}

// Specify which paths this proxy should monitor
export const config = {
  matcher: '/api/:path*', 
};