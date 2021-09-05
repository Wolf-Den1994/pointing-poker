import React, { FC } from 'react';
import LinkToLobby from '../../components/LinkToLobby/LinkToLobby';
import UserCard from '../../components/UserCard/UserCard';
import style from './Lobby.module.scss';

const testProf = 'lead software engeneer';
const testName = 'Rick Giligan';
const testLink = 'http://pockerplanning.c...';

const Lobby: FC = () => {
  return (
    <div className={style.lobbyPage}>
      <p className={style.scramMaster}>Scram master:</p>
      <div className={style.card}>
        <UserCard proffession={testProf} you={true}>
          {testName}
        </UserCard>
      </div>
      <LinkToLobby value={testLink} />
    </div>
  );
};

export default Lobby;
