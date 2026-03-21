import React from 'react';
import mindwaveImg from '../assets/mindwave.png';
import flapImg from '../assets/flap.png';
import estateImg from '../assets/estate.png';

const ProjectCard = ({ title, sub, img, tall, wide, delay, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" className={`proj-card ${tall ? 'tall' : ''} ${wide ? 'wide' : ''} rv ${delay || ''}`}>
    <img className="proj-img" src={img} alt={title} />
    <div className="proj-overlay"></div>
    <div className="proj-info">
      <div className="proj-title">{title}</div>
      <div className="proj-sub">{sub}</div>
    </div>
    <div className="proj-arr">&#8599;</div>
  </a>
);

const Projects = () => {
  return (
    <section id="projects">
      <h2 className="projects-hl rv">Selected Works</h2>
      <div className="proj-list">
        <div className="proj-row one">
          <ProjectCard 
            title="MindWave" 
            sub="React Native · Node · Express · Firebase" 
            img={mindwaveImg} 
            link="https://mindwave-app.com/"
            tall
            delay="rv"
          />
        </div>
        <div className="proj-row two">
          <ProjectCard 
            title="Flap Yourself" 
            sub="HTML · CSS · JS" 
            img={flapImg} 
            link="https://randynutzz.github.io/flap-yourself/"
            delay="rv d1"
          />
          <ProjectCard 
            title="Estate Agent Search" 
            sub="React Native · CSS · HTML · JS" 
            img={estateImg} 
            link="https://randynutzz.github.io/estate-agent-react/"
            delay="rv d2"
          />
        </div>
      </div>
    </section>
  );
};

export default Projects;
