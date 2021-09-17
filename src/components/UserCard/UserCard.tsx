import { Card, Avatar, message } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import getFirstUpLetters from '../../utils/getFirstUpLetters';
import style from './UserCard.module.scss';
import useTypedSelector from '../../hooks/useTypedSelector';
import socket from '../../utils/soketIO';
import { SocketTokens, TextForUser, UserRole } from '../../types/types';
import { emit } from '../../services/socket';
import getMessageUserDisconnect from '../../utils/getMessageUserDisconnect';

interface IUserCardProps {
  name: string;
  lastName: string;
  jobStatus: string;
  avatar: string;
  id: string;
  role: string;
}

const UserCard: React.FC<IUserCardProps> = ({ name, lastName, jobStatus, avatar, id, role }: IUserCardProps) => {
  const { users, isDealer, isGame } = useTypedSelector((state) => state.roomData);
  const user = useTypedSelector((state) => state.userData);

  const { roomId } = useParams<{ roomId: string }>();

  const indexUser = users.findIndex((item) => item.name === user.name);

  const handleDeleteUserWithVoting = () => {
    if (id === socket.id) {
      message.error(TextForUser.KickUserWithVoiting);
      return;
    }
    emit(SocketTokens.DeleteUserWithVoting, { userId: id, userName: name, roomId });
  };

  const handleDeleteUser = () => {
    emit(SocketTokens.DisconnectOne, { userId: id, roomId });
    getMessageUserDisconnect(id);
  };

  const classNameFirstname = isGame ? `${style.name} ${style.nameGame}` : `${style.name}`;
  const classNameAvatar = isGame ? `${style.avatar} ${style.avatarGame}` : `${style.avatar}`;
  const sizeAvatar = isGame ? 30 : 60;
  const fontSizeAvatar = isGame ? 14 : 36;
  const sizeBtnKick = isGame ? 12 : 30;

  return (
    <Card className={style.userCard} bodyStyle={{ padding: 10 }}>
      <div className={style.wrapper}>
        <Avatar
          className={classNameAvatar}
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
          {users[indexUser].name === name ? <p className={style.isYou}>IT&apos;S YOU</p> : null}
          <p className={classNameFirstname}>{`${name} ${lastName}`}</p>
          <p className={style.jobStatus}>{jobStatus}</p>
        </div>
        <div className={style.kick} onClick={isDealer ? handleDeleteUser : handleDeleteUserWithVoting} data-id={id}>
          {role === UserRole.Admin ? null : <StopOutlined style={{ fontSize: sizeBtnKick }} />}
        </div>
      </div>
    </Card>
  );
};

export default UserCard;
