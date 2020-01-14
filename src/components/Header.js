import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return(
    <header>
      <div className="wrapper">
        <Link to='/'><h1>FFXIV Streamer Widgets</h1></Link>
        <p>A collection of widgets to display personalized character information on streams.</p>
      </div>
    </header>
  );
}

export default Header;