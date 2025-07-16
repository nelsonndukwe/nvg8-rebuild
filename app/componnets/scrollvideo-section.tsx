"use client";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  scrollVideoSrc?: string;
  loopVideoSrc: string;
  heading?: string;
  subheading?: string;
}
export default function ScrollVideoSection({
  scrollVideoSrc,
  loopVideoSrc,
  heading = "",
  subheading = "",
}: Props) {
  const [isLooping, setIslooping] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const mainDivRef = useRef<HTMLDivElement>(null);
  const scrollVideoRef = useRef<HTMLVideoElement>(null);
  const loopVideoRef = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      const scrollVideo = scrollVideoRef.current;
      const loopVideo = loopVideoRef.current;
      const section = sectionRef.current;

      if (!scrollVideo || !loopVideo || !section) return;

      // Ensure clean GSAP setup
      const ctx = gsap.context(() => {
        scrollVideo.pause();
        scrollVideo.currentTime = 0;

        const initScrollAnimation = () => {
          const duration = scrollVideo.duration || 1;

          // 🎞 Scroll-driven video playback
          gsap.to(scrollVideo, {
            currentTime: duration,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top-=500 top",
              end: "bottom top",
              scrub: true,
              markers: true,
              onUpdate: (self) => {
                loopVideo.play();
                const isNowScrolling = self.progress > 0;
                if (isNowScrolling && isLooping) {
                  setIslooping(false);
                } else if (!isNowScrolling && !isLooping) {
                  setIslooping(true);
                }
              },
            },
          });

          // 💨 Fade out loopVideo on scroll start
          gsap.to(loopVideo, {
            zIndex: 0,
            scrollTrigger: {
              trigger: section,
              start: "top-=500 top",
              toggleActions: "play none none reverse",
            },
          });

          // 💨 Fade in scrollVideo instantly
          gsap.fromTo(
            scrollVideo,
            { zIndex: 0 },
            {
              zIndex: 1,
              scrollTrigger: {
                trigger: section,
                start: "top-=500 top",
                toggleActions: "play none none reverse",
              },
            }
          );

          // ✅ Force ScrollTrigger to re-measure layout
          ScrollTrigger.refresh();
        };

        if (scrollVideo.readyState >= 1) {
          initScrollAnimation();
        } else {
          scrollVideo.addEventListener("loadedmetadata", initScrollAnimation, {
            once: true,
          });
        }
      }, sectionRef);

      return () => ctx.revert(); // clean up
    },
    { scope: sectionRef }
  );

  return (
    <div ref={mainDivRef} className="relative w-screen">
      <div className="sticky top-0 h-[100lvh] overflow-hidden">
        {/* VIDEO LAYERS */}
        <div className="absolute inset-0 overflow-hidden ">
          {/* Scroll-controlled video */}
          <video
            ref={scrollVideoRef}
            className={`absolute inset-0 w-full h-full object-contain aspect-video`}
            src={scrollVideoSrc}
            muted
            playsInline
            preload="auto"
          />

          {/* Looping video */}
          <video
            ref={loopVideoRef}
            className={`absolute inset-0 w-full h-full object-contain aspect-video`}
            src={loopVideoSrc}
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
      <div ref={sectionRef} className="h-[500vh]" />
    </div>
  );
}
