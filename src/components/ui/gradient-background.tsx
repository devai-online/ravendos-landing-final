"use client";

import { useEffect, useRef } from "react";

const vertexShader = `attribute vec2 position;
attribute vec2 uv;
varying vec2 v_uv;
void main() {
    v_uv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
}`;

// Fluid wave shader — mouse-reactive, dark neon palette
const fragmentShader = `precision mediump float;

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
varying vec2 v_uv;

// Fast approximation of tanh
vec4 fastTanh(vec4 x) {
    vec4 x2 = x * x;
    return clamp(x * (27.0 + x2) / (27.0 + 9.0 * x2), -1.0, 1.0);
}

void main() {
    vec2 r = u_resolution.xy;
    vec2 p = (v_uv * 2.0 - 1.0) * vec2(r.x / r.y, 1.0);
    vec2 mouse = u_mouse * 2.0 - 1.0;

    float z = 4.0 - 4.0 * abs(0.7 - dot(p, p)) + mouse.y * 2.0;
    vec2 f = p * z;
    vec2 i = vec2(0.0);
    vec4 O = vec4(0.0);

    for(int j = 0; j < 8; j++) {
        i.y = float(j) + 1.0;
        vec2 sinF = sin(f) + 1.0;
        vec4 colorWave = vec4(sinF.x, sinF.y, sinF.x, sinF.y) * abs(f.x - f.y) * 1.5;

        float mouseDistance = length(p - mouse * vec2(r.x / r.y, 1.0)) * 2.0;
        float neonBoost = 1.0 + (1.0 - smoothstep(0.0, 0.5, mouseDistance)) * 0.8;
        colorWave *= neonBoost;

        O += colorWave;

        float timeOffset = u_time + mouse.x * 3.0;
        f += cos(f.yx * i.y + i + timeOffset) / i.y + 0.7;
    }

    // Compute fluid pattern from original math
    vec4 raw = fastTanh(7.0 * exp(z - 4.0 - p.y * vec4(-1.0, 1.0, 2.0, 0.0)) / O);

    gl_FragColor = raw;
}`;

/**
 * Full-screen animated fluid background.
 * Mouse-reactive wave shader in dark neon palette.
 * Uses WebGL via OGL. OGL is dynamically imported to avoid SSR issues.
 */
export function GradientBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let cleanupFn: (() => void) | undefined;

    // Dynamically import OGL to avoid SSR issues
    import("ogl").then(({ Renderer, Program, Mesh, Triangle, Vec2 }) => {
      if (cancelled || !container) return;

      let renderer: InstanceType<typeof Renderer>;
      try {
        renderer = new Renderer({
          alpha: false,
          dpr: Math.min(window.devicePixelRatio, 1.5),
          preserveDrawingBuffer: true,
        });
      } catch {
        // WebGL not available — fallback to static bg color
        return;
      }

      const gl = renderer.gl;
      container.appendChild(gl.canvas);
      gl.canvas.classList.add("gradient-canvas");
      gl.canvas.style.width = "100%";
      gl.canvas.style.height = "100%";
      gl.canvas.style.display = "block";

      const geometry = new Triangle(gl);

      const program = new Program(gl, {
        vertex: vertexShader,
        fragment: fragmentShader,
        uniforms: {
          u_time: { value: 0 },
          u_mouse: { value: new Vec2(0.5, 0.5) },
          u_resolution: { value: new Vec2(window.innerWidth, window.innerHeight) },
        },
      });

      const mesh = new Mesh(gl, { geometry, program });

      // Mouse tracking (normalized 0–1)
      const mouseTarget = { x: 0.5, y: 0.5 };
      const mouseCurrent = { x: 0.5, y: 0.5 };

      function onMouseMove(e: MouseEvent) {
        mouseTarget.x = e.clientX / window.innerWidth;
        mouseTarget.y = 1.0 - e.clientY / window.innerHeight; // flip Y for GL
      }
      window.addEventListener("mousemove", onMouseMove);

      function resize() {
        if (!container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        renderer.setSize(w, h);
        program.uniforms.u_resolution.value.set(w, h);
      }
      window.addEventListener("resize", resize);
      resize();

      let animateId: number;
      let time = 0;

      function update() {
        animateId = requestAnimationFrame(update);
        time += 0.01;

        // Smooth mouse lerp
        mouseCurrent.x += (mouseTarget.x - mouseCurrent.x) * 0.05;
        mouseCurrent.y += (mouseTarget.y - mouseCurrent.y) * 0.05;

        program.uniforms.u_time.value = time;
        program.uniforms.u_mouse.value.set(mouseCurrent.x, mouseCurrent.y);
        renderer.render({ scene: mesh });
      }
      animateId = requestAnimationFrame(update);

      cleanupFn = () => {
        window.removeEventListener("resize", resize);
        window.removeEventListener("mousemove", onMouseMove);
        cancelAnimationFrame(animateId);
        if (gl.canvas.parentNode === container) {
          container.removeChild(gl.canvas);
        }
      };
    });

    return () => {
      cancelled = true;
      cleanupFn?.();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
