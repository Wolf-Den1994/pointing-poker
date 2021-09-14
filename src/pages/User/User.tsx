import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { message } from 'antd';
import Planning from '../../components/Planning/Planning';
import UserCard from '../../components/UserCard/UserCard';
import BtnsLobby from '../../components/BtnsLobby/BtnsLobby';
import Members from '../../components/Members/Members';
import Chat from '../../components/Chat/Chat';
import useTypedSelector from '../../hooks/useTypedSelector';
import socket from '../../utils/soketIO';
import style from './User.module.scss';
import { addUsers, addMessage } from '../../store/roomDataReducer';
import { setShowWriter, setWriter } from '../../store/userTypingReducer';

const User: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const roomData = useTypedSelector((state) => state.roomData);
  const { users } = useTypedSelector((state) => state.roomData);

  useEffect(() => {
    socket.on('sendMessage', (data) => {
      dispatch(addMessage(data));
    });

    socket.on('enteredRoom', (data) => {
      dispatch(addUsers(data.user));
      message.success(`${data.user.name}, entered the room`);
    });

    socket.on('sendMessageWriter', (data) => {
      dispatch(setShowWriter(data.active));
      dispatch(setWriter(data.name));
    });

    socket.on('willBeDisconnected', () => {
      history.push('/');
    });

    socket.on('sendUserDisconnected', (data) => {
      message.warning(`${data}, user disconnected`);
    });

    // тут приколы ловит поидее
    socket.on('userLeaveTheRoom', (data) => {
      const newUsers = roomData.users.filter((el) => el.id !== data.id);
      dispatch(addUsers(newUsers));
      message.info(`${newUsers[0].name}, is leave the room`);
    });

    socket.on('dissconnectAllSockets', () => {
      history.push('/');
    });
  }, []);

  return (
    <div className={style.userPage}>
      <Chat />
      <Planning />
      <p className={style.scramMaster}>Scram master:</p>
      <div className={style.card}>
        {users.length ? (
          <UserCard
            jobStatus={users[0].position}
            name={users[0].name}
            lastName={users[0].lastName}
            avatar={users[0].avatarUrl}
            id={users[0].id}
          />
        ) : null}
      </div>
      <BtnsLobby />
      <Members />
    </div>
  );
};

export default User;
