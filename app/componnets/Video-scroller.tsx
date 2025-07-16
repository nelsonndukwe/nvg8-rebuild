// VideoScroller.tsx
import { useRef, useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

export default function VideoScroller({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = gsap.utils.toArray(container.querySelectorAll('[data-scroll-section]'));

    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      {children.map(children, (child, index) =>
        React.cloneElement(child as any, { isActive: activeIndex === index })
      )}
    </div>
  );
}
