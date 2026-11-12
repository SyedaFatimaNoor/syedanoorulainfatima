"use client";

import NextLink, { useLinkStatus } from "next/link";
import { createPortal } from "react-dom";
import type { ComponentProps } from "react";

function NavigationFeedback() {
  const { pending } = useLinkStatus();
  if (!pending) return null;

  // A portal keeps the feedback outside animated/transformed project cards.
  // Unlike a route-level Suspense fallback, it never hides the server-rendered page.
  return createPortal(
    <div className="route-loading" role="status" aria-label="Opening page">
      <span className="loading-mark" aria-hidden="true">
        n.
      </span>
      <span>
        <span className="loading-label mono">OPENING PAGE…</span>
        <span className="loading-line" aria-hidden="true" />
      </span>
    </div>,
    document.body,
  );
}

export function PageLink({
  children,
  prefetch = false,
  ...props
}: ComponentProps<typeof NextLink>) {
  return (
    <NextLink {...props} prefetch={prefetch}>
      {children}
      <NavigationFeedback />
    </NextLink>
  );
}
