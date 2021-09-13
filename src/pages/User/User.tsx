import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import Planning from '../../components/Planning/Planning';
import UserCard from '../../components/UserCard/UserCard';
import BtnsLobby from '../../components/BtnsLobby/BtnsLobby';
import LinkToLobby from '../../components/LinkToLobby/LinkToLobby';
import Members from '../../components/Members/Members';
import CustomizeCards from '../../components/CustomizeCards/CustomizeCards';
import GameSettings from '../../components/GameSettings/GameSettings';
import IssueList from '../../components/IssueList/IssueList';
import useTypedSelector from '../../hooks/useTypedSelector';
import socket from '../../utils/soketIO';
import style from './User.module.scss';
import { addMessage, addUsers } from '../../store/roomDataReducer';

const User: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const roomData = useTypedSelector((state) => state.roomData);
  const { users } = useTypedSelector((state) => state.roomData);

  const exitRoom = () => {
    socket.emit('leaveRoom', { roomId: roomData.roomId, id: socket.id });
    history.push('/');
  };

  useEffect(() => {
    socket.on('enteredRoom', (data) => {
      console.log(data.user.name, 'entered the room');
      dispatch(addUsers(data.user));
    });
    socket.on('willBeDisconnected', () => {
      history.push('/');
    });
    socket.on('sendUserDisconnected', (data) => {
      console.log(data);
    });

    socket.on('userLeaveTheRoom', (data) => {
      const newUsers = roomData.users.filter((el) => el.id !== data.id);
      dispatch(addUsers(users));
      console.log(data.user, 'is leave the room');
    });
    socket.on('dissconnectAllSockets', () => {
      history.push('/');
    });
  }, []);

  return (
    <div className={style.adminPage}>
      <Planning />
      <p className={style.scramMaster}>Scram master:</p>
      <div className={style.card}>
        <UserCard jobStatus={users[0].position} member={users[0].name} />
      </div>
      <BtnsLobby />
      <Members />
    </div>
  );
};

export default User;
