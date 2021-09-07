import { Button } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import style from './BtnsLobby.module.scss';

interface IBtnsLobbyProps {
  standing: boolean;
}

const BtnsLobby: React.FC<IBtnsLobbyProps> = ({ standing }) => {
  const history = useHistory();

  const startGame = () => {
    const path = `game`;
    history.push(path);
  };

  const cancelGame = () => {
    // TODO kick all members
    const path = `/`;
    history.push(path);
  };

  const exitGame = () => {
    const path = `/`;
    history.push(path);
  };

  return (
    <div className={style.btnsLobby}>
      {standing ? (
        <div className={style.control}>
          <Button type="primary" size={'large'} className={style.button} onClick={startGame}>
            Start Game
          </Button>
          <Button size={'large'} className={`${style.button} ${style.white}`} onClick={cancelGame}>
            Cancel game
          </Button>
        </div>
      ) : (
        <div className={style.exit}>
          <Button size={'large'} className={`${style.button} ${style.white}`} onClick={exitGame}>
            Exit
          </Button>
        </div>
      )}
    </div>
  );
};

export default BtnsLobby;
