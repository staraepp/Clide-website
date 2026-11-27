"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ShaderField.module.css";

const VERTEX = `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

// Waves-inspired flow field. Dictation lifts the colour and speeds up the drift.
const FRAGMENT = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPointer;
uniform float uEnergy;
uniform float uPointerPower;
uniform int uOctaves;
uniform float uFadeTop;
uniform float uFadeBottom;
out vec4 outColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p, int octaves) {
  float amp = 0.5;
  float sum = 0.0;
  for (int i = 0; i < 6; i++) {
    if (i >= octaves) break;
    sum += amp * noise(p);
    p = p * 2.02 + vec2(1.7, 9.2);
    amp *= 0.5;
  }
  return sum;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float t = uTime * (0.09 + 0.08 * uEnergy);
  vec2 pointerDelta = (uv - uPointer) * vec2(uRes.x / uRes.y, 1.0);
  float pointerLift = exp(-dot(pointerDelta, pointerDelta) * 14.0) * uPointerPower;

  float flow = uv.y + uv.x * 0.22;
  flow += sin(uv.x * 5.5 + t) * 0.12;
  flow += (fbm(uv * vec2(2.4, 3.2) + vec2(t * 0.3, 0.0), uOctaves) - 0.45) * 0.28;
  flow += pointerLift * 0.055;

  float swellDistance = (flow - 0.79) / 0.23;
  float crestDistance = (flow - 0.91) / 0.09;
  float swell = exp(-swellDistance * swellDistance);
  float crest = exp(-crestDistance * crestDistance);
  float reach = mix(0.43, 1.0, smoothstep(0.0, 0.92, uv.x));
  float fadeB = uFadeBottom > 0.0 ? smoothstep(0.0, uFadeBottom, uv.y) : 1.0;
  float fadeT = uFadeTop > 0.0 ? 1.0 - smoothstep(1.0 - uFadeTop, 1.0, uv.y) : 1.0;

  vec3 base = vec3(8.0, 8.0, 10.0) / 255.0;
  vec3 blue = vec3(0.055, 0.18, 0.34) * swell + vec3(0.07, 0.17, 0.22) * crest;
  vec3 col = base + blue * reach * fadeB * fadeT * (0.82 + uEnergy * 0.35);
  col += (hash(gl_FragCoord.xy) - 0.5) / 255.0;
  outColor = vec4(col, 1.0);
}
`;

type Tier = "low" | "medium" | "high";

function detectTier(): Tier {
  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  if (cores <= 4 || memory <= 2) return "low";
  if (cores <= 8 || window.devicePixelRatio < 2) return "medium";
  return "high";
}

const TIER_SETTINGS: Record<Tier, { scale: number; octaves: number; fps: number }> = {
  low: { scale: 0.26, octaves: 3, fps: 24 },
  medium: { scale: 0.36, octaves: 4, fps: 40 },
  high: { scale: 0.5, octaves: 4, fps: 60 },
};

type ShaderFieldProps = {
  /** 0..1. Raises brightness and speed, e.g. while dictating. */
  energy?: number;
  /** Fraction of the height over which the field fades to the page colour. */
  fadeBottom?: number;
  fadeTop?: number;
  className?: string;
};

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    if (process.env.NODE_ENV !== "production") console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function ShaderField({
  energy = 0,
  fadeBottom = 0.45,
  fadeTop = 0,
  className,
}: ShaderFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const energyRef = useRef(energy);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    energyRef.current = energy;
  }, [energy]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) {
      setSupported(false);
      return;
    }

    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    const program = gl.createProgram();
    if (!vertex || !fragment || !program) {
      setSupported(false);
      return;
    }
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setSupported(false);
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uniform = (name: string) => gl.getUniformLocation(program, name);
    const uRes = uniform("uRes");
    const uTime = uniform("uTime");
    const uPointer = uniform("uPointer");
    const uEnergy = uniform("uEnergy");
    const uPointerPower = uniform("uPointerPower");
    const uOctaves = uniform("uOctaves");
    const uFadeTop = uniform("uFadeTop");
    const uFadeBottom = uniform("uFadeBottom");

    const tier = TIER_SETTINGS[detectTier()];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let raf = 0;
    let visible = false;
    let running = false;
    let lost = false;
    let last = 0;
    let time = 14 + Math.random() * 20;
    let smoothEnergy = 0;
    let pointerPower = 0;
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(2, Math.round(rect.width * dpr * tier.scale));
      const height = Math.max(2, Math.round(rect.height * dpr * tier.scale));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const draw = () => {
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, time);
      gl.uniform2f(uPointer, pointer.x, pointer.y);
      gl.uniform1f(uEnergy, smoothEnergy);
      gl.uniform1f(uPointerPower, pointerPower);
      gl.uniform1i(uOctaves, tier.octaves);
      gl.uniform1f(uFadeTop, fadeTop);
      gl.uniform1f(uFadeBottom, fadeBottom);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const minDelta = 1000 / tier.fps;
      if (now - last < minDelta) return;
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      time += dt;
      smoothEnergy += (energyRef.current - smoothEnergy) * Math.min(1, dt * 3);
      pointer.x += (pointer.tx - pointer.x) * Math.min(1, dt * 5);
      pointer.y += (pointer.ty - pointer.y) * Math.min(1, dt * 5);
      pointerPower *= Math.pow(0.35, dt);
      draw();
    };

    const sync = () => {
      const shouldRun = visible && !document.hidden && !reduced.matches && !lost;
      if (shouldRun && !running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
      if (!shouldRun && visible && !lost) {
        smoothEnergy = energyRef.current;
        draw();
      }
    };

    const onPointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      pointer.tx = (event.clientX - rect.left) / rect.width;
      pointer.ty = 1 - (event.clientY - rect.top) / rect.height;
      pointerPower = Math.min(1, pointerPower + 0.12);
    };

    const onLost = (event: Event) => {
      event.preventDefault();
      lost = true;
      sync();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );
    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (!running) draw();
    });

    resize();
    observer.observe(canvas);
    resizeObserver.observe(canvas);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    canvas.addEventListener("webglcontextlost", onLost);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
      canvas.removeEventListener("webglcontextlost", onLost);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, [fadeBottom, fadeTop]);

  return (
    <div className={`${styles.field} ${className ?? ""}`} aria-hidden="true">
      {supported ? (
        <canvas ref={canvasRef} className={styles.canvas} />
      ) : (
        <div className={styles.fallback} />
      )}
    </div>
  );
}
