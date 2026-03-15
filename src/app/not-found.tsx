import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="relative z-[1] flex min-h-svh flex-col items-center justify-center px-6">
      {/* Large decorative 404 */}
      <span className="font-[family-name:var(--font-hero)] text-[clamp(6rem,20vw,16rem)] font-bold leading-none text-text/5 select-none">
        404
      </span>

      {/* Message */}
      <h1 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold uppercase -mt-8 mb-4">
        Page not found
      </h1>
      <p className="font-[family-name:var(--font-body)] text-base text-text/50 mb-10 text-center max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      {/* Back to home */}
      <Link
        href="/"
        className="group inline-flex items-center gap-3 rounded-full bg-text px-8 py-4 transition-all duration-300 hover:bg-text/90 hover:gap-4"
      >
        <span className="font-[family-name:var(--font-body)] text-sm tracking-wide text-bg">
          Back to home
        </span>
        <svg
          className="h-4 w-4 text-bg transition-transform duration-300 group-hover:translate-x-0.5"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M1 8h14M9 2l6 6-6 6" />
        </svg>
      </Link>
    </main>
  );
}
