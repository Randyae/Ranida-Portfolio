import React, { useState, useEffect } from 'react';

const Contact = () => {
  const [time, setTime] = useState('--:--');

  useEffect(() => {
    const tick = () => {
      setTime(new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Colombo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    };
    
    tick(); // initial call
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="contact">
      <h2 className="projects-hl rv">Get In Touch</h2>
      <div className="contact-hl-group rv d1">
        <div className="contact-hl">
          <a href="mailto:ranidaperera1@gmail.com">ranidaperera1@<br/>gmail.com</a>
        </div>
        <div className="contact-big-links">
          <a href="https://github.com/Randyae" target="_blank" rel="noopener noreferrer">GitHub &#8599;</a>
          <a href="https://www.linkedin.com/in/ranida-perera" target="_blank" rel="noopener noreferrer">LinkedIn &#8599;</a>
        </div>
      </div>
      <div className="contact-row rv d2">
        <div className="contact-time">Colombo, LK &middot; <span id="ctime">{time}</span></div>
      </div>
    </section>
  );
};

export default Contact;
