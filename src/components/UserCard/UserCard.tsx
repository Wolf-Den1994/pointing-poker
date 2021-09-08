import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Avatar } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import getFirstUpLetters from '../../utils/getFirstUpLetters';
import { kickUser } from '../../store/lobbyReducer';
import style from './UserCard.module.scss';
import useTypedSelector from '../../hooks/useTypedSelector';

interface IUserCardProps {
  named: string;
  jobStatus: string;
}

const UserCard: FC<IUserCardProps> = ({ named, jobStatus }) => {
  const dispatch = useDispatch();

  const { user } = useTypedSelector((state) => state.lobby);
  const { users } = useTypedSelector((state) => state.lobby);

  const indexUser = users.findIndex((item) => item.name === user.name);
  const isDealer = users[0].name === user.name;

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
          {getFirstUpLetters(named)}
        </Avatar>
        <div className={style.user}>
          {users[indexUser].name === named ? <p className={style.isYou}>IT&apos;S YOU</p> : null}
          <p className={style.name}>{named}</p>
          <p className={style.jobStatus}>{jobStatus}</p>
        </div>
        {users[0].name !== named && !(users[indexUser].name === named) ? (
          <div className={style.kick} onClick={() => isDealer && dispatch(kickUser(named))}>
            <StopOutlined style={{ fontSize: 30 }} />
          </div>
        ) : null}
      </div>
    </Card>
  );
};

export default UserCard;
