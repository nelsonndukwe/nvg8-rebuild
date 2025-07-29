import LastScrollVideoSection from "./componnets/scrollvideo-lastsection";
import ScrollVideoSection from "./componnets/scrollvideo-section";
import { scrollVideoData } from "./data";

export default function Home() {
  return (
    <div className="relative h-screen w-screen">
      {/* Absolute stack container */}
      <div className="">
        {scrollVideoData.map((video, index) => (
          <div key={index} >
            <ScrollVideoSection
              index={video.key}
              name={video.name}
              scrollVideoSrc={video.scrollVideoSrc}
              loopVideoSrc={video.loopVideoSrc}
            />
          </div>
        ))}
        {/* <LastScrollVideoSection /> */}
      </div>
    </div>
  );
}
