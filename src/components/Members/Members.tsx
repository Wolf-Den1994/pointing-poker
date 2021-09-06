import React from 'react';
import { IMember } from '../../types/types';
import UserCard from '../UserCard/UserCard';
import style from './Members.module.scss';

interface IMembersProps {
  membersArray: IMember[];
  onKick: (user: React.ReactNode) => void;
}

const Members: React.FC<IMembersProps> = ({ membersArray, onKick }) => {
  const elements = membersArray.map((item, index) => (
    <UserCard key={item.name + index} proffession={item.proffession} you={item.you} onKick={onKick}>
      {item.name}
    </UserCard>
  ));
  return (
    <div className={style.members}>
      <p className={style.title}>Members:</p>
      <div className={style.users}>{elements}</div>
    </div>
  );
};

export default Members;
