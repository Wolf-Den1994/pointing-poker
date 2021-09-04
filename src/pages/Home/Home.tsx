import React from 'react';
import imagePokerPlanning from '../../assets/images/poker-planning.png';

import style from './Home.module.scss';

const Home: React.FC = () => {
  return (
    <div className={style.wrapper}>
      <img className={style.image} src={imagePokerPlanning} alt="poker-planning" />
      <div className={style.row}>
        <h1 className={style.title}>Start your planning:</h1>
        <div className={style.box}>
          <p className={style.session}>Create a session: </p>
          <button className={style.button} type="button" onClick={() => {}}>
            Start new game
          </button>
        </div>
      </div>

      <div className={style.row}>
        <h1 className={`${style.title} ${style.title_lobby}`}>OR:</h1>
        <div className={`${style.box} ${style.box_lobby}`}>
          <p className={style.session}>
            Connect to lobby by <span>URL:</span>
          </p>
          <form className={style.lobby} onSubmit={(e) => e.preventDefault()}>
            <input className={style.input} type="text" onChange={() => {}} />
            <button className={`${style.button} ${style.button_lobby}`} type="submit">
              Connect
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
