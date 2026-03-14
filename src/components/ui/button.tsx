"use client";

interface ButtonProps {
  children: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function Button({ children, href, onClick, className = "" }: ButtonProps) {
  const inner = (
    <span className={`group relative inline-flex items-center gap-3 rounded-full bg-text/5 px-6 py-3 font-[family-name:var(--font-body)] text-sm tracking-wide transition-colors hover:bg-text/10 ${className}`}>
      {/* Text swap container */}
      <span className="relative overflow-hidden h-[1.5em]">
        {/* Default text */}
        <span className="block transition-transform duration-[350ms] ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:translate-y-full">
          {children}
        </span>
        {/* Duplicate text (slides up from below) */}
        <span className="absolute inset-0 block -translate-y-full transition-transform duration-[350ms] ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:translate-y-0">
          {children}
        </span>
      </span>

      {/* Arrow swap */}
      <span className="relative w-4 h-4 overflow-hidden">
        {/* Right arrow (default, exits on hover) */}
        <svg
          className="absolute inset-0 transition-transform duration-[350ms] ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:translate-x-full"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M1 8h14M9 2l6 6-6 6" />
        </svg>
        {/* Left arrow (enters on hover) */}
        <svg
          className="absolute inset-0 -translate-x-full transition-transform duration-[350ms] ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:translate-x-0"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M15 8H1M7 2L1 8l6 6" />
        </svg>
      </span>
    </span>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }

  return (
    <button onClick={onClick} type="button">
      {inner}
    </button>
  );
}
