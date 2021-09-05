import React, { FC } from 'react';
import { Input, Button } from 'antd';
import cl from './LinkToLobby.module.scss';

interface ILinkToLobbyProps {
  value: string;
}

const LinkToLobby: FC<ILinkToLobbyProps> = ({ value }) => {
  return (
    <div className={cl.linkToLobby}>
      <p className={cl.title}>Link to lobby:</p>
      <div className={cl.control}>
        <Input placeholder="Link" readOnly value={value} />
        <Button type="primary">Copy</Button>
      </div>
    </div>
  );
};

export default LinkToLobby;
