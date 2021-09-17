import { GithubOutlined } from '@ant-design/icons';
import logoRSS from '../../assets/rss.svg';
import { Authors, AuthorsLink } from '../../types/types';

import style from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={style.footer}>
      <div className="container">
        <address className={style.info}>
          <div className={style.colomn}>
            <div>Mentor:</div>
            <a href={AuthorsLink.Diana} target="_blank" rel="noreferrer">
              <GithubOutlined className={style.icon} />
              {Authors.Diana}
            </a>
          </div>

          <div className={style.colomn}>
            <div>Authors:</div>
            <ul className={style.info__box}>
              <li>
                <a href={AuthorsLink.Denis} target="_blank" rel="noreferrer">
                  <GithubOutlined className={style.icon} />
                  {Authors.Denis}
                </a>
              </li>
              <li>
                <a href={AuthorsLink.Maksim} target="_blank" rel="noreferrer">
                  <GithubOutlined className={style.icon} />
                  {Authors.Maksim}
                </a>
              </li>
              <li>
                <a href={AuthorsLink.Artsiom} target="_blank" rel="noreferrer">
                  <GithubOutlined className={style.icon} />
                  {Authors.Artsiom}
                </a>
              </li>
            </ul>
          </div>

          <div className={style.colomn}>
            <a className={style.rss} href={AuthorsLink.RSS} target="_blank" rel="noreferrer" title="Click me!">
              <img src={logoRSS} alt={Authors.RSS} />
              <span className={style.rssYear}>&apos;21</span>
            </a>
          </div>
        </address>
      </div>
    </footer>
  );
};

export default Footer;
