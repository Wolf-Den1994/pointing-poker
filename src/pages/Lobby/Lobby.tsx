import React, { FC } from 'react';
import LinkToLobby from '../../components/LinkToLobby/LinkToLobby';
import UserCard from '../../components/UserCard/UserCard';

const Lobby: FC = () => {
  return (
    <div>
      <UserCard proffession="lead software engeneer" you={true}>
        Rick Giligan
      </UserCard>
      <LinkToLobby value={'http://pockerplanning.c...'} />
    </div>
  );
};

export default Lobby;
