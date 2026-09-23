"use client";

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import Image from "next/image";
import { motion, useSpring } from "framer-motion";

interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = "image",
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);

  // Spring for ultra-smooth interpolation
  const springProgress = useSpring(0, { stiffness: 80, damping: 20, mass: 0.5 });

  const progressRef = useRef(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    springProgress.set(0);
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
    progressRef.current = 0;
  }, [mediaType]);

  // Sync spring to state for render
  useEffect(() => {
    const unsub = springProgress.on("change", (v) => {
      setScrollProgress(v);
      if (v >= 0.98) {
        setMediaFullyExpanded(true);
        setShowContent(true);
      } else if (v < 0.75) {
        setShowContent(false);
        if (mediaFullyExpanded) setMediaFullyExpanded(false);
      }
    });
    return unsub;
  }, [springProgress, mediaFullyExpanded]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        progressRef.current = 0.95;
        springProgress.set(0.95);
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const delta = e.deltaY * 0.001;
        progressRef.current = Math.min(Math.max(progressRef.current + delta, 0), 1);
        springProgress.set(progressRef.current);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        progressRef.current = 0.95;
        springProgress.set(0.95);
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const factor = deltaY < 0 ? 0.007 : 0.005;
        progressRef.current = Math.min(Math.max(progressRef.current + deltaY * factor, 0), 1);
        springProgress.set(progressRef.current);
        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = () => setTouchStartY(0);
    const handleScroll = () => { if (!mediaFullyExpanded) window.scrollTo(0, 0); };

    window.addEventListener("wheel", handleWheel as unknown as EventListener, { passive: false });
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("touchstart", handleTouchStart as unknown as EventListener, { passive: false });
    window.addEventListener("touchmove", handleTouchMove as unknown as EventListener, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel as unknown as EventListener);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart as unknown as EventListener);
      window.removeEventListener("touchmove", handleTouchMove as unknown as EventListener);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY, springProgress]);

  useEffect(() => {
    const check = () => setIsMobileState(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const mediaWidth = 280 + scrollProgress * (isMobileState ? 680 : 1280);
  const mediaHeight = 380 + scrollProgress * (isMobileState ? 220 : 420);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 160);
  const bgOpacity = Math.max(0, 1 - scrollProgress * 1.4);

  const firstWord = title ? title.split(" ")[0] : "";
  const restOfTitle = title ? title.split(" ").slice(1).join(" ") : "";

  return (
    <div ref={sectionRef} className="overflow-x-hidden">
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">

          {/* Background — fades out cleanly */}
          <div
            className="absolute inset-0 z-0 h-full"
            style={{ opacity: bgOpacity, willChange: "opacity" }}
          >
            <Image
              src={bgImageSrc}
              alt="Background"
              fill
              className="object-cover object-center"
              priority
              quality={90}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/25" />
          </div>

          <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">

              {/* Expanding image */}
              <div
                className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: "95vw",
                  maxHeight: "90vh",
                  borderRadius: `${Math.max(0, 8 - scrollProgress * 8)}px`,
                  boxShadow: `0 ${20 - scrollProgress * 20}px ${60 - scrollProgress * 60}px rgba(0,0,0,${0.3 - scrollProgress * 0.3})`,
                  willChange: "width, height",
                }}
              >
                {mediaType === "image" ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={mediaSrc}
                      alt={title || "24 Posti"}
                      fill
                      className="object-cover"
                      priority
                      quality={90}
                      sizes="100vw"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `rgba(0,0,0,${Math.max(0, 0.35 - scrollProgress * 0.35)})`,
                      }}
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-full pointer-events-none">
                    <video
                      src={mediaSrc}
                      poster={posterSrc}
                      autoPlay muted loop playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Title — splits apart on scroll */}
              <div
                className={`flex items-center justify-center text-center gap-6 w-full relative z-10 flex-col ${
                  textBlend ? "mix-blend-difference" : "mix-blend-normal"
                }`}
              >
                <motion.h1
                  className="font-heading leading-none tracking-wider text-white select-none"
                  style={{
                    fontSize: "clamp(3rem, 10vw, 8rem)",
                    transform: `translateX(-${textTranslateX}vw)`,
                    opacity: Math.max(0, 1 - scrollProgress * 2),
                    willChange: "transform, opacity",
                  }}
                >
                  {firstWord}
                </motion.h1>
                {restOfTitle && (
                  <motion.h1
                    className="font-heading leading-none tracking-wider text-white select-none"
                    style={{
                      fontSize: "clamp(3rem, 10vw, 8rem)",
                      transform: `translateX(${textTranslateX}vw)`,
                      opacity: Math.max(0, 1 - scrollProgress * 2),
                      willChange: "transform, opacity",
                    }}
                  >
                    {restOfTitle}
                  </motion.h1>
                )}
              </div>
            </div>

            {/* Children after expansion */}
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
