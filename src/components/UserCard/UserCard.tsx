import { Card, Avatar } from 'antd';
import { CrownOutlined, StopOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import getFirstUpLetters from '../../utils/getFirstUpLetters';
import style from './UserCard.module.scss';
import useTypedSelector from '../../hooks/useTypedSelector';
import socket from '../../utils/soketIO';
import { SocketTokens, UserRole } from '../../types/types';
import { emit } from '../../services/socket';
import getMessageUserDisconnect from '../../utils/getMessageUserDisconnect';

interface IUserCardProps {
  name: string;
  lastName: string;
  jobStatus: string;
  avatar: string;
  id: string;
  role: string;
  size?: string;
}

const UserCard: React.FC<IUserCardProps> = ({
  name,
  lastName,
  jobStatus,
  avatar,
  id,
  role,
  size = 'big',
}: IUserCardProps) => {
  const { users, isDealer, isObserver } = useTypedSelector((state) => state.roomData);
  const user = useTypedSelector((state) => state.userData);

  const { roomId } = useParams<{ roomId: string }>();

  const indexUser = users.findIndex((item) => item.name === user.name);

  const handleDeleteUserWithVoting = () => {
    emit(SocketTokens.DeleteUserWithVoting, { userId: id, userName: name, roomId });
  };

  const handleDeleteUser = () => {
    emit(SocketTokens.DisconnectOne, { userId: id, roomId });
    getMessageUserDisconnect(id);
  };

  const sizeAvatar = size === 'small' ? 30 : 60;
  const fontSizeAvatar = size === 'small' ? 18 : 36;
  const sizeBtnKick = size === 'small' ? 18 : 24;
  const sizeCrown = size === 'small' ? 18 : 26;

  const checkUserRoleAndId = () => role === UserRole.Admin || id === socket.id;

  return (
    <Card className={style.userCard} bodyStyle={{ padding: 10, minHeight: 80 }}>
      <div className={style.wrapper}>
        <Avatar
          className={`${style.avatar} ${size}`}
          src={avatar}
          size={sizeAvatar}
          style={{
            fontSize: fontSizeAvatar,
            textShadow: '0px 4px 4px #00000040',
            backgroundColor: '#60DABF',
          }}
        >
          {getFirstUpLetters(`${name} ${lastName}`)}
        </Avatar>
        <div className={style.user}>
          {users[indexUser].name === name ? (
            <p className={style.isYou}>IT&apos;S YOU</p>
          ) : (
            <p className={style.isYouEmpty}></p>
          )}
          <p className={`${style.name} ${style[size]}`}>{`${name} ${lastName}`}</p>
          <p className={style.jobStatus}>{jobStatus}</p>
        </div>
        {isObserver ? null : (
          <div className={style.kick} onClick={isDealer ? handleDeleteUser : handleDeleteUserWithVoting} data-id={id}>
            {checkUserRoleAndId() ? null : <StopOutlined style={{ fontSize: sizeBtnKick }} />}
          </div>
        )}
      </div>
      {role === UserRole.Admin ? (
        <span className={style.crownWrapper}>
          <CrownOutlined className={style.crown} style={{ fontSize: sizeCrown }} />
        </span>
      ) : null}
    </Card>
  );
};

export default UserCard;
