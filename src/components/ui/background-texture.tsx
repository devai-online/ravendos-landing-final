"use client";

export function BackgroundTexture() {
  return (
    <>
      {/* Dot grid — very subtle */}
      <div
        className="pointer-events-none fixed inset-0 z-[9998]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Noise grain — barely perceptible */}
      <div
        className="pointer-events-none fixed inset-0 z-[9999]"
        style={{
          backgroundImage: 'url("/images/noise.png")',
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
          opacity: 0.18,
        }}
      />
    </>
  );
}
