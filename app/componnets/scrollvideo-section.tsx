"use client";
import { useEffect, useRef } from "react";
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

  useGSAP(() => {
    const video = scrollVideoRef.current;
    const trigger = triggerRef.current;
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
          scrub: true,
          onEnter: onEnter,
          onEnterBack: onEnter,
        },
      });
    };

    gsap.fromTo(
      video,
      { zIndex: 0, opacity: 0 },
      {
        zIndex: 1,
        opacity: 1,
        duration: 0.5,
        scrollTrigger: {
          trigger: trigger,
          start: "top-=20 top",
          toggleActions: "play none none reverse",
        },
      }
    );

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
    <>
      <div
        ref={triggerRef}
        className="h-[240vh]" // Spacer height for scroll
      />
      <div
        className={`fixed top-0 left-0 w-full h-screen ${
          isActive ? " z-50" : " z-0 pointer-events-none"
        }`}
      >
        <video
          ref={scrollVideoRef}
          className="absolute top-0 left-0  w-full h-full object-cover"
          src={scrollVideoSrc}
          muted
          playsInline
          preload="auto"
        />
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={loopVideoSrc}
          loop
          muted
          autoPlay
          playsInline
        />
      </div>
    </>
  );
}
