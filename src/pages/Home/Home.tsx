import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input, message } from 'antd';
import { useHistory } from 'react-router';
import socket from '../../utils/soketIO';
import imagePokerPlanning from '../../assets/images/poker-planning.png';
import style from './Home.module.scss';
import ModalRegistration from '../../components/ModalRegistration/ModalRegistration';
import { addMessage, addUsers, changeDealer } from '../../store/roomDataReducer';
import { GameRooms, PathRoutes, SocketTokens, TextForUser, UserRole } from '../../types/types';
import { on, connect, emit } from '../../services/socket';
import { getResourse } from '../../services/api';
import { setShowWriter, setWriter } from '../../store/userTypingReducer';
import { startTime } from '../../store/timerReducer';
import { changeIssue } from '../../store/issuesReducer';
import { changeModalActivity, setNameOfDeletedUser } from '../../store/votingReducer';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [modalActive, setModalActive] = useState(false);
  const [role, setRole] = useState('');
  const [id, setId] = useState('');
  const [roomId, setRoomId] = useState('');
  const [requestIsSend, setRequestIsSend] = useState(false);

  const showErrorMessage = () => {
    message.info(TextForUser.CancelEnterTheRoom);
  };

  const positiveResponse = () => {
    setId(socket.id);
    setRole(UserRole.Player);
    dispatch(changeDealer(false));
    setModalActive(true);
  };

  const getPermissionToEnterGame = async (roomName: string, adminId: string) => {
    if (roomName === GameRooms.GameLocked && requestIsSend) {
      showErrorMessage();
      return;
    }
    if (roomName === GameRooms.GameLocked) {
      emit(SocketTokens.RequestForEntering, { userId: socket.id, adminId });
      setRequestIsSend(true);
      return;
    }
    positiveResponse();
  };

  const handleStartNewGame = () => {
    setId(socket.id);
    setRole(UserRole.Admin);
    dispatch(changeDealer(true));
    setModalActive(true);
  };

  const handleChangeLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(e.target.value);
  };

  const handleConnectToGame = async () => {
    try {
      const response = await getResourse(roomId);
      const { data } = response;
      if (data) {
        getPermissionToEnterGame(data.gameRoom, data.admin.id);
      } else {
        message.error(TextForUser.RoomDoesNotExist);
      }
    } catch (err) {
      message.error(`${TextForUser.SomethingGoingWrong} ${err}`);
    }
  };

  useEffect(() => {
    on(SocketTokens.Disconnect, () => {
      window.location.reload();
      connect();
    });

    on(SocketTokens.EnteredRoom, (data) => {
      dispatch(addUsers(data.user));
      message.info(`${data.user.name}, ${TextForUser.EnteredRoom}`);
    });

    on(SocketTokens.SendMessage, (data) => {
      dispatch(addMessage(data));
    });

    on(SocketTokens.AdminsResponse, (data) => {
      if (data.response) {
        positiveResponse();
        message.info(TextForUser.AdminAllow);
      } else {
        message.error(TextForUser.AdminNotAllow);
      }
      setRequestIsSend(false);
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
  }, []);

  return (
    <>
      <div className={style.wrapper}>
        <img className={style.image} src={imagePokerPlanning} alt="poker-planning" />
        <div className={style.row}>
          <h1 className={style.title}>Start your planning:</h1>
          <div className={style.box}>
            <p className={style.session}>Create a session: </p>
            <Button type="primary" size="large" onClick={handleStartNewGame}>
              Start new game
            </Button>
          </div>
        </div>

        <div className={style.row}>
          <div className={`${style.box} ${style.box_lobby}`}>
            <p className={style.session}>
              Connect to lobby by <span>ID:</span>
            </p>
            <div className={style.connect}>
              <Input size="large" type="text" placeholder="ID" value={roomId} onChange={handleChangeLink} />
              <Button type="primary" size="large" onClick={handleConnectToGame}>
                Connect
              </Button>
            </div>
            <p>
              Enter <span className={style.span}>ID</span> to join the lobby.
            </p>
          </div>
        </div>
      </div>
      <ModalRegistration
        role={role}
        onRole={setRole}
        id={id}
        roomId={roomId}
        onRoomId={setRoomId}
        modalActive={modalActive}
        onModalActive={setModalActive}
      />
    </>
  );
};

export default Home;
