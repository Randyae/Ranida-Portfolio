import React, { useState, useEffect, useRef } from 'react';

const Hero = ({ heroMainRef, greetingRef, blobRef }) => {
  const [greeting, setGreeting] = useState('HELLO');
  const [isVivid, setIsVivid] = useState(true);
  const greetings = ['HELLO', 'HOLA', 'ΓΕΙΑ', 'こんにちは', 'مرحبا', 'BONJOUR', 'CIAO', 'HALLO', 'OLA'];

  useEffect(() => {
    let gi = 0;
    const gInterval = setInterval(() => {
      setIsVivid(false);
      setTimeout(() => {
        setGreeting(greetings[(gi + 1) % greetings.length]);
        gi = (gi + 1) % greetings.length;
        setIsVivid(true);
      }, 500);
    }, 2400);

    return () => clearInterval(gInterval);
  }, []);

  return (
    <section id="hero">
      <div className="blob" ref={blobRef}></div>
      <div className="hero-content">
        <div className="hero-row-one">
          <span className={`hero-greeting ${isVivid ? 'vivid' : ''}`} ref={greetingRef}>
            {greeting}
          </span>
          <span className="hero-comma">,</span> I AM RANIDA
        </div>
        <span className="hero-main" ref={heroMainRef}>
          A FULL STACK DEVELOPER<br />
          BASED IN COLOMBO, SRI LANKA
        </span>
      </div>
    </section>
  );
};

export default Hero;
