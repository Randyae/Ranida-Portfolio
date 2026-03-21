import React, { useState, useEffect, useRef } from 'react';
import profileImg from '../assets/profile.jpg';

const Manifesto = () => {
  const [years, setYears] = useState(0);
  const [projects, setProjects] = useState(0);
  const sectionRef = useRef(null);
  const photoRef = useRef(null);
  const hasAnimated = useRef(false);

  const words = [
    "For", "me,", "engineering", "means", "clean", "architecture,", "scalable", "systems,", "and", "relentless", "attention", "to", "detail.", 
    "Ship", "fast.", "On", "spec.", "On", "deadline.", "Bring", "ideas", "and", "technical", "decisions", "grounded", "in", "software", "principles.", 
    "Performance", "and", "developer", "experience", "are", "my", "key", "tools", "to", "bring", "products", "alive.", 
    "Building", "my", "own", "projects", "and", "open", "to", "new", "collaborations."
  ];

  useEffect(() => {
    const handleScroll = () => {
      const wordEls = document.querySelectorAll('.mw');
      const vh = window.innerHeight;
      let litCount = 0;

      wordEls.forEach(w => {
        if (w.getBoundingClientRect().top < vh * 0.75) {
          w.classList.add('lit');
          litCount++;
        } else {
          w.classList.remove('lit');
        }
      });

      if (photoRef.current) {
        if (litCount > 4) photoRef.current.classList.add('show');
        else photoRef.current.classList.remove('show');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Intersection Observer for Counters
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        animateValue(setYears, 0, 2, 1600);
        animateValue(setProjects, 0, 5, 2000);
      }
    }, { threshold: 0.4 });

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const animateValue = (setter, start, end, duration) => {
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setter(Math.round(ease * (end - start) + start));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <section id="manifesto" ref={sectionRef}>
      <div className="mf-label rv">Manifesto</div>
      <div className="mf-cols">
        <div>
          <div className="mf-text">
            {words.map((word, i) => (
              <span key={i} className="mw">{word} </span>
            ))}
          </div>
          <div className="mf-stats rv d3">
            <div>
              <span className="stat-n">{years}+</span>
              <span className="stat-l">Years experience<br />in full-stack<br />development</span>
            </div>
            <div>
              <span className="stat-n">{projects}+</span>
              <span className="stat-l">Projects<br />I worked on</span>
            </div>
          </div>
        </div>
        <div className="mf-photo-col" ref={photoRef}>
          <div className="mf-photo-wrapper">
            <img src={profileImg} alt="Ranida Perera" className="mf-img" />
          </div>
          <div className="mf-photo-cap">Ranida Perera &middot; Colombo, LK</div>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
