import React, { useEffect, useRef } from 'react';
import colomboImg from '../assets/colombo.jpg';
import musicImg from '../assets/music.jpg';

const GetToKnowMe = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !trackRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const stickyHeight = window.innerHeight;
      
      // Calculate how far we've scrolled inside the section (0 to 1)
      // starts when section enters top, ends when section bottom hits viewport bottom
      const totalScrollable = sectionHeight - stickyHeight;
      const currentScroll = -rect.top;
      
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
      
      // Calculate max horizontal move
      const trackWidth = trackRef.current.scrollWidth;
      const maxMove = trackWidth - window.innerWidth;
      
      if (rect.top <= 0 && rect.bottom >= stickyHeight) {
        trackRef.current.style.transform = `translateX(${-progress * maxMove}px)`;
      } else if (rect.top > 0) {
        trackRef.current.style.transform = `translateX(0px)`;
      } else if (rect.bottom < stickyHeight) {
        trackRef.current.style.transform = `translateX(${-maxMove}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="know" ref={sectionRef}>
      <div className="know-sticky">
        <div className="know-header">
           <h2 className="know-hl">Get to Know Me</h2>
           <p className="know-sub">A glimpse into my world beyond code.</p>
        </div>
        <div className="know-track" ref={trackRef}>
            {/* Panel 1: Born & Raised */}
            <div className="know-panel">
               <div className="kp-left">
                  <div className="kp-header">
                    <div className="kp-text-large">Born & Raised in Sri Lanka.</div>
                  </div>
                  <div className="kp-text-mid">Colombo is my hometown. A city of culture and rapid growth.</div>
               </div>
               <div className="kp-right">
                  <div className="kp-photo tilt-left">
                     <img src={colomboImg} alt="Colombo City" />
                  </div>
               </div>
            </div>

            {/* Panel 2: Music */}
            <div className="know-panel">
               <div className="kp-left">
                  <div className="kp-header">
                    <div className="kp-text-large">Music is my escape.</div>
                  </div>
                  <div className="kp-text-mid">From Alt-Rock to Metal, these are the bands that keep me going.</div>
               </div>
               <div className="kp-right">
                  <div className="kp-photo tilt-right">
                     <img src={musicImg} alt="My Music Collection" />
                  </div>
               </div>
            </div>
            
            <div className="know-glow"></div>
        </div>
      </div>
    </section>
  );
};

export default GetToKnowMe;
