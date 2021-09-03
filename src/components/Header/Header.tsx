import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

import cl from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={cl.header}>
      <div className={cl.top}>
        <div className="container">
          <h1 className={cl.title}>Pointing Poker</h1>
          <Link to="/">
            <img className={cl.logo} src={logo} alt="logo" />
          </Link>
        </div>
      </div>
      <div className={cl.bottom}></div>
    </header>
  );
};

export default Header;
