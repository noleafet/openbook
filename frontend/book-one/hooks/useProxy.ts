// hooks/useProxiedIframe.ts
import { useState, useEffect } from 'react';

export function useProxyPage(proxyUrl: string) {
  const [proxyHtmlContent, setProxyHtmlContent] = useState<string>('');
  const [isProxyLoading, setIsProxyLoading] = useState<boolean>(true);
  const [proxyError, setProxyError] = useState<string | null>(null);

  useEffect(() => {

    if (!proxyUrl) {
      setIsProxyLoading(false);
      return;
    }

    const controller = new AbortController();

    async function fetchProxiedPage() {
      try {
        setIsProxyLoading(true);
        setProxyError(null);
        
        const response = await fetch(proxyUrl, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Proxy returned status: ${response.status}`);
        }
        
        const html = await response.text();
        setProxyHtmlContent(html);
      } catch (err: unknown) {

        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }

        if (err instanceof Error) {
          setProxyError(err.message);
        } else {
          setProxyError('An unknown error occurred');
        }
      } finally {
        setIsProxyLoading(false);
      }
    }

    if (proxyUrl) {
      fetchProxiedPage();
    }

    return () => {
      controller.abort();
    };
  }, [proxyUrl]);

  return { proxyHtmlContent, isProxyLoading, proxyError };
}
