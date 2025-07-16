"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function LastScrollVideoSection() {
  const loopVideoRef = useRef<HTMLVideoElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = scrollRef.current;

      if (!section) return;

      gsap.to(loopVideoRef.current, {
        scale: 1.0100,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    },
    { scope: scrollRef }
  );

  return (
    <div className="absolute inset-0 w-screen">
      <div className="sticky top-0 h-[100vh] overflow-hidden">
        {/* VIDEO LAYERS */}
        <div className="absolute inset-0 overflow-hidden ">
          {/* Looping video */}
          <video
            ref={loopVideoRef}
            className={`absolute inset-0 w-full h-full object-cover aspect-video`}
            src={"videos/NAVIGATE_4K_S50_loop@sm.mp4"}
            loop
            muted
            autoPlay
            playsInline
            preload="auto"
          />
        </div>

        {/* TEXT OVERLAY */}
        <div className="relative h-full flex items-center justify-center pointer-events-none">
          <h2 className="text-white text-5xl font-bold max-w-2xl text-center">
            Your scrolly message appears here
          </h2>
        </div>
      </div>

      {/* SCROLL SPACER */}
      <div ref={scrollRef} className="h-[200vh]" />
    </div>
  );
}
