"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="main-content" className="relative z-[1] flex min-h-svh flex-col items-center justify-center px-6">
      {/* Decorative text */}
      <span className="font-[family-name:var(--font-hero)] text-[clamp(4rem,15vw,10rem)] font-bold leading-none text-text/5 select-none mb-2">
        ERROR
      </span>

      <h1 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold uppercase -mt-6 mb-4">
        Something went wrong
      </h1>
      <p className="font-[family-name:var(--font-body)] text-base text-text/50 mb-10 text-center max-w-md">
        An unexpected error occurred. Please try again.
      </p>

      <button
        onClick={reset}
        className="group inline-flex items-center gap-3 rounded-full bg-text px-8 py-4 transition-all duration-300 hover:bg-text/90 hover:gap-4"
      >
        <span className="font-[family-name:var(--font-body)] text-sm tracking-wide text-bg">
          Try again
        </span>
        <svg
          className="h-4 w-4 text-bg transition-transform duration-300 group-hover:rotate-180"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M1 8a7 7 0 0 1 13-3.5M15 8a7 7 0 0 1-13 3.5" />
          <path d="M14 1v3.5h-3.5M2 15v-3.5h3.5" />
        </svg>
      </button>
    </main>
  );
}
