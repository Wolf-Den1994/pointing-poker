import React from 'react';
import useTypedSelector from '../../hooks/useTypedSelector';
import UserCard from '../UserCard/UserCard';
import style from './Members.module.scss';

const Members: React.FC = () => {
  const { users } = useTypedSelector((state) => state.lobby);

  const onlyTeamMembers = users.filter((item, index) => index !== 0);
  const elements = onlyTeamMembers.map((item) => (
    <UserCard key={item.name + item.jobStatus} jobStatus={item.jobStatus} named={item.name} />
  ));
  return (
    <div className={style.members}>
      <p className={style.title}>Members:</p>
      <div className={style.users}>{elements}</div>
    </div>
  );
};

export default Members;
