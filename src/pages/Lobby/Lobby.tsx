import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BtnsLobby from '../../components/BtnsLobby/BtnsLobby';
import LinkToLobby from '../../components/LinkToLobby/LinkToLobby';
import Members from '../../components/Members/Members';
import Planning from '../../components/Planning/Planning';
import UserCard from '../../components/UserCard/UserCard';
import { kickUserX } from '../../store/lobbyReducer';
import { RootState } from '../../store/rootReducer';
import { IMember } from '../../types/types';
import style from './Lobby.module.scss';

const testLink = 'https://github.com/rolling-scopes-school/tasks/blob/yuliaHope-patch-4/tasks/react/pointing-poker.md';

const Lobby: FC = () => {
  const username = useSelector((state: RootState) => state.lobby.username);
  const users = useSelector((state: RootState) => state.lobby.users);
  const dispatch = useDispatch();

  const indexUser = users.findIndex((user) => user.name === username);
  const isDealer = users[0].name === username;

  const kickUser = (user: string) => {
    if (isDealer) dispatch(kickUserX(user));
  };

  return (
    <div className={style.lobbyPage}>
      <Planning isDealer={isDealer} />
      <p className={style.scramMaster}>Scram master:</p>
      <div className={style.card}>
        <UserCard jobStatus={users[0].jobStatus} indexUser={indexUser} members={users} username={users[0].name} />
      </div>
      {isDealer ? <LinkToLobby value={testLink} isDealer={isDealer} /> : null}
      <BtnsLobby isDealer={isDealer} />
      <Members members={users} onKick={kickUser} indexUser={indexUser} />
    </div>
  );
};

export default Lobby;
