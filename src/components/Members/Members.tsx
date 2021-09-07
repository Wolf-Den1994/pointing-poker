import React from 'react';
import { IMember } from '../../types/types';
import UserCard from '../UserCard/UserCard';
import style from './Members.module.scss';

interface IMembersProps {
  members: IMember[];
  onKick: (user: React.ReactNode) => void;
}

const Members: React.FC<IMembersProps> = ({ members, onKick }) => {
  const onlyTeamMembers = members.filter((item, index) => index !== 0);
  const elements = onlyTeamMembers.map((item, index) => (
    <UserCard key={item.name + index} proffession={item.proffession} you={item.you} onKick={onKick} members={members}>
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
