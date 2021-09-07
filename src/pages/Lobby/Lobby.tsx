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
    proffession: 'lead software engeneer',
    you: true,
  },
  {
    name: 'David Blane',
    proffession: 'senior software engeneer',
    you: false,
  },
  {
    name: 'Dayana Ross',
    proffession: 'unior software engeneer',
    you: false,
  },
  {
    name: 'Daniel Horn',
    proffession: '',
    you: false,
  },
  {
    name: 'Mark Single',
    proffession: 'senior software engeneer',
    you: false,
  },
  {
    name: 'Jane Ring',
    proffession: 'software engeneer',
    you: false,
  },
  {
    name: 'Larry King',
    proffession: 'junior software engeneer',
    you: false,
  },
  {
    name: 'Fill',
    proffession: 'QA engeneer',
    you: false,
  },
];

const Lobby: FC = () => {
  const [users, setUsers] = useState<IMember[]>(membersArray);

  const kickUser = (user: React.ReactNode) => {
    const stringUser = user?.toString() as string;
    if (membersArray[0].you) setUsers((state) => state.filter((item) => item.name !== stringUser));
  };

  return (
    <div className={style.lobbyPage}>
      <Planning standing={membersArray[0].you} />
      <p className={style.scramMaster}>Scram master:</p>
      <div className={style.card}>
        <UserCard proffession={membersArray[0].proffession} you={membersArray[0].you} members={membersArray}>
          {membersArray[0].name}
        </UserCard>
      </div>
      <LinkToLobby value={testLink} standing={membersArray[0].you} />
      <BtnsLobby standing={membersArray[0].you} />
      <Members members={users} onKick={kickUser} />
    </div>
  );
};

export default Lobby;
