export default function Loading() {
  return (
    <main className="relative z-[1] flex min-h-svh items-center justify-center">
      <div className="flex items-center gap-3">
        <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
        <span className="font-[family-name:var(--font-body)] text-sm text-text/50 tracking-wide">
          Loading
        </span>
      </div>
    </main>
  );
}
