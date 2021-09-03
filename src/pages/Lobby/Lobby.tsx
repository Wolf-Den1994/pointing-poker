import React, { FC } from 'react';
import UserCard from '../../components/UserCard/UserCard';

const Lobby: FC = () => {
  return (
    <div>
      <UserCard proffession="lead software engeneer" you={true}>
        Rick Giligan
      </UserCard>
    </div>
  );
};

export default Lobby;
