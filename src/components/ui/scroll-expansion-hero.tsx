"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { OceanCanvas } from "./fft-ocean";

interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc?: string;
  bgGradient?: string;
  title?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = "image",
  mediaSrc,
  posterSrc,
  bgImageSrc,
  bgGradient,
  title,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Use refs for animation — avoids stale closures & re-render loops
  const progressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const touchStartYRef = useRef(0);

  // DOM refs for direct style mutation (no re-render per frame)
  const mediaBoxRef = useRef<HTMLDivElement>(null);
  const mediaOverlayRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const word1Ref = useRef<HTMLHeadingElement>(null);
  const word2Ref = useRef<HTMLHeadingElement>(null);

  const fullyExpandedRef = useRef(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Apply progress directly to DOM without React state
  const applyProgress = (p: number) => {
    const mobile = isMobile;
    const w = 280 + p * (mobile ? 680 : 1280);
    const h = 380 + p * (mobile ? 220 : 420);
    const tx = p * (mobile ? 180 : 160);
    const br = Math.max(0, 8 - p * 8);
    const bgOpacity = Math.max(0, 1 - p * 1.5);
    const textOpacity = Math.max(0, 1 - p * 2.5);
    const overlayOpacity = Math.max(0, 0.35 - p * 0.35);

    if (mediaBoxRef.current) {
      mediaBoxRef.current.style.width = `${w}px`;
      mediaBoxRef.current.style.height = `${h}px`;
      mediaBoxRef.current.style.borderRadius = `${br}px`;
    }
    if (mediaOverlayRef.current) {
      mediaOverlayRef.current.style.background = `rgba(0,0,0,${overlayOpacity})`;
    }
    if (bgRef.current) {
      bgRef.current.style.opacity = String(bgOpacity);
    }
    if (word1Ref.current) {
      word1Ref.current.style.transform = `translateX(-${tx}vw)`;
      word1Ref.current.style.opacity = String(textOpacity);
    }
    if (word2Ref.current) {
      word2Ref.current.style.transform = `translateX(${tx}vw)`;
      word2Ref.current.style.opacity = String(textOpacity);
    }
  };

  // Lerp animation loop — only runs while animating, stops when settled
  const targetRef = useRef(0);
  const isAnimatingRef = useRef(false);

  const animateLoop = () => {
    const current = progressRef.current;
    const target = targetRef.current;
    const diff = target - current;

    if (Math.abs(diff) > 0.001) {
      progressRef.current = current + diff * 0.12;
      applyProgress(progressRef.current);
      rafRef.current = requestAnimationFrame(animateLoop);
    } else {
      // Settled — stop RAF until next scroll input
      progressRef.current = target;
      applyProgress(target);
      isAnimatingRef.current = false;
      rafRef.current = null;

      if (progressRef.current >= 0.99 && !fullyExpandedRef.current) {
        fullyExpandedRef.current = true;
        setMediaFullyExpanded(true);
        setShowContent(true);
      }
    }
  };

  const startAnim = () => {
    if (!isAnimatingRef.current) {
      isAnimatingRef.current = true;
      rafRef.current = requestAnimationFrame(animateLoop);
    }
  };

  useEffect(() => {
    // Initial render
    applyProgress(0);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (fullyExpandedRef.current && e.deltaY < 0 && window.scrollY <= 5) {
        fullyExpandedRef.current = false;
        targetRef.current = 0.9;
        setMediaFullyExpanded(false);
        setShowContent(false);
        e.preventDefault();
        startAnim();
      } else if (!fullyExpandedRef.current) {
        e.preventDefault();
        targetRef.current = Math.min(Math.max(targetRef.current + e.deltaY * 0.001, 0), 1);
        startAnim();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const deltaY = touchStartYRef.current - e.touches[0].clientY;
      if (fullyExpandedRef.current && deltaY < -20 && window.scrollY <= 5) {
        fullyExpandedRef.current = false;
        targetRef.current = 0.9;
        setMediaFullyExpanded(false);
        setShowContent(false);
        e.preventDefault();
        startAnim();
      } else if (!fullyExpandedRef.current) {
        e.preventDefault();
        const factor = deltaY < 0 ? 0.007 : 0.005;
        targetRef.current = Math.min(Math.max(targetRef.current + deltaY * factor, 0), 1);
        touchStartYRef.current = e.touches[0].clientY;
        startAnim();
      }
    };

    const handleScroll = () => { if (!fullyExpandedRef.current) window.scrollTo(0, 0); };

    window.addEventListener("wheel", handleWheel as unknown as EventListener, { passive: false });
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("touchstart", handleTouchStart as unknown as EventListener, { passive: false });
    window.addEventListener("touchmove", handleTouchMove as unknown as EventListener, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel as unknown as EventListener);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart as unknown as EventListener);
      window.removeEventListener("touchmove", handleTouchMove as unknown as EventListener);
    };
  }, []);

  const words = title ? title.split(" ") : [];
  const firstWord = words[0] ?? "";
  const restOfTitle = words.slice(1).join(" ");

  return (
    <div className="overflow-x-hidden">
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">

          {/* Background — WebGL animated ocean */}
          <div
            ref={bgRef}
            className="absolute inset-0 z-0"
            style={{ willChange: "opacity" }}
          >
            <OceanCanvas />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">

              {/* Expanding image */}
              <div
                ref={mediaBoxRef}
                className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
                style={{
                  width: "280px",
                  height: "380px",
                  maxWidth: "95vw",
                  maxHeight: "90vh",
                  borderRadius: "8px",
                  willChange: "width, height, border-radius",
                }}
              >
                {mediaType === "image" ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={mediaSrc}
                      alt={title || "24 Posti"}
                      fill
                      className="object-cover object-center"
                      priority
                      quality={90}
                      sizes="100vw"
                    />
                    <div ref={mediaOverlayRef} className="absolute inset-0" style={{ background: "rgba(0,0,0,0.35)" }} />
                  </div>
                ) : (
                  <video src={mediaSrc} poster={posterSrc} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                )}
              </div>

              {/* Title */}
              <div className={`flex items-center justify-center text-center gap-6 w-full relative z-10 flex-col ${textBlend ? "mix-blend-difference" : ""}`}>
                <h1
                  ref={word1Ref}
                  className="font-heading leading-none tracking-wider text-white select-none"
                  style={{ fontSize: "clamp(3rem,10vw,8rem)", willChange: "transform, opacity" }}
                >
                  {firstWord}
                </h1>
                {restOfTitle && (
                  <h1
                    ref={word2Ref}
                    className="font-heading leading-none tracking-wider text-white select-none"
                    style={{ fontSize: "clamp(3rem,10vw,8rem)", willChange: "transform, opacity" }}
                  >
                    {restOfTitle}
                  </h1>
                )}
              </div>
            </div>

            {/* Content after expansion */}
            <motion.section
              className="flex flex-col w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
