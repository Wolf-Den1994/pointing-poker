import React from 'react';
import { Button } from 'antd';
import { Header as HeaderContainer } from 'antd/lib/layout/layout';
import logo from '../../assets/logo.svg';

import './Header.scss';

const Header: React.FC = () => {
  return (
    <HeaderContainer className="header">
      <img className="header__logo" src={logo} alt="logo" />
      <Button type="primary">Test button</Button>
    </HeaderContainer>
  );
};

export default Header;
