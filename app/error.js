"use client";

import { useEffect } from "react";

/**
 * Global Next.js error boundary page component.
 * Displays a friendly message and allows the user to reset/retry.
 * 
 * @param {Object} props - Component props
 * @param {Error & { digest?: string }} props.error - Error details
 * @param {() => void} props.reset - Reset function to retry
 * @returns {JSX.Element}
 */
export default function ErrorBoundary({ error, reset }) {
  useEffect(() => {
    // Error logged securely if needed
  }, [error]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-16 h-16 rounded-full bg-red-950 border border-red-500/30 flex items-center justify-center mb-6">
        <svg
          className="w-8 h-8 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-text mb-4">
        Something Went Wrong
      </h1>
      <p className="text-textMuted max-w-md mb-8 font-body">
        An unexpected error occurred while loading this page. {"Let's"} try again to see if it resolves the issue.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-accent text-background font-medium rounded-full shadow-lg hover:bg-accent/90 transition-colors"
        >
          Try Again
        </button>
        <a
          href="/"
          className="px-6 py-3 bg-card text-text border border-accent/10 font-medium rounded-full hover:bg-card/80 transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
