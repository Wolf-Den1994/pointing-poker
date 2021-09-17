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
import style from './Lobby.module.scss';
import { addUsers } from '../../store/roomDataReducer';
import { setShowWriter, setWriter } from '../../store/userTypingReducer';
import Timer from '../../components/Timer/Timer';
import { PathRoutes, SocketTokens } from '../../types/types';
import { on } from '../../services/socket';
import { startTime } from '../../store/timerReducer';
import { changeIssue } from '../../store/issuesReducer';
import { changeModalActivity, setNameOfDeletedUser } from '../../store/votingReducer';
import VotingPopup from '../../components/VotingPopup/VoitingPopup';

const Lobby: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { users } = useTypedSelector((state) => state.roomData);
  const votingData = useTypedSelector((state) => state.voting);
  const { isDealer } = useTypedSelector((state) => state.lobby);

  useEffect(() => {
    on(SocketTokens.EnteredRoom, (data) => {
      dispatch(addUsers(data.user));
      message.info(`${data.user.name}, entered room`);
    });

    on(SocketTokens.SendMessageWriter, (data) => {
      dispatch(setShowWriter(data.active));
      dispatch(setWriter(data.name));
    });

    on(SocketTokens.WillBeDisconnected, () => {
      history.push(PathRoutes.Home);
    });

    on(SocketTokens.UserLeaveTheRoom, (data) => {
      const newUsers = data.usersList;
      dispatch(addUsers(newUsers));
      message.info(`${data.user} is leave the room`);
    });

    if (!isDealer) {
      on(SocketTokens.SendUserDisconnected, (data) => {
        message.warning(`${data}, user disconnected`);
      });

      on(SocketTokens.SendTimeOnTimer, (data) => {
        dispatch(startTime(data));
      });

      on(SocketTokens.GetIssuesList, (data) => {
        dispatch(changeIssue(data.issues));
      });

      on(SocketTokens.ShowCandidateToBeDeleted, (data) => {
        dispatch(changeModalActivity(true));
        dispatch(setNameOfDeletedUser(data.name));
      });

      on(SocketTokens.DisconnectAllSockets, () => {
        history.push(PathRoutes.Home);
      });
    }

    window.onload = () => {
      history.push(PathRoutes.Home);
    };

    return () => {
      window.onload = null;
    };
  }, []);

  return (
    <>
      <div className={style.lobbyPage}>
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
        {isDealer ? <LinkToLobby /> : null}
        <BtnsLobby />
        <Members />
        {isDealer ? (
          <>
            <IssueList />
            <GameSettings />
            <CustomizeCards />
          </>
        ) : null}
      </div>
      {votingData.isVisible ? <VotingPopup userName={votingData.userName} isVisible={true} /> : null}
    </>
  );
};

export default Lobby;
