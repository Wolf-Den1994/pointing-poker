import React from 'react';
import logoRSS from '../../assets/rss.svg';

import cl from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={cl.footer}>
      <div className="container">
        <address className={cl.info}>
          <div className={cl.colomn}>
            <div>Mentor:</div>
            <a href="https://github.com/lessarea" target="_blank" rel="noreferrer">
              Diana Garbuzova
            </a>
          </div>

          <div className={cl.colomn}>
            <div>Authors:</div>
            <ul className={cl.info__box}>
              <li>
                <a href="https://github.com/Wolf-Den1994" target="_blank" rel="noreferrer">
                  Denis Karazan
                </a>
              </li>
              <li>
                <a href="https://github.com/KalashnikovTV" target="_blank" rel="noreferrer">
                  Maksim Malashkou
                </a>
              </li>
              <li>
                <a href="https://github.com/Ksarelto" target="_blank" rel="noreferrer">
                  Artsiom Murashko
                </a>
              </li>
            </ul>
          </div>

          <div className={cl.colomn}>
            <a href="https://rs.school/js/" target="_blank" rel="noreferrer" title="Click me!">
              <img src={logoRSS} alt="The Rolling Scopes School" />
            </a>
          </div>
        </address>
      </div>
    </footer>
  );
};

export default Footer;
