import React from 'react';

const Navbar = ({ lightMode, setLightMode }) => {
  return (
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
  );
};

export default Navbar;
