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
import style from './Admin.module.scss';
import { addMessage, addUsers } from '../../store/roomDataReducer';

const Admin: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const roomData = useTypedSelector((state) => state.roomData);
  const { users } = useTypedSelector((state) => state.roomData);

  useEffect(() => {
    socket.on('enteredRoom', (data) => {
      console.log(data.user.name, 'entered room');
      dispatch(addUsers(data.user));
    });

    socket.on('userLeaveTheRoom', (data) => {
      const newUsers = roomData.users.filter((el) => el.id !== data.id);
      dispatch(addUsers(newUsers));
      console.log(data.user, 'is leave the room');
    });

    socket.on('willBeDisconnected', () => {
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
