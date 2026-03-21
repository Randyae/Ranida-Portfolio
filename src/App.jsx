import React, { useState, useEffect, useRef } from 'react';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Manifesto from './components/Manifesto';
import TechMarquee from './components/TechMarquee';
import Services from './components/Services';
import Projects from './components/Projects';

function App() {
  const [lightMode, setLightMode] = useState(false);
  
  const curRef = useRef(null);
  const cur2Ref = useRef(null);
  const blobRef = useRef(null);
  const heroMainRef = useRef(null);
  const greetingRef = useRef(null);

  useEffect(() => {
    // ── CURSOR & BLOB PARALLAX (Mouse Events) ────────────
    let mx = -200, my = -200, rx = -200, ry = -200;
    
    const handleMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (curRef.current) {
        curRef.current.style.left = mx + 'px';
        curRef.current.style.top = my + 'px';
      }
      
      if (blobRef.current) {
        const x = (e.clientX / window.innerWidth - .5) * 28;
        const y = (e.clientY / window.innerHeight - .5) * 20;
        blobRef.current.style.transform = `translateY(calc(-50% + ${y}px)) translateX(${x}px)`;
      }
    };

    const loop = () => {
      rx += (mx - rx) * .11;
      ry += (my - ry) * .11;
      if (cur2Ref.current) {
        cur2Ref.current.style.left = rx + 'px';
        cur2Ref.current.style.top = ry + 'px';
      }
      requestAnimationFrame(loop);
    };

    document.addEventListener('mousemove', handleMouseMove);
    const animationFrame = requestAnimationFrame(loop);

    const handleHoverEnter = () => document.body.classList.add('hov');
    const handleHoverLeave = () => document.body.classList.remove('hov');
    
    // Only target nav links and hero for initial hove interaction
    const interactiveEls = document.querySelectorAll('a, button');
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', handleHoverEnter);
      el.addEventListener('mouseleave', handleHoverLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
      interactiveEls.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverEnter);
        el.removeEventListener('mouseleave', handleHoverLeave);
      });
    };
  }, []);

  useEffect(() => {
    // ── SCROLL EFFECTS (Nav, Hero Parallax) ────────────
    const handleScroll = () => {
      const y = window.scrollY;
      
      const nav = document.getElementById('nav');
      if (nav) nav.classList.toggle('solid', y > 50);

      // Hero Parallax (Refs passed to Hero)
      if (heroMainRef.current) {
        heroMainRef.current.style.transform = `translateY(${y * .2}px)`;
      }
      if (greetingRef.current) {
        greetingRef.current.style.transform = `translateY(${y * .35}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ── REVEAL OBSERVER ────────────────────────────────
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: .07 });

    document.querySelectorAll('.rv, .rv2').forEach((el) => revealObs.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      revealObs.disconnect();
    };

  }, []);

  useEffect(() => {
    document.body.classList.toggle('light', lightMode);
  }, [lightMode]);

  return (
    <div className={`app-root ${lightMode ? 'light' : ''}`}>
      <Loader />
      
      <div id="cur" ref={curRef}></div>
      <div id="cur2" ref={cur2Ref}></div>

      <Navbar lightMode={lightMode} setLightMode={setLightMode} />

      <Hero 
        heroMainRef={heroMainRef} 
        greetingRef={greetingRef} 
        blobRef={blobRef} 
      />

      <Marquee />
      <Manifesto />
      <TechMarquee />
      <Services />
      <Projects />
    </div>
  );
}




export default App;
