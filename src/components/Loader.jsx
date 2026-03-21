import React, { useEffect, useState } from 'react';

const Loader = () => {
  const [status, setStatus] = useState('active'); // active, fading, hidden

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setStatus('fading');
    }, 2800);

    const hideTimer = setTimeout(() => {
      setStatus('hidden');
      document.body.classList.add('ready');
    }, 3600);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (status === 'hidden') return null;

  return (
    <div id="ld" style={{ 
      animation: status === 'fading' ? 'ldOut .8s both' : 'none',
      display: status === 'hidden' ? 'none' : 'flex'
    }}>
      <div className="ld-row">
        <div className="ld-word">RANIDA PERERA</div>
      </div>
      <div className="ld-bar-wrap">
        <div className="ld-bar"></div>
      </div>
    </div>
  );
};


export default Loader;
