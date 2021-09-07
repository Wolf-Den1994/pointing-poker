import React, { FC, useState } from 'react';
import BtnsLobby from '../../components/BtnsLobby/BtnsLobby';
import LinkToLobby from '../../components/LinkToLobby/LinkToLobby';
import Members from '../../components/Members/Members';
import Planning from '../../components/Planning/Planning';
import UserCard from '../../components/UserCard/UserCard';
import { IMember } from '../../types/types';
import style from './Lobby.module.scss';

const testLink = 'https://github.com/rolling-scopes-school/tasks/blob/yuliaHope-patch-4/tasks/react/pointing-poker.md';
const membersArray = [
  {
    name: 'Rick Giligan',
    jobStatus: 'lead software engeneer',
  },
  {
    name: 'David Blane',
    jobStatus: 'senior software engeneer',
  },
  {
    name: 'Dayana Ross',
    jobStatus: 'unior software engeneer',
  },
  {
    name: 'Daniel Horn',
    jobStatus: '',
  },
  {
    name: 'Mark Single',
    jobStatus: 'senior software engeneer',
  },
  {
    name: 'Jane Ring',
    jobStatus: 'software engeneer',
  },
  {
    name: 'Larry King',
    jobStatus: 'junior software engeneer',
  },
  {
    name: 'Fill',
    jobStatus: 'QA engeneer',
  },
];

const Lobby: FC = () => {
  // TODO: change the field to empty. change this state to the name that was during authorization
  const [username, setUsername] = useState('Rick Giligan');
  const [users, setUsers] = useState<IMember[]>(membersArray);

  const indexUser = membersArray.findIndex((user) => user.name === username);
  const isDealer = membersArray[0].name === username;

  const kickUser = (user: React.ReactNode) => {
    const stringUser = user?.toString() as string;
    if (isDealer) setUsers((state) => state.filter((item) => item.name !== stringUser));
  };

  return (
    <div className={style.lobbyPage}>
      <Planning isDealer={isDealer} />
      <p className={style.scramMaster}>Scram master:</p>
      <div className={style.card}>
        <UserCard
          jobStatus={membersArray[0].jobStatus}
          indexUser={indexUser}
          members={membersArray}
          username={membersArray[0].name}
        />
      </div>
      {isDealer ? <LinkToLobby value={testLink} isDealer={isDealer} /> : null}
      <BtnsLobby isDealer={isDealer} />
      <Members members={users} onKick={kickUser} indexUser={indexUser} />
    </div>
  );
};

export default Lobby;
