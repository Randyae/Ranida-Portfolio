import React from 'react';

const ServiceItem = ({ num, name, tag, desc, delay }) => (
  <div className={`svc ${delay}`}>
    <div className="svc-header">
      <span className="svc-num">{num}</span>
      <span className="svc-name">{name}</span>
      <div className="svc-icon">+</div>
    </div>
    <div className="svc-body">
      <div className="svc-body-inner">
        <div>
          <span className="svc-counter">{num}</span>
          <span className="svc-tag">{tag}</span>
        </div>
        <div className="svc-desc">
          {desc.split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Services = () => {
  return (
    <section id="services">
      <h2 className="services-hl rv">What I Do</h2>
      <div className="svc-list">
        <ServiceItem 
          num="01" 
          name="Frontend Engineering" 
          tag="React · Next.js · TypeScript" 
          desc={"I build pixel-perfect, high-performance user interfaces with a strong focus on accessibility, smooth animations, and Core Web Vitals.\nExperienced in SSR, SSG, and ISR—selecting the right rendering approach for each project.\nI create scalable component libraries, design systems, and turn Figma designs into clean, production-ready code."}
          delay="rv"
        />
        <ServiceItem 
          num="02" 
          name="Backend & API Development" 
          tag="Node.js · PHP · GraphQL · Databases" 
          desc={"I design and build scalable, efficient backend systems and APIs.\nSkilled in Node.js, Express, PHP, GraphQL, and RESTful architecture.\nExperience working with SQL and NoSQL databases, including MongoDB and MariaDB, to build reliable data-driven applications.\nFocused on clean architecture, performance, and maintainability."}
          delay="rv d1"
        />
        <ServiceItem 
          num="03" 
          name="UI/UX Thinking" 
          tag="Figma · UX · Design Systems" 
          desc={"I craft intuitive, user-centered interfaces with a focus on usability, accessibility, and visual clarity.\nFrom wireframes to high-fidelity designs, I ensure every interface balances function with aesthetics."}
          delay="rv d2"
        />
      </div>
    </section>
  );
};

export default Services;
