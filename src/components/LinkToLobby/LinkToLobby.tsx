import React, { FC } from 'react';
import { Input, Button } from 'antd';
import style from './LinkToLobby.module.scss';

interface ILinkToLobbyProps {
  value: string;
}

const LinkToLobby: FC<ILinkToLobbyProps> = ({ value }) => {
  return (
    <>
      <div className={style.linkToLobby}>
        <div className={style.wrapper}>
          <p className={style.title}>Link to lobby:</p>
          <div className={style.link}>
            <Input placeholder="Link" readOnly value={value} className={style.input} />
            <Button className={style.button}>Copy</Button>
          </div>
        </div>
        <div className={style.control}>
          <Button className={style.button}>Start Game</Button>
          <Button className={`${style.button} ${style.white}`}>Cancel game</Button>
        </div>
      </div>
    </>
  );
};

export default LinkToLobby;
