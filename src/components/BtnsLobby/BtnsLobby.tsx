import { Button } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import useTypedSelector from '../../hooks/useTypedSelector';
import style from './BtnsLobby.module.scss';

const BtnsLobby: React.FC = () => {
  const { user } = useTypedSelector((state) => state.lobby);
  const { users } = useTypedSelector((state) => state.lobby);
  const isDealer = users[0].name === user.name;

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
      {isDealer ? (
        <div className={style.control}>
          <Button type="primary" size="large" className={style.button} onClick={startGame}>
            Start Game
          </Button>
          <Button size="large" className={`${style.button} ${style.white}`} onClick={cancelGame}>
            Cancel game
          </Button>
        </div>
      ) : (
        <div className={style.exit}>
          <Button size="large" className={`${style.button} ${style.white}`} onClick={exitGame}>
            Exit
          </Button>
        </div>
      )}
    </div>
  );
};

export default BtnsLobby;
