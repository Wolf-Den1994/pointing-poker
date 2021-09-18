import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, message } from 'antd';
import { useHistory, useParams } from 'react-router';
import Title from '../../components/Title/Title';
import UserCard from '../../components/UserCard/UserCard';
import BtnsControl from '../../components/BtnsControl/BtnsControl';
import LinkToLobby from '../../components/LinkToLobby/LinkToLobby';
import Members from '../../components/Members/Members';
import CustomizeCards from '../../components/CustomizeCards/CustomizeCards';
import GameSettings from '../../components/GameSettings/GameSettings';
import IssueList from '../../components/IssueList/IssueList';
import Chat from '../../components/Chat/Chat';
import useTypedSelector from '../../hooks/useTypedSelector';
import style from './Lobby.module.scss';
import { addUsers, clearRoomData } from '../../store/roomDataReducer';
import { setShowWriter, setWriter } from '../../store/userTypingReducer';
import Timer from '../../components/Timer/Timer';
import { PathRoutes, SocketTokens, TextForUser } from '../../types/types';
import { emit, on } from '../../services/socket';
import { startTime } from '../../store/timerReducer';
import { changeIssue } from '../../store/issuesReducer';
import { changeModalActivity, setNameOfDeletedUser } from '../../store/votingReducer';
import VotingPopup from '../../components/VotingPopup/VoitingPopup';
import { deleteRoom } from '../../services/api';
import { setVisibleChat } from '../../store/settingsReducer';

const Lobby: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { roomId } = useParams<{ roomId: string }>();

  const { users, admin, isDealer } = useTypedSelector((state) => state.roomData);
  const votingData = useTypedSelector((state) => state.voting);
  const visibleChat = useTypedSelector((state) => state.settings.visibleChat);

  const handleVisibleChat = () => dispatch(setVisibleChat(!visibleChat));

  useEffect(() => {
    on(SocketTokens.EnteredRoom, (data) => {
      dispatch(addUsers(data.user));
      message.info(`${data.user.name}, ${TextForUser.EnteredRoom}`);
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
      message.info(`${data.user} ${TextForUser.LeaveRoom}`);
    });

    on(SocketTokens.CancelVoting, () => {
      message.info(TextForUser.CancelVoting);
    });

    if (!isDealer) {
      on(SocketTokens.SendUserDisconnected, (data) => {
        message.warning(`${data}, ${TextForUser.UserDisconnected}`);
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

  const handleStartGame = () => {
    history.push(`${PathRoutes.Game}/${roomId}`);
  };

  const handleCancelGame = async () => {
    try {
      await deleteRoom({ data: { id: roomId } });
      emit(SocketTokens.DisconnectAll, { roomId });
      dispatch(clearRoomData());
      history.push(PathRoutes.Home);
    } catch (err) {
      message.error(`${err}`);
    }
  };

  return (
    <>
      <div className={style.lobbyPage}>
        {/* {убрать таймер потом, когда будет страница game} */}
        <Timer />
        {visibleChat ? <Chat /> : null}
        <Title editAvailable={isDealer} />
        <p className={style.scramMaster}>Scram master:</p>
        <div className={style.card}>
          {users.length ? (
            <UserCard
              jobStatus={admin.position}
              name={admin.name}
              lastName={admin.lastName}
              avatar={admin.avatarUrl}
              id={admin.id}
              role={admin.role}
            />
          ) : null}
          <Button type="primary" size="large" style={{ marginLeft: '2rem' }} onClick={handleVisibleChat}>
            Open/Close Chat
          </Button>
        </div>
        {isDealer ? <LinkToLobby /> : null}
        <BtnsControl>
          <Button type="primary" size="large" onClick={handleStartGame}>
            Start Game
          </Button>
          <Button type="ghost" size="large" onClick={handleCancelGame}>
            Cancel game
          </Button>
        </BtnsControl>
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
