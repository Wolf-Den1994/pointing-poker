import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { message } from 'antd';
import Planning from '../../components/Planning/Planning';
import UserCard from '../../components/UserCard/UserCard';
import BtnsLobby from '../../components/BtnsLobby/BtnsLobby';
import LinkToLobby from '../../components/LinkToLobby/LinkToLobby';
import Members from '../../components/Members/Members';
import CustomizeCards from '../../components/CustomizeCards/CustomizeCards';
import GameSettings from '../../components/GameSettings/GameSettings';
import IssueList from '../../components/IssueList/IssueList';
import Chat from '../../components/Chat/Chat';
import useTypedSelector from '../../hooks/useTypedSelector';
import socket from '../../utils/soketIO';
import style from './Admin.module.scss';
import { addMessage, addUsers } from '../../store/roomDataReducer';
import { setShowWriter, setWriter } from '../../store/userTypingReducer';

const Admin: React.FC = () => {
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
      message.info(`${data.user.name}, entered room`);
    });

    socket.on('sendMessageWriter', (data) => {
      dispatch(setShowWriter(data.active));
      dispatch(setWriter(data.name));
    });

    socket.on('userLeaveTheRoom', (data) => {
      const newUsers = roomData.users.filter((el) => el.id !== data.id);
      dispatch(addUsers(newUsers));
      message.info(`${data.user.name}, is leave the room`);
    });

    socket.on('sendUserDisconnected', (data) => {
      console.log(data);
    });

    socket.on('willBeDisconnected', () => {
      history.push('/');
    });
  }, []);

  return (
    <div className={style.adminPage}>
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
      <LinkToLobby />
      <BtnsLobby />
      <Members />
      <IssueList />
      <GameSettings />
      <CustomizeCards />
    </div>
  );
};

export default Admin;
