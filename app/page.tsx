import ScrollVideoSection from "./componnets/scrollvideo-section";

export default function Home() {
  return (
    <div className="">
      <ScrollVideoSection
        scrollVideoSrc="videos/NAVIGATE_4K_S10-scrolly@sm.mp4"
        loopVideoSrc="videos/NAVIGATE_4K_S10_loop@sm.mp4"
      />

      <ScrollVideoSection
        scrollVideoSrc="videos/NAVIGATE_4K_S20-scrolly@sm.mp4"
        loopVideoSrc="videos/NAVIGATE_4K_S20_loop@sm.mp4"
      />
      <ScrollVideoSection
        scrollVideoSrc="videos/NAVIGATE_4K_S25-scrolly@sm.mp4"
        loopVideoSrc="videos/NAVIGATE_4K_S25_loop@sm.mp4"
      />
      <ScrollVideoSection
        scrollVideoSrc="videos/NAVIGATE_4K_S30-scrolly@sm.mp4"
        loopVideoSrc="videos/NAVIGATE_4K_S30_loop@sm.mp4"
      />
      <ScrollVideoSection
        scrollVideoSrc="videos/NAVIGATE_4K_S35-scrolly@sm.mp4"
        loopVideoSrc="videos/NAVIGATE_4K_S35_loop@sm.mp4"
      />
      <ScrollVideoSection
        scrollVideoSrc="videos/NAVIGATE_4K_S40-scrolly@sm.mp4"
        loopVideoSrc="videos/NAVIGATE_4K_S40_loop@sm.mp4"
      />
      <ScrollVideoSection
        // scrollVideoSrc="videos/NAVIGATE_4K_S50-scrolly@sm.mp4"
        loopVideoSrc="videos/NAVIGATE_4K_S50_loop@sm.mp4"
      />
    </div>
  );
}
