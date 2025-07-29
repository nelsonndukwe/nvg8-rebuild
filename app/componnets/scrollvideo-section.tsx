"use client";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useScrollVideoStore } from "../store/zustand";
import styles from "@/app/page.module.css";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  scrollVideoSrc?: string;
  loopVideoSrc: string;
  heading?: string;
  subheading?: string;
  index: number;
  name: string;
}
export default function ScrollVideoSection({
  scrollVideoSrc,
  loopVideoSrc,
  heading = "",
  subheading = "",
  index,
  name,
}: Props) {
  const [isLooping, setIslooping] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const mainDivRef = useRef<HTMLDivElement>(null);
  const scrollVideoRef = useRef<HTMLVideoElement>(null);
  const loopVideoRef = useRef<HTMLVideoElement>(null);
  const setActiveSection = useScrollVideoStore(
    (state) => state.setActiveSection
  );
  const activeSection = useScrollVideoStore((state) => state.activeSection);

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
              start: "top-=20 top",
              end: "bottom top",
              scrub: 0.4,
              onUpdate: (self) => {
                setActiveSection(name); // ✅ mark section as active

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
              start: "top-=20 top",
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
                start: "top-=20 top",
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
    <div
      ref={mainDivRef}
      className={`relative w-screen transition-opacity duration-300 ${
        activeSection === name ? "z-100" : " z-0 pointer-events-none"
      }`}
    >
      <div className="sticky top-0 h-[100lvh] overflow-hidden">
        {/* VIDEO LAYERS */}
        <div className="absolute inset-0 overflow-hidden ">
          {/* Scroll-controlled video */}
          <video
            ref={scrollVideoRef}
            className={`absolute inset-0 w-full h-full object-cover aspect-video`}
            src={scrollVideoSrc}
            muted
            playsInline
            preload="auto"
          />

          {/* Looping video */}
          <video
            ref={loopVideoRef}
            className={`absolute inset-0 w-full h-full object-cover aspect-video`}
            src={loopVideoSrc}
            loop
            muted
            autoPlay
            playsInline
            preload="auto"
          />
        </div>

        {/* TEXT OVERLAY */}
        <div className="relative h-full flex items-start mt-20 justify-center pointer-events-none">
          <h2 className={`block text-black text-[107px] font-extrabold max-w-2xl text-center leading-24 ${styles.esquadro}`}>
            Meet the Navigators
          </h2>
        </div>
      </div>

      {/* SCROLL SPACER */}
      <div ref={sectionRef} className="h-[525vh]" />
    </div>
  );
}
