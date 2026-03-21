import React from 'react';

const Marquee = () => {
  return (
    <div className="mq">
      <div className="mq-track">
        <span className="mq-item">Ranida Perera</span><span className="mq-sep">/</span>
        <span className="mq-item">Full Stack Developer</span><span className="mq-sep">/</span>
        <span className="mq-item">Welcome to</span><span className="mq-sep">/</span>
        <span className="mq-item">My Portfolio</span><span className="mq-sep">/</span>
        <span className="mq-item">Colombo, Sri Lanka</span><span className="mq-sep">/</span>
        <span className="mq-item">React &middot; Next.js &middot; Node.js</span><span className="mq-sep">/</span>
        {/* Duplicate for seamless loop */}
        <span className="mq-item">Ranida Perera</span><span className="mq-sep">/</span>
        <span className="mq-item">Full Stack Developer</span><span className="mq-sep">/</span>
        <span className="mq-item">Welcome to</span><span className="mq-sep">/</span>
        <span className="mq-item">My Portfolio</span><span className="mq-sep">/</span>
        <span className="mq-item">Colombo, Sri Lanka</span><span className="mq-sep">/</span>
        <span className="mq-item">React &middot; Next.js &middot; Node.js</span><span className="mq-sep">/</span>
      </div>
    </div>
  );
};

export default Marquee;
