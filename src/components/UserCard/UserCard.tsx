import React, { FC } from 'react';
import { Card, Avatar } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import getFirstUpLetters from '../../utils/getFirstUpLetters';
import { IMember } from '../../types/types';
import style from './UserCard.module.scss';

interface IUserCardProps {
  jobStatus: string;
  isYou: boolean;
  name: string;
  members: IMember[];
  onKick?: (user: React.ReactNode) => void;
}

const UserCard: FC<IUserCardProps> = ({ jobStatus, isYou, name, members, onKick }) => {
  return (
    <Card className={style.userCard} bodyStyle={{ padding: 10 }}>
      <div className={style.wrapper}>
        <Avatar
          className={style.avatar}
          size={60}
          style={{
            fontSize: 36,
            textShadow: '0px 4px 4px #00000040',
            backgroundColor: '#60DABF',
          }}
        >
          {getFirstUpLetters(name)}
        </Avatar>
        <div className={style.user}>
          {isYou ? <p className={style.isYou}>IT&apos;S YOU</p> : null}
          <p className={style.name}>{name}</p>
          <p className={style.jobStatus}>{jobStatus}</p>
        </div>
        {members[0].name !== name ? (
          <div className={style.kick} onClick={() => onKick && onKick(name)}>
            {isYou ? null : <StopOutlined style={{ fontSize: 30 }} />}
          </div>
        ) : null}
      </div>
    </Card>
  );
};

export default UserCard;
