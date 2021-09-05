import React, { FC } from 'react';
import { Card, Avatar } from 'antd';
import getFirstUpLetters from '../../utils/getFirstUpLetters';
import cl from './UserCard.module.scss';

interface IUserCardProps {
  proffession: string;
  you: boolean;
  children: React.ReactNode;
}

const UserCard: FC<IUserCardProps> = ({ proffession, you, children }) => {
  const words = children?.toString() as string;
  return (
    <Card className={cl.userCard} bodyStyle={{ padding: 10 }}>
      <div className={cl.wrapper}>
        <Avatar className={cl.avatar} size={50} style={{ fontSize: 36 }}>
          {getFirstUpLetters(words)}
        </Avatar>
        <div className={cl.user}>
          {you ? <p className={cl.you}>IT&apos;S YOU</p> : null}
          <p className={cl.name}>{children}</p>
          <p className={cl.proffession}>{proffession}</p>
        </div>
      </div>
    </Card>
  );
};

export default UserCard;
