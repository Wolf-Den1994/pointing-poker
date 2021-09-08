import React, { FC } from 'react';
import BtnsLobby from '../../components/BtnsLobby/BtnsLobby';
import LinkToLobby from '../../components/LinkToLobby/LinkToLobby';
import Members from '../../components/Members/Members';
import Planning from '../../components/Planning/Planning';
import UserCard from '../../components/UserCard/UserCard';
import useTypedSelector from '../../hooks/useTypedSelector';
import style from './Lobby.module.scss';

const Lobby: FC = () => {
  const { username } = useTypedSelector((state) => state.lobby);
  const { users } = useTypedSelector((state) => state.lobby);
  const isDealer = users[0].name === username;

  return (
    <div className={style.lobbyPage}>
      <Planning />
      <p className={style.scramMaster}>Scram master:</p>
      <div className={style.card}>
        <UserCard jobStatus={users[0].jobStatus} named={users[0].name} />
      </div>
      {isDealer ? <LinkToLobby /> : null}
      <BtnsLobby />
      <Members />
    </div>
  );
};

export default Lobby;
