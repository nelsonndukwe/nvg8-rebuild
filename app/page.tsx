import LastScrollVideoSection from "./componnets/scrollvideo-lastsection";
import ScrollVideoSection from "./componnets/scrollvideo-section";
import { scrollVideoData } from "./data";

export default function Home() {
  return (
    <div className="relative flex  w-screen ">
      {/* Absolute stack container */}
      <div className="flex flex-col ">
        {scrollVideoData.map((video, index) => (
            <ScrollVideoSection
              key={index}
              index={video.key}
              name={video.name}
              scrollVideoSrc={video.scrollVideoSrc}
              loopVideoSrc={video.loopVideoSrc}
            />
        ))}
      </div>
    </div>
  );
}
