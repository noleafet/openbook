import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Extract the target URL from the query string
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return new NextResponse('Missing "url" query parameter', { status: 400 });
  }

  try {
    const targetOrigin = new URL(targetUrl).origin;
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      return new NextResponse(`Failed to fetch: ${response.status}`, { status: response.status });
    }

    let html = await response.text();

    // Rewrite relative assets (href="/..." and src="/...") to use the absolute target origin
    html = html.replace(/(src|href)="\/([^"]*)"/g, `$1="${targetOrigin}/$2"`);

    // Fix root-relative slashes often used in data fields for lazy loading assets
    html = html.replace(/(data-src|data-href)="\/([^"]*)"/g, `$1="${targetOrigin}/$2"`);

    // Inject base parameters
    html = html.replace('<head>', `<head><base href="${targetOrigin}/" target="_blank">`);

    // The script optimized specifically for srcDoc engines
    const interceptScript = `
    <script>
      (function() {
        // Intercept clicks during the CAPTURE phase at the absolute window root level
        window.addEventListener('click', function(e) {
          // Find the nearest anchor element tag up the DOM tree hierarchy
          const anchor = e.target.closest('a');
          if (anchor) {
            const url = anchor.getAttribute('href');
            // If it is a real external destination link, handle it manually
            if (url && !url.startsWith('#')) {
              e.preventDefault();
              e.stopPropagation();
              
              // Force breakout targeting the parent window profile parameters
              window.open(url, '_blank');
            }
          }
        }, true); // True guarantees execution before tracking scripts block it
      })();
    </script>
    `;

    // Inject the payload script directly at the top of the body execution tree
    html = html.replace('</body>', `${interceptScript}</body>`);

    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown proxy error';
    return new NextResponse(`Proxy error: ${message}`, { status: 500 });
  }
}
