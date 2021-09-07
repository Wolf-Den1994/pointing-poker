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
  const elements = onlyTeamMembers.map((item) => (
    <UserCard
      key={item.name + item.jobStatus}
      jobStatus={item.jobStatus}
      isYou={item.isYou}
      onKick={onKick}
      members={members}
      name={item.name}
    />
  ));
  return (
    <div className={style.members}>
      <p className={style.title}>Members:</p>
      <div className={style.users}>{elements}</div>
    </div>
  );
};

export default Members;
