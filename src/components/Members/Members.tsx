import React from 'react';
import UserCard from '../UserCard/UserCard';
import style from './Members.module.scss';

const membersArray = [
  {
    name: 'David Blane',
    proffession: 'senior software engeneer',
    you: false,
  },
  {
    name: 'Dayana Ross',
    proffession: 'unior software engeneer',
    you: true,
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

const Members: React.FC = () => {
  const elements = membersArray.map((item, index) => (
    <UserCard key={item.name + index} proffession={item.proffession} you={item.you}>
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
