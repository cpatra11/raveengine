// app/providers.tsx
"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { usePostHog } from "posthog-js/react";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  // Track pageviews
  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname;
      if (searchParams.toString()) {
        url = url + "?" + searchParams.toString();
      }

      posthog.capture("$pageview", { $current_url: url });
    }
  }, [pathname, searchParams, posthog]);

  return null;
}

// Wrap PostHogPageView in Suspense to avoid the useSearchParams usage above
// from de-opting the whole app into client-side rendering
function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  );
}

// Initialize PostHog in a way that supports both client and server components
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  // Check if we're in the browser
  const isBrowser = typeof window !== "undefined";

  useEffect(() => {
    // Initialize PostHog on the client side
    if (isBrowser && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host:
          process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
        capture_pageview: false, // Disable automatic pageview capture
        persistence: "localStorage",
        loaded: (posthog) => {
          if (process.env.NODE_ENV === "development") posthog.debug();
        },
      });
    }
  }, [isBrowser]);

  return (
    <PHProvider client={posthog}>
      {children}
      <SuspendedPostHogPageView />
    </PHProvider>
  );
}
