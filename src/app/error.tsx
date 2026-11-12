"use client";
import { RotateCcw } from "lucide-react";
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="main" className="error-page">
      <span className="eyebrow">A SMALL INTERRUPTION</span>
      <h1>Let’s try that again.</h1>
      <p>
        This page couldn’t finish loading. Please try once more, or use the
        navigation to keep exploring.
      </p>
      <button type="button" className="button button-primary" onClick={reset}>
        Try again <RotateCcw size={17} aria-hidden="true" />
      </button>
    </main>
  );
}
