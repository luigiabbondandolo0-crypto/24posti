"use client";

import { useEffect, useRef } from "react";
import { createRenderer } from "./fft-ocean-utils/renderer";

export function OceanCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const renderer = createRenderer({ canvas });
    void renderer.ready;
    return () => renderer.dispose();
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#041a3c]">
      <canvas ref={canvasRef} className="block h-full w-full touch-none" />
    </div>
  );
}

export default OceanCanvas;
