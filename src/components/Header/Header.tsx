import React from 'react';
import { Button } from 'antd';
import logo from '../../assets/logo.svg';

import cl from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={cl.header}>
      <div className="container">
        <img className={cl.logo} src={logo} alt="logo" />
        <Button type="primary">Test button</Button>
      </div>
    </header>
  );
};

export default Header;
