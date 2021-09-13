import { useDispatch } from 'react-redux';
import { Card, Avatar } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import getFirstUpLetters from '../../utils/getFirstUpLetters';
import style from './UserCard.module.scss';
import useTypedSelector from '../../hooks/useTypedSelector';
import socket from '../../utils/soketIO';
import { addUsers } from '../../store/roomDataReducer';

interface IUserCardProps {
  name: string;
  lastName: string;
  jobStatus: string;
  avatar: string;
  id: string;
}

const UserCard: React.FC<IUserCardProps> = ({ name, lastName, jobStatus, avatar, id }: IUserCardProps) => {
  const dispatch = useDispatch();

  const { users, roomId } = useTypedSelector((state) => state.roomData);
  const { user } = useTypedSelector((state) => state.registrationData);
  const { isDealer } = useTypedSelector((state) => state.lobby);

  const indexUser = users.findIndex((item) => item.name === user.name);

  const deleteUser = () => {
    socket.emit('disconnectOne', { userId: id, roomId });
    const members = users.filter((el) => el.id !== id);
    dispatch(addUsers(members));
    console.log(id, 'disconnected');
  };

  return (
    <Card className={style.userCard} bodyStyle={{ padding: 10 }}>
      <div className={style.wrapper}>
        <Avatar
          className={style.avatar}
          src={avatar}
          size={60}
          style={{
            fontSize: 36,
            textShadow: '0px 4px 4px #00000040',
            backgroundColor: '#60DABF',
          }}
        >
          {getFirstUpLetters(`${name} ${lastName}`)}
        </Avatar>
        <div className={style.user}>
          {users[indexUser].name === name ? <p className={style.isYou}>IT&apos;S YOU</p> : null}
          <p className={style.name}>{`${name} ${lastName}`}</p>
          <p className={style.jobStatus}>{jobStatus}</p>
        </div>
        {isDealer && !(users[indexUser].name === name) ? (
          <div className={style.kick} onClick={deleteUser}>
            <StopOutlined style={{ fontSize: 30 }} />
          </div>
        ) : null}
      </div>
    </Card>
  );
};

export default UserCard;
