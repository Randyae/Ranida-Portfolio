import Loader from './components/Loader';
import Hero from './components/Hero';

function App() {
  const [lightMode, setLightMode] = useState(false);
  const [colomboTime, setColomboTime] = useState('--:--');
  
  const curRef = useRef(null);
  const cur2Ref = useRef(null);
  const blobRef = useRef(null);
  const heroMainRef = useRef(null);
  const greetingRef = useRef(null);
  const knowSectionRef = useRef(null);
  const knowTrackRef = useRef(null);

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
    
    const interactiveEls = document.querySelectorAll('a, button, .svc, .proj-card, .kf');
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
    // ── SCROLL EFFECTS (Nav, Parallax, Word Reveal, Horizontal Scroll) ──
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
      
      const words = document.querySelectorAll('.mw');
      const photo = document.getElementById('mfPhoto');
      const vh = window.innerHeight;
      let litCount = 0;

      words.forEach(w => {
        if (w.getBoundingClientRect().top < vh * 0.75) {
          w.classList.add('lit');
          litCount++;
        } else {
          w.classList.remove('lit');
        }
      });

      if (photo) {
        if (litCount > 4) photo.classList.add('show');
        else photo.classList.remove('show');
      }

      const knowSection = knowSectionRef.current;
      const knowTrack = knowTrackRef.current;
      if (knowSection && knowTrack) {
        const sectionTop = knowSection.offsetTop;
        const scrollableDistance = knowSection.offsetHeight - window.innerHeight;
        let progress = 0;

        if (y >= sectionTop && y <= sectionTop + scrollableDistance) {
          progress = (y - sectionTop) / scrollableDistance;
        } else if (y > sectionTop + scrollableDistance) {
          progress = 1;
        }

        progress = Math.max(0, Math.min(1, progress));
        const numPanels = knowTrack.children.length;
        const maxTranslate = -100 * ((numPanels - 1) / numPanels);
        knowTrack.style.transform = `translate3d(${progress * maxTranslate}%, 0, 0)`;

        const wW = window.innerWidth;
        for (let i = 0; i < numPanels; i++) {
          const panel = knowTrack.children[i];
          const rect = panel.getBoundingClientRect();
          const centerDist = (rect.left + rect.width / 2) - (wW / 2);
          const normalizedDist = centerDist / wW;

          const photoImg = panel.querySelector('.kp-photo img');
          if (photoImg) {
            photoImg.style.transform = `translate3d(${normalizedDist * -20}%, 0, 0) scale(1.1)`;
          }

          const textBlock = panel.querySelector('.kp-left');
          if (textBlock && i > 0) {
            let opacity = 1 - Math.abs(normalizedDist) * 1.5;
            opacity = Math.max(0, Math.min(1, opacity));
            const translateY = normalizedDist * 80;
            textBlock.style.opacity = opacity;
            textBlock.style.transform = `translate3d(0, ${translateY}px, 0)`;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: .07 });

    document.querySelectorAll('.rv, .rv2').forEach((el) => revealObs.observe(el));

    const countUp = (el, target, suffix, duration) => {
      let start = null;
      const step = (ts) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        if (el) el.textContent = Math.round(ease * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          countUp(document.getElementById('cnt-y'), 5, '+', 1600);
          countUp(document.getElementById('cnt-p'), 30, '+', 2000);
          counterObs.disconnect();
        }
      });
    }, { threshold: .4 });

    const counterTarget = document.getElementById('cnt-y');
    if (counterTarget) counterObs.observe(counterTarget);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      revealObs.disconnect();
      counterObs.disconnect();
    };
  }, []);

  // ── TIME ──────────────────────────────────────────────
  useEffect(() => {
    const tick = () => {
      setColomboTime(new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Colombo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    };
    tick();
    const tInterval = setInterval(tick, 1000);
    return () => clearInterval(tInterval);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('light', lightMode);
  }, [lightMode]);

  return (
    <div className={`app-root ${lightMode ? 'light' : ''}`}>
      <Loader />
      
      <div id="cur" ref={curRef}></div>
      <div id="cur2" ref={cur2Ref}></div>

      <nav id="nav">
        <div className="nav-logo">Ranida Perera</div>
        <ul className="nav-links">
          <li><a href="#manifesto">Manifesto</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div className="nav-right">
          <div className="nav-mode" onClick={() => setLightMode(!lightMode)}>
            {lightMode ? '\u25CF Mode' : '\u25D0 Mode'}
          </div>
        </div>
      </nav>

      <a href="#projects" className="edge-w">W.</a>

      <Hero 
        heroMainRef={heroMainRef} 
        greetingRef={greetingRef} 
        blobRef={blobRef} 
      />


      {/* ── MARQUEE ───────────────────────────────────────── */}
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

      {/* ── MANIFESTO ────────────────────────────────────── */}
      <section id="manifesto">
        <div className="mf-label rv">Manifesto</div>
        <div className="mf-cols">
          <div>
            <div className="mf-text" id="mfText">
              {["For", "me,", "engineering", "means", "clean", "architecture,", "scalable", "systems,", "and", "relentless", "attention", "to", "detail.", "Ship", "fast.", "On", "spec.", "On", "deadline.", "Bring", "ideas", "and", "technical", "decisions", "grounded", "in", "software", "principles.", "Performance", "and", "developer", "experience", "are", "my", "key", "tools", "to", "bring", "products", "alive.", "Building", "my", "own", "projects", "and", "open", "to", "new", "collaborations."].map((word, i) => (
                <span key={i} className="mw">{word} </span>
              ))}
            </div>
            <div className="mf-stats rv d3">
              <div>
                <span className="stat-n" id="cnt-y">0</span>
                <span className="stat-l">Years experience<br />in full-stack<br />development</span>
              </div>
              <div>
                <span className="stat-n" id="cnt-p">0</span>
                <span className="stat-l">Projects<br />I worked on</span>
              </div>
            </div>
          </div>
          <div className="mf-photo-col" id="mfPhoto">
            <img src={profileImg} alt="Ranida Perera" />
            <div className="mf-photo-cap">Ranida Perera &middot; Colombo, LK</div>
          </div>
        </div>
      </section>

      {/* ── TECH ICONS MARQUEE ───────────────────────────── */}
      <div className="tech-mq">
        <div className="tech-mq-inner">
          <TechIcons />
          <TechIcons /> {/* Duplicate */}
        </div>
      </div>

      {/* ── WHAT I DO ───────────────────────────────────── */}
      <section id="services">
        <h2 className="services-hl rv">What I Do</h2>
        <div className="svc-list">
          <ServiceItem 
            num="01" 
            name="Frontend Engineering" 
            tag="React · Next.js · TypeScript" 
            desc="Pixel-perfect, high-performance UIs. React & Next.js, with a focus on animation, accessibility, and Core Web Vitals. SSR, SSG, ISR — whatever the page demands." 
            delay="rv"
          />
          <ServiceItem 
            num="02" 
            name="Backend & API" 
            tag="Node.js · GraphQL · PostgreSQL" 
            desc="Scalable, secure server-side systems. Node.js, Express, GraphQL, REST. PostgreSQL, MongoDB, Redis. Auth, WebSockets, third-party integrations — Stripe, S3, SendGrid and more." 
            delay="rv d1"
          />
          <ServiceItem 
            num="03" 
            name="Infrastructure & DevOps" 
            tag="Docker · AWS · CI/CD" 
            desc="From code to production without drama. Docker, AWS, Vercel, Railway. CI/CD with GitHub Actions. Monitoring, error tracking, performance tuning, auto-scaling." 
            delay="rv d2"
          />
        </div>
      </section>

      {/* ── PROJECTS ──────────────────────────────────────── */}
      <section id="projects">
        <h2 className="projects-hl rv">Projects</h2>
        <div className="proj-list">
          <div className="proj-row one">
            <ProjectCard 
              tall 
              title="NexaFlow" 
              sub="SaaS Platform · Next.js · Node.js · PostgreSQL · TypeScript" 
              img="https://picsum.photos/seed/nexaflow2/1200/700"
            />
          </div>
          <div className="proj-row two">
            <ProjectCard 
              delay="d1"
              title="Pulse Analytics" 
              sub="Dashboard · React · GraphQL · MongoDB" 
              img="https://picsum.photos/seed/pulse42/700/600"
            />
            <ProjectCard 
              delay="d2"
              title="GreenCart" 
              sub="E-Commerce · Next.js · Stripe · Prisma · AWS" 
              img="https://picsum.photos/seed/greencart7/700/600"
            />
          </div>
          <div className="proj-row one">
            <ProjectCard 
              wide 
              title="UniConnect" 
              sub="Social Platform · React · Express · MongoDB · Socket.io" 
              img="https://picsum.photos/seed/uniconnect9/1200/500"
            />
          </div>
        </div>
      </section>

      {/* ── GET TO KNOW ME ────────────────────────────────── */}
      <section id="know" ref={knowSectionRef}>
        <div className="know-sticky">
          <div className="know-glow"></div>
          <div className="know-track" ref={knowTrackRef}>
            <KnowPanel 
              title="GET TO KNOW ME" 
              sub="(a little better)" 
              text={<>Born, raised and based in<br />Colombo, Sri Lanka</>}
              img="https://picsum.photos/seed/colombocity2/800/1000"
              tilt="tilt-left"
            />
            <KnowPanel 
              midText="Started my career as a web developer during my university studies"
              img="https://picsum.photos/seed/developerdesk/800/1000"
              tilt="tilt-right"
            />
            <KnowPanel 
              midText="Without music, life would be a mistake, best music band of all time?"
              img="https://picsum.photos/seed/guitarsolo/800/1000"
              tilt="tilt-left"
            />
            <KnowPanel 
              midText="I'm a developer that means that there is no free Time but sometimes you will find me watching Football or Painting"
              img="https://picsum.photos/seed/footballpainting/800/1000"
              tilt="tilt-right"
            />
            <KnowPanel 
              midText="Best Motivational quote from Movie - It ain't about how hard you can hit it's about how hard you can get hit and keep moving forward."
              img="https://picsum.photos/seed/rockybalboamovie/800/1000"
              tilt="tilt-left"
            />
          </div>
        </div>
        <div className="know-signoff rv">
          That's All Folks!<br />Thank you for Scrolling &#10033;
        </div>
      </section>

      {/* ── CONTACT ────────────────────────────────────────── */}
      <section id="contact">
        <h2 className="projects-hl rv">Get In Touch</h2>
        <div className="contact-hl-group rv d1">
          <div className="contact-hl">
            <a href="mailto:ranidaperera1@gmail.com">ranidaperera1@<br />gmail.com</a>
          </div>
          <div className="contact-big-links">
            <a href="https://github.com/RandyNutzz" target="_blank" rel="noopener noreferrer">GitHub &#8599;</a>
            <a href="https://www.linkedin.com/in/ranida-perera" target="_blank" rel="noopener noreferrer">LinkedIn &#8599;</a>
          </div>
        </div>
        <div className="contact-row rv d2">
          <div className="contact-time">Colombo, LK &middot; <span>{colomboTime}</span></div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="marquee-footer">
        <div className="marquee-track-main">
          <FooterContent />
          <FooterContent ariaHidden />
        </div>
      </footer>
    </div>
  );
}

