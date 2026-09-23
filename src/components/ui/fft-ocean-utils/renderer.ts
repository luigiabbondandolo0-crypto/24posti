interface RendererOptions {
  canvas: HTMLCanvasElement;
}

interface Renderer {
  ready: Promise<void>;
  dispose: () => void;
}

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
uniform float uTime;
uniform vec2  uRes;

// ── Noise helpers ──────────────────────────────────────────────
float hash(vec2 p) {
  p = fract(p * vec2(127.1, 311.7));
  p += dot(p, p + 74.23);
  return fract(p.x * p.y);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i),            hash(i + vec2(1,0)), u.x),
    mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 6; i++) {
    v += a * vnoise(p);
    p  = rot * p;
    a *= 0.5;
  }
  return v;
}

// ── Gerstner-style wave ────────────────────────────────────────
float wave(vec2 uv, vec2 dir, float freq, float speed, float amp) {
  return amp * sin(dot(uv, dir) * freq + uTime * speed);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;

  // Slight perspective tilt — horizon at top, close water at bottom
  vec2 p = uv;
  p.y = pow(p.y, 0.7);                   // compress top
  p *= vec2(3.5, 2.5);                   // tile scale
  p.x += uTime * 0.04;                   // slow horizontal drift

  // ── Multi-scale waves ──────────────────────────────────────
  float w = 0.0;
  w += wave(p, vec2(0.82, 0.57), 2.1,  0.55, 0.38);
  w += wave(p, vec2(-0.6, 0.80), 3.4,  0.80, 0.22);
  w += wave(p, vec2(0.40,-0.92), 5.1,  1.10, 0.14);
  w += wave(p, vec2(0.95, 0.31), 7.8,  0.65, 0.09);
  w += wave(p, vec2(-0.3, 0.95), 11.0, 1.30, 0.05);
  w  = w * 0.5 + 0.5;                   // 0..1

  // ── FBM turbulence ─────────────────────────────────────────
  float turb = fbm(p + uTime * 0.06);
  turb = fbm(p + turb + vec2(uTime * 0.03, uTime * 0.07));

  float surface = mix(w, turb, 0.35);

  // ── Foam / whitecaps at crests ──────────────────────────────
  float foam = smoothstep(0.74, 0.90, surface) * smoothstep(0.97, 0.88, surface);
  // thin foam streaks using fbm
  float streaks = smoothstep(0.71, 0.78, turb) * 0.45;
  foam = clamp(foam + streaks, 0.0, 1.0);

  // ── Depth-based coloring ────────────────────────────────────
  // deep (bottom) → shallower (top of screen)
  float depth = 1.0 - uv.y * 0.55 - surface * 0.20;

  // Palette: deep navy → teal → bright cyan
  vec3 cDeep    = vec3(0.016, 0.165, 0.235);   // #041A3C dark navy
  vec3 cMid     = vec3(0.040, 0.310, 0.430);   // #074F6E mid teal
  vec3 cShallow = vec3(0.082, 0.530, 0.650);   // #1587A6 bright teal
  vec3 cFoam    = vec3(0.820, 0.940, 0.970);   // #D1F0F7 pale blue-white

  vec3 water = mix(cShallow, cMid,  smoothstep(0.0, 0.5, depth));
       water = mix(water,    cDeep, smoothstep(0.4, 1.0, depth));

  // ── Specular glint ──────────────────────────────────────────
  float glint = pow(clamp(fbm(p * 4.0 + uTime * 0.2), 0.0, 1.0), 18.0) * 0.6;

  // ── Compose ─────────────────────────────────────────────────
  vec3 col = mix(water, cFoam, foam);
  col += vec3(0.7, 0.9, 1.0) * glint;

  // Slight vignette
  float vig = 1.0 - 0.35 * length(uv - 0.5) * 1.6;
  col *= vig;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string): WebGLShader {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
    console.error("Shader error:", gl.getShaderInfoLog(s));
  return s;
}

export function createRenderer({ canvas }: RendererOptions): Renderer {
  const gl = canvas.getContext("webgl") as WebGLRenderingContext | null;
  if (!gl) {
    console.warn("WebGL not supported");
    return { ready: Promise.resolve(), dispose: () => {} };
  }

  // Program
  const prog = gl.createProgram()!;
  gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  // Fullscreen quad
  const buf = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW
  );
  const loc = gl.getAttribLocation(prog, "a_pos");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const uTime = gl.getUniformLocation(prog, "uTime");
  const uRes  = gl.getUniformLocation(prog, "uRes");

  let raf = 0;
  const start = performance.now();

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width  = canvas.clientWidth  * dpr;
    canvas.height = canvas.clientHeight * dpr;
    gl.viewport(0, 0, canvas.width, canvas.height);
  };

  const tick = () => {
    const t = (performance.now() - start) / 1000;
    gl.uniform1f(uTime, t);
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    raf = requestAnimationFrame(tick);
  };

  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  tick();

  return {
    ready: Promise.resolve(),
    dispose: () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
    },
  };
}
