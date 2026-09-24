"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";

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
    // Phase 1 (0→0.5): "POSTI" slides up from below
    const revealP = Math.min(p / 0.5, 1);
    // Phase 2 (0.5→1): both words fade out, content appears (ocean stays)
    const exitP = Math.max((p - 0.5) / 0.5, 0);

    const word1Opacity = 1;
    const word2Opacity = revealP;
    // Slides up from +50px → 0
    const word2SlideY = (1 - revealP) * 50;

    if (word1Ref.current) {
      word1Ref.current.style.opacity = String(word1Opacity);
    }
    if (word2Ref.current) {
      word2Ref.current.style.opacity = String(word2Opacity);
      word2Ref.current.style.transform = `translateY(${word2SlideY}px)`;
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

          {/* Background — neutral warm */}
          <div
            ref={bgRef}
            className="absolute inset-0 z-0 bg-[#FAF9F7]"
          />

          <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">

              {/* Title — "24" always visible, "POSTI" slides up from below */}
              <div className="flex flex-col items-center justify-center gap-2 w-full relative z-10">
                <h1
                  ref={word1Ref}
                  className="font-heading leading-none text-[#1C1917] select-none text-center"
                  style={{
                    fontSize: "clamp(6rem,20vw,16rem)",
                    willChange: "opacity",
                    letterSpacing: "0.08em",
                  }}
                >
                  {firstWord}
                </h1>
                {restOfTitle && (
                  <h1
                    ref={word2Ref}
                    className="font-heading leading-none text-[#92700A] select-none text-center"
                    style={{
                      fontSize: "clamp(2.5rem,8vw,6rem)",
                      willChange: "transform, opacity",
                      letterSpacing: "0.35em",
                      opacity: 0,
                      transform: "translateY(50px)",
                    }}
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