// ── SUB-COMPONENTS ──────────────────────────────────────

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
        <p className="svc-desc">
          <strong>{desc.split('.')[0]}.</strong>
          {desc.split('.').slice(1).join('.')}
        </p>
      </div>
    </div>
  </div>
);

const ProjectCard = ({ title, sub, img, tall, wide, delay }) => (
  <div className={`proj-card ${tall ? 'tall' : ''} ${wide ? 'wide' : ''} rv ${delay || ''}`}>
    <img className="proj-img" src={img} alt={title} />
    <div className="proj-overlay"></div>
    <div className="proj-info">
      <div className="proj-title">{title}</div>
      <div className="proj-sub">{sub}</div>
    </div>
    <div className="proj-arr">&#8599;</div>
  </div>
);

const KnowPanel = ({ title, sub, text, midText, img, tilt }) => (
  <div className={`know-panel rv`}>
    <div className={`kp-left ${midText ? 'center-content' : ''}`}>
      {title && (
        <div className="kp-header">
          <h2 className="know-hl">{title}</h2>
          <div className="know-sub">{sub}</div>
        </div>
      )}
      {text && <div className="kp-text-large mt-auto">{text}</div>}
      {midText && <div className="kp-text-mid">{midText}</div>}
    </div>
    <div className="kp-right">
      <div className={`kp-photo ${tilt}`}>
        <img src={img} alt="Detail" />
      </div>
    </div>
  </div>
);

