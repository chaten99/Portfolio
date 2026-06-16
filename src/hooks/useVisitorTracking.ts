import { useEffect, useState } from "react";

interface TrackingResult {
  visitorCount: number | null;
  loading: boolean;
}


export default function useVisitorTracking(): TrackingResult {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const SESSION_KEY = "portfolio_visit_tracked";

    if (sessionStorage.getItem(SESSION_KEY)) {
      setLoading(false);
      return;
    }

    const trackVisit = async (): Promise<void> => {
      try {
        const payload = {
          page: window.location.href,
          referrer: document.referrer || "",
          screenWidth: window.screen.width,
          screenHeight: window.screen.height,
          language: navigator.language || "",
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
        };

        const response = await fetch("/.netlify/functions/track-visit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const data = (await response.json()) as {
            success: boolean;
            visitorCount?: number;
          };

          if (data.visitorCount) {
            setVisitorCount(data.visitorCount);
          }

          sessionStorage.setItem(SESSION_KEY, "true");
        }
      } catch {
        console.warn("Visitor tracking failed silently");
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      void trackVisit();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return { visitorCount, loading };
}
