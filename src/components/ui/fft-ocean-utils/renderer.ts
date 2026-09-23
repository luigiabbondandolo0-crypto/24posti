interface RendererOptions {
  canvas: HTMLCanvasElement;
}

interface Renderer {
  ready: Promise<void>;
  dispose: () => void;
}

// Simplified shader — 4 wave layers, 3-octave FBM, no matrix rot
const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision mediump float;
uniform float uTime;
uniform vec2  uRes;

float hash(vec2 p) {
  p = fract(p * vec2(127.1, 311.7));
  p += dot(p, p + 74.23);
  return fract(p.x * p.y);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1,0)), f.x),
    mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  v += 0.500 * vnoise(p);       p = p * 2.01 + vec2(1.7, 9.2);
  v += 0.250 * vnoise(p);       p = p * 2.01 + vec2(8.3, 2.8);
  v += 0.125 * vnoise(p);
  return v;
}

float wave(vec2 uv, vec2 dir, float freq, float speed, float amp) {
  return amp * sin(dot(uv, dir) * freq + uTime * speed);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p  = uv * vec2(3.2, 2.2) + vec2(uTime * 0.03, 0.0);

  float w = 0.0;
  w += wave(p, vec2(0.82, 0.57), 2.1, 0.50, 0.38);
  w += wave(p, vec2(-0.6, 0.80), 3.4, 0.70, 0.20);
  w += wave(p, vec2(0.40,-0.92), 5.1, 0.90, 0.12);
  w += wave(p, vec2(0.95, 0.31), 7.2, 0.55, 0.07);
  w  = w * 0.5 + 0.5;

  float turb = fbm(p + uTime * 0.04);
  float surf = mix(w, turb, 0.30);

  float foam    = smoothstep(0.76, 0.90, surf) * smoothstep(0.98, 0.88, surf);
  float streaks = smoothstep(0.72, 0.78, turb) * 0.40;
  foam = clamp(foam + streaks, 0.0, 1.0);

  float depth = 1.0 - uv.y * 0.50 - surf * 0.18;

  vec3 cDeep    = vec3(0.016, 0.165, 0.235);
  vec3 cMid     = vec3(0.040, 0.310, 0.430);
  vec3 cShallow = vec3(0.082, 0.530, 0.650);
  vec3 cFoam    = vec3(0.820, 0.940, 0.970);

  vec3 col = mix(cShallow, cMid,  smoothstep(0.0, 0.5, depth));
      col  = mix(col,     cDeep, smoothstep(0.4, 1.0, depth));
  col = mix(col, cFoam, foam);

  float vig = 1.0 - 0.30 * length((uv - 0.5) * 1.5);
  col *= vig;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string): WebGLShader {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

export function createRenderer({ canvas }: RendererOptions): Renderer {
  const gl = canvas.getContext("webgl", { antialias: false, powerPreference: "default" }) as WebGLRenderingContext | null;
  if (!gl) return { ready: Promise.resolve(), dispose: () => {} };

  const prog = gl.createProgram()!;
  gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "a_pos");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const uTime = gl.getUniformLocation(prog, "uTime");
  const uRes  = gl.getUniformLocation(prog, "uRes");

  // Cap DPR at 1 — no need for retina on a background
  const dpr = Math.min(window.devicePixelRatio, 1);
  let raf = 0;
  let last = 0;
  const FPS = 30; // 30fps enough for background
  const INTERVAL = 1000 / FPS;
  const start = performance.now();

  const resize = () => {
    canvas.width  = Math.floor(canvas.clientWidth  * dpr);
    canvas.height = Math.floor(canvas.clientHeight * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
  };

  const tick = (now: number) => {
    raf = requestAnimationFrame(tick);
    if (now - last < INTERVAL) return; // throttle to 30fps
    last = now;
    const t = (now - start) / 1000;
    gl.uniform1f(uTime, t);
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  };

  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  raf = requestAnimationFrame(tick);

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
