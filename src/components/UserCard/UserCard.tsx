import React, { FC } from 'react';
import { Card, Avatar } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import getFirstUpLetters from '../../utils/getFirstUpLetters';
import { IMember } from '../../types/types';
import style from './UserCard.module.scss';

interface IUserCardProps {
  jobStatus: string;
  indexUser: number;
  username: string;
  members: IMember[];
  onKick?: (user: string) => void;
}

const UserCard: FC<IUserCardProps> = ({ jobStatus, username, indexUser, members, onKick }) => {
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
          {getFirstUpLetters(username)}
        </Avatar>
        <div className={style.user}>
          {members[indexUser].name === username ? <p className={style.isYou}>IT&apos;S YOU</p> : null}
          <p className={style.name}>{username}</p>
          <p className={style.jobStatus}>{jobStatus}</p>
        </div>
        {members[0].name !== username && !(members[indexUser].name === username) ? (
          <div className={style.kick} onClick={() => onKick && onKick(username)}>
            <StopOutlined style={{ fontSize: 30 }} />
          </div>
        ) : null}
      </div>
    </Card>
  );
};

export default UserCard;
