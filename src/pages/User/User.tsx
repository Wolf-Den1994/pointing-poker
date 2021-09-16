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
import { changeIssue } from '../../store/issuesReducer';
import { changeModalActivity, setNameOfDeletedUser } from '../../store/votingReducer';
import VotingPopup from '../../components/VotingPopup/VoitingPopup';
import { addUsers } from '../../store/roomDataReducer';
import { setShowWriter, setWriter } from '../../store/userTypingReducer';
import { PathRoutes } from '../../types/types';
import Timer from '../../components/Timer/Timer';
import { startTime } from '../../store/timerReducer';

const User: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const votingData = useTypedSelector((state) => state.voting);
  const { users } = useTypedSelector((state) => state.roomData);

  useEffect(() => {
    socket.on('enteredRoom', (data) => {
      dispatch(addUsers(data.user));
      message.success(`${data.user.name}, entered the room`);
    });

    socket.on('sendMessageWriter', (data) => {
      dispatch(setShowWriter(data.active));
      dispatch(setWriter(data.name));
    });

    socket.on('willBeDisconnected', () => {
      history.push(PathRoutes.Home);
    });

    socket.on('sendUserDisconnected', (data) => {
      message.warning(`${data}, user disconnected`);
    });

    socket.on('sendTimeOnTimer', (data) => {
      dispatch(startTime(data));
    });

    socket.on('userLeaveTheRoom', (data) => {
      const newUsers = data.usersList;
      dispatch(addUsers(newUsers));
      message.info(`${data.user}, is leave the room`);
    });

    socket.on('getIssuesList', (data) => {
      dispatch(changeIssue(data.issues));
    });

    socket.on('showCandidateToBeDeleted', (data) => {
      dispatch(changeModalActivity(true));
      dispatch(setNameOfDeletedUser(data.name));
    });

    socket.on('disconnectAllSockets', () => {
      history.push(PathRoutes.Home);
    });
  }, []);

  return (
    <>
      <div className={style.userPage}>
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
        <BtnsLobby />
        <Members />
      </div>
      {votingData.isVisible ? <VotingPopup userName={votingData.userName} isVisible={true} /> : null}
    </>
  );
};

export default User;
