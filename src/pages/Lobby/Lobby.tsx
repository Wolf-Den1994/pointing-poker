import React, { FC } from 'react';
import LinkToLobby from '../../components/LinkToLobby/LinkToLobby';
import Members from '../../components/Members/Members';
import Planning from '../../components/Planning/Planning';
import UserCard from '../../components/UserCard/UserCard';
import style from './Lobby.module.scss';

const testProf = 'lead software engeneer';
const testName = 'Rick Giligan';
const testLink = 'http://pockerplanning.c...';

const Lobby: FC = () => {
  return (
    <div className={style.lobbyPage}>
      <Planning />
      <p className={style.scramMaster}>Scram master:</p>
      <div className={style.card}>
        <UserCard proffession={testProf} you={true}>
          {testName}
        </UserCard>
      </div>
      <LinkToLobby value={testLink} />
      <Members />
    </div>
  );
};

export default Lobby;