const TechIcons = () => (
  <>
    <span className="tech-mq-item">
      <svg viewBox="-11.5 -10.23174 23 20.46348" fill="none">
        <circle r="2.05" fill="#61DAFB" />
        <ellipse stroke="#61DAFB" strokeWidth="1" rx="11" ry="4.2" />
        <ellipse stroke="#61DAFB" strokeWidth="1" rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse stroke="#61DAFB" strokeWidth="1" rx="11" ry="4.2" transform="rotate(120)" />
      </svg>
    </span>
    <span className="tech-mq-sep">&#10033;</span>
    <span className="tech-mq-item">
      <svg viewBox="0 0 630 630">
        <rect width="630" height="630" fill="#f7df1e" />
        <path d="M423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.1-41-71.1-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.2-21.1-25.37-38.1-25.37-17.34 0-28.33 11-28.33 25.37 0 17.76 11 24.95 36.4 35.95l14.8 6.34c50.3 21.57 78.7 43.56 78.7 93 0 53.3-41.87 82.5-98.1 82.5-54.98 0-90.5-26.2-107.88-60.54zm-209.13 5.13c9.3 16.5 17.76 30.45 37.94 30.45 19.4 0 31.66-7.61 31.66-37.2v-201.3h59.2v202.1c0 61.3-35.94 89.2-88.4 89.2-47.4 0-74.85-24.53-88.81-54.075z" />
      </svg>
    </span>
    <span className="tech-mq-sep">&#10033;</span>
    <span className="tech-mq-item">
      <svg viewBox="0 0 256 289">
        <path fill="#539E43" d="M128 288.464c-3.975 0-7.685-1.06-11.13-2.915l-35.247-20.936c-5.3-2.915-2.65-3.975-1.06-4.505 7.155-2.385 8.48-2.915 15.9-7.156.795-.53 1.856-.265 2.65.265l27.032 16.166c1.06.53 2.385.53 3.18 0l105.74-61.217c1.06-.53 1.59-1.59 1.59-2.915V83.08c0-1.325-.53-2.385-1.59-2.915L128.927 18.948c-1.06-.53-2.385-.53-3.18 0L20.01 80.165c-1.06.53-1.59 1.856-1.59 2.915v122.433c0 1.06.53 2.385 1.59 2.915l28.887 16.695c15.635 7.95 25.44-1.325 25.44-10.6V94.475c0-1.59 1.325-3.18 3.18-3.18h13.516c1.59 0 3.18 1.325 3.18 3.18V214.513c0 20.936-11.395 32.861-31.271 32.861-6.095 0-10.865 0-24.38-6.625L9.145 222.728C3.58 219.548 0 213.718 0 207.358V84.934c0-6.36 3.58-12.19 9.145-15.37L119.59 8.348c5.3-2.915 12.455-2.915 17.755 0l110.51 61.216c5.565 3.18 9.145 9.01 9.145 15.37V207.358c0 6.36-3.58 12.19-9.145 15.37l-110.51 61.481c-3.18 1.59-7.155 2.255-11.13 2.255z" />
      </svg>
    </span>
    <span className="tech-mq-sep">&#10033;</span>
    <span className="tech-mq-item">
      <svg viewBox="0 0 256 256">
        <rect width="256" height="256" rx="60" fill="#007acc" />
        <path fill="#fff" d="M56 136v-18h144v18H56zm0 36v-18h144v18H56zm0-72v-18h144v18H56z" />
      </svg>
    </span>
    <span className="tech-mq-sep">&#10033;</span>
    <span className="tech-mq-item">
      <svg viewBox="0 0 256 255">
        <path fill="#3572A5" d="M126.9 0C60.15 0 64.09 28.25 64.09 28.25L64.16 57.6h63.86v8.9H40.05S0 61.89 0 129.2c0 67.3 37.24 64.9 37.24 64.9h22.23v-31.22s-1.2-37.24 36.64-37.24h63.14s35.44.57 35.44-34.25V34.27S200.3 0 126.9 0zm-35.2 19.82a11.43 11.43 0 110 22.86 11.43 11.43 0 010-22.86z" />
        <path fill="#FFD43B" d="M129.1 255c66.77 0 62.83-28.25 62.83-28.25l-.07-29.35h-63.86v-8.9H215.95S256 193.11 256 125.8c0-67.3-37.24-64.9-37.24-64.9h-22.23v31.22s1.2 37.24-36.64 37.24h-63.14s-35.44-.57-35.44 34.25v57.12S55.7 255 129.1 255zm35.2-19.82a11.43 11.43 0 110-22.86 11.43 11.43 0 010 22.86z" />
      </svg>
    </span>
    <span className="tech-mq-sep">&#10033;</span>
    <span className="tech-mq-item">
      <svg viewBox="0 0 256 134">
        <ellipse fill="#8892bf" cx="128" cy="67" rx="128" ry="67" />
        <path fill="#fff" d="M70.22 11.41h43.07c12.48.4 21.57 4.34 27.29 11.83 5.72 7.49 7.43 17.38 5.13 29.67-1.02 5.57-2.96 10.86-5.83 15.88-2.87 5.02-6.64 9.5-11.32 13.45-5.62 4.76-11.58 7.81-17.88 9.14-6.3 1.33-12.94 2-19.92 2H72.85L67.22 122H46.35L70.22 11.41zm18.4 16.08l-11.47 50.3h16.97c8.5 0 15.8-1.52 21.92-4.55 6.12-3.03 9.8-9.28 11.05-18.73.5-3.5.54-6.62.14-9.35-.41-2.73-1.44-5.04-3.11-6.94-1.67-1.9-4.01-3.32-7.01-4.27-3-0.95-6.82-1.43-11.46-1.46H88.62zM149.18 11.41h43.08c12.48.4 21.57 4.34 27.29 11.83 5.72 7.49 7.43 17.38 5.13 29.67-1.02 5.57-2.96 10.86-5.83 15.88-2.87 5.02-6.64 9.5-11.32 13.45-5.62 4.76-11.58 7.81-17.88 9.14-6.3 1.33-12.94 2-19.92 2h-18.06l-5.63 28.62h-20.87l23.01-110.59zm18.4 16.08l-11.47 50.3h16.97c8.5 0 15.8-1.52 21.92-4.55 6.12-3.03 9.8-9.28 11.05-18.73.5-3.5.54-6.62.14-9.35-.41-2.73-1.44-5.04-3.11-6.94-1.67-1.9-4.01-3.32-7.01-4.27s-6.82-1.43-11.46-1.46H167.58z" />
      </svg>
    </span>
    <span className="tech-mq-sep">&#10033;</span>
  </>
);

const FooterContent = ({ ariaHidden }) => (
  <div className="marquee-content-main" aria-hidden={ariaHidden}>
    <span><i>ranida perera</i> &copy; 2026</span>
    <span><i>ranida perera</i> &copy; 2026</span>
    <span><i>ranida perera</i> &copy; 2026</span>
    <span><i>ranida perera</i> &copy; 2026</span>
  </div>
);

export default App;
