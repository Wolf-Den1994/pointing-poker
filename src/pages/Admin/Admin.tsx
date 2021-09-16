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
import { addUsers } from '../../store/roomDataReducer';
import { setShowWriter, setWriter } from '../../store/userTypingReducer';
import Timer from '../../components/Timer/Timer';
import { PathRoutes } from '../../types/types';

const Admin: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { users } = useTypedSelector((state) => state.roomData);

  useEffect(() => {
    socket.on('enteredRoom', (data) => {
      dispatch(addUsers(data.user));
      message.info(`${data.user.name}, entered room`);
    });

    socket.on('sendMessageWriter', (data) => {
      dispatch(setShowWriter(data.active));
      dispatch(setWriter(data.name));
    });

    socket.on('userLeaveTheRoom', (data) => {
      const newUsers = data.usersList;
      dispatch(addUsers(newUsers));
      message.info(`${data.user} is leave the room`);
    });

    socket.on('willBeDisconnected', () => {
      history.push(PathRoutes.Home);
    });
  }, []);

  return (
    <div className={style.adminPage}>
      {/* {убрать таймер потом, когда будет страница game} */}
      <Timer />
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
            role={users[0].role}
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
