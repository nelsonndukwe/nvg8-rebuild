import LastScrollVideoSection from "./componnets/scrollvideo-lastsection";
import ScrollVideoSection from "./componnets/scrollvideo-section";
import { scrollVideoData } from "./data";

export default function Home() {
  return (
    <div className="relative w-screen h-[4000vh]">
    {/* Absolute stack container */}
    <div className="sticky top-0 left-0">
      {scrollVideoData.map((video, index) => (
        <ScrollVideoSection
          key={index}
          index={video.key}
          name={video.name}
          scrollVideoSrc={video.scrollVideoSrc}
          loopVideoSrc={video.loopVideoSrc}
        />
      ))}
      <LastScrollVideoSection />
    </div>
  </div>
  
  );
}
