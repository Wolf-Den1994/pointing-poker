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
    isYou: true,
  },
  {
    name: 'David Blane',
    jobStatus: 'senior software engeneer',
    isYou: false,
  },
  {
    name: 'Dayana Ross',
    jobStatus: 'unior software engeneer',
    isYou: false,
  },
  {
    name: 'Daniel Horn',
    jobStatus: '',
    isYou: false,
  },
  {
    name: 'Mark Single',
    jobStatus: 'senior software engeneer',
    isYou: false,
  },
  {
    name: 'Jane Ring',
    jobStatus: 'software engeneer',
    isYou: false,
  },
  {
    name: 'Larry King',
    jobStatus: 'junior software engeneer',
    isYou: false,
  },
  {
    name: 'Fill',
    jobStatus: 'QA engeneer',
    isYou: false,
  },
];

const Lobby: FC = () => {
  const [users, setUsers] = useState<IMember[]>(membersArray);

  const kickUser = (user: React.ReactNode) => {
    const stringUser = user?.toString() as string;
    if (membersArray[0].isYou) setUsers((state) => state.filter((item) => item.name !== stringUser));
  };

  return (
    <div className={style.lobbyPage}>
      <Planning isDealer={membersArray[0].isYou} />
      <p className={style.scramMaster}>Scram master:</p>
      <div className={style.card}>
        <UserCard
          jobStatus={membersArray[0].jobStatus}
          isYou={membersArray[0].isYou}
          members={membersArray}
          name={membersArray[0].name}
        />
      </div>
      <LinkToLobby value={testLink} isDealer={membersArray[0].isYou} />
      <BtnsLobby isDealer={membersArray[0].isYou} />
      <Members members={users} onKick={kickUser} />
    </div>
  );
};

export default Lobby;
