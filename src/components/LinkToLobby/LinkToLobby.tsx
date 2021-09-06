import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Button } from 'antd';
import style from './LinkToLobby.module.scss';

interface ILinkToLobbyProps {
  value: string;
}

const LinkToLobby: FC<ILinkToLobbyProps> = ({ value }) => {
  const history = useHistory();

  const startGame = () => {
    const path = `game`;
    history.push(path);
  };

  const cancelGame = () => {
    const path = `/`;
    history.push(path);
  };

  return (
    <>
      <div className={style.linkToLobby}>
        <div className={style.wrapper}>
          <p className={style.title}>Link to lobby:</p>
          <div className={style.link}>
            <Input placeholder="Link" readOnly value={value} className={style.input} />
            <Button type="primary" className={style.button}>
              Copy
            </Button>
          </div>
        </div>
        <div className={style.control}>
          <Button type="primary" className={style.button} onClick={startGame}>
            Start Game
          </Button>
          <Button type="primary" className={`${style.button} ${style.white}`} onClick={cancelGame}>
            Cancel game
          </Button>
        </div>
      </div>
    </>
  );
};

export default LinkToLobby;
