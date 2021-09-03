import React from 'react';

import cl from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={cl.footer}>
      <div className="container">
        <div>Footer</div>
      </div>
    </footer>
  );
};

export default Footer;
