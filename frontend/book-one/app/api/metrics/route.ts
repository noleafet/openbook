import { NextResponse } from 'next/server';
import client from 'prom-client';

const register = new client.Registry();

register.setDefaultLabels({
  app: 'frontend-nextjs',
  env: process.env.NODE_ENV || 'development'
});

client.collectDefaultMetrics({ register });

export async function GET(): Promise<NextResponse> {
  try {
    const metrics = await register.metrics();
    return new NextResponse(metrics, {
      status: 200,
      headers: {
        'Content-Type': register.contentType,
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    });
  } catch { // 👈 Removed "error" completely
    return new NextResponse('Failed to generate metrics', { status: 500 });
  }
}
