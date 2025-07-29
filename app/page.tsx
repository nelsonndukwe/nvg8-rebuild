"use client";
import { useEffect, useState } from "react";
import { scrollVideoData } from "./data";
import ScrollVideoSection from "./componnets/scrollvideo-section";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <main className="relative w-full">
      {scrollVideoData.map((video, index) => (
        <ScrollVideoSection
          key={index}
          index={index}
          scrollVideoSrc={video.scrollVideoSrc}
          loopVideoSrc={video.loopVideoSrc}
          isActive={activeIndex === index}
          onEnter={() => setActiveIndex(index)}
        />
      ))}
    </main>
  );
}
