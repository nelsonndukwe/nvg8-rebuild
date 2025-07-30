"use client";
import {useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  index: number;
  scrollVideoSrc?: string;
  loopVideoSrc: string;
  isActive: boolean;
  onEnter: () => void;
}

export default function ScrollVideoSection({
  index,
  scrollVideoSrc,
  loopVideoSrc,
  isActive,
  onEnter,
}: Props) {
  const scrollVideoRef = useRef<HTMLVideoElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const loopVideoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    const video = scrollVideoRef.current;
    const trigger = triggerRef.current;
    const loopVideo = loopVideoRef.current;
    if (!video || !trigger) return;

    // Wait for video to load metadata (duration)
    const setup = () => {
      gsap.to(video, {
        currentTime: video.duration || 1,
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
          onEnter: onEnter,
          onEnterBack: onEnter,
        },
      });

      // 💨 Fade out loopVideo on scroll start
      gsap.to(loopVideo, {
        zIndex: 0,
        scrollTrigger: {
          trigger: trigger,
          start: "top+=100 top",
          toggleActions: "play none none reverse",
        },
      });

      // 💨 Fade in scrollVideo instantly
      gsap.fromTo(
        video,
        { zIndex: 0 },
        {
          zIndex: 1,
          scrollTrigger: {
            trigger: trigger,
            start: "top+=100 top",
            toggleActions: "play none none reverse",
          },
        }
      );
    };

    if (video.readyState >= 1) {
      setup();
    } else {
      video.addEventListener("loadedmetadata", setup, { once: true });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="relative">
      <div
        ref={triggerRef}
        className="h-[225vh]" // Spacer height for scroll
      />
      <div
        className={`fixed top-0 left-0 w-full h-screen ${
          isActive ? " z-50" : " z-0 pointer-events-none"
        }`}
      >
        {scrollVideoSrc && (
          <video
            ref={scrollVideoRef}
            className="absolute top-0 left-0  w-full h-full object-cover aspect-video"
            src={scrollVideoSrc}
            muted
            playsInline
            preload="auto"
          />
        )}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover aspect-video"
          src={loopVideoSrc}
          ref={loopVideoRef}
          loop
          muted
          autoPlay
          playsInline
        />
      </div>

       {/* TEXT OVERLAY
       <div className="relative h-full flex items-start mt-20 justify-center pointer-events-none">
          <h2 className={`block text-black text-[107px] font-extrabold max-w-2xl text-center leading-24 esquadro`}>
            Meet the Navigators
          </h2>
        </div> */}
    </div>
  );
}
