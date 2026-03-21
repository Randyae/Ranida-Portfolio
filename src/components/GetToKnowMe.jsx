import React, { useEffect, useRef } from 'react';
import colomboImg from '../assets/colombo.jpg';
import musicImg from '../assets/music.jpg';
import careerImg from '../assets/career.jpg';
import hobbiesImg from '../assets/hobbies.jpg';
import quoteImg from '../assets/quote.jpg';

const GetToKnowMe = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !trackRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const stickyHeight = window.innerHeight;

      const totalScrollable = sectionHeight - stickyHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));

      const numPanels = 5;
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

  const handleMouseMove = (e) => {
    const panel = e.currentTarget;
    const { left, top, width, height } = panel.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - top) / height - 0.5; // -0.5 to 0.5

    const photo = panel.querySelector('.kp-photo');
    if (photo) {
      photo.style.transition = 'transform 0.1s ease-out, box-shadow 0.1s ease-out';
      photo.style.transform = `perspective(1000px) rotateX(${-y * 20}deg) rotateY(${x * 20}deg) scale(1.05) translateY(-5px)`;
      photo.style.boxShadow = `${-x * 30}px ${-y * 30 + 20}px 70px rgba(0, 0, 0, 0.7), 0 0 50px rgba(250, 49, 34, 0.15)`;
      photo.style.zIndex = '10';
    }
  };

  const handleMouseLeave = (e) => {
    const panel = e.currentTarget;
    const photo = panel.querySelector('.kp-photo');
    if (photo) {
      photo.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      photo.style.transform = '';
      photo.style.boxShadow = '';
      photo.style.zIndex = '1';
    }
  };

  return (
    <section id="know" ref={sectionRef} style={{ height: '600vh' }}>      <div className="know-sticky">
      <div className="know-glow"></div>
      <div className="know-track" ref={trackRef}>

        {/* Panel 1: Colombo */}
        <div className="know-panel rv" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <div className="kp-left">
            <div className="kp-header">
              <h2 className="know-hl">GET TO KNOW ME</h2>
              <div className="know-sub">(a little better)</div>
            </div>
            <div className="kp-text-large mt-auto">
              Born, raised and based in<br />
              Colombo, Sri Lanka
            </div>
          </div>
          <div className="kp-right">
            <div className="kp-photo tilt-left">
              <img src={colomboImg} alt="Colombo" />
            </div>
          </div>
        </div>

        {/* Panel 2: Career */}
        <div className="know-panel rv" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <div className="kp-left center-content">
            <div className="kp-text-mid">
              Began my journey in full-stack web development during my university studies.
            </div>
          </div>
          <div className="kp-right">
            <div className="kp-photo tilt-right">
              <img src={hobbiesImg} alt="Classroom" />
            </div>
          </div>
        </div>

        {/* Panel 3: Music (with new image) */}
        <div className="know-panel rv" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <div className="kp-left center-content">
            <div className="kp-text-mid">
              Without music, life would be a mistake, best music band of all time?
            </div>
          </div>
          <div className="kp-right">
            <div className="kp-photo tilt-left music-photo">
              <img src={musicImg} alt="Music" />
            </div>
          </div>
        </div>

        {/* Panel 4: Hobbies */}
        <div className="know-panel rv" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <div className="kp-left center-content">
            <div className="kp-text-mid">
              As a developer, free time is limited but when I get a break, I enjoy playing the guitar.
            </div>
          </div>
          <div className="kp-right">
            <div className="kp-photo tilt-right">
              <img src={careerImg} alt="Guitar" />
            </div>
          </div>
        </div>

        {/* Panel 5: Quote */}
        <div className="know-panel rv" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <div className="kp-left center-content">
            <div className="kp-text-mid">
              Best Motivational quote from Movie - You either die a hero or live long enough to see yourself become the villain.
            </div>
          </div>
          <div className="kp-right">
            <div className="kp-photo tilt-left">
              <img src={quoteImg} alt="Harvey Dent" />
            </div>
          </div>
        </div>

      </div>
    </div>
    </section>
  );
};

export default GetToKnowMe;
