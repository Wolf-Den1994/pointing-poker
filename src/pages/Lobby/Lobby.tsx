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
import ImportFile from '../../components/ImportFile/ImportFile';
import useTypedSelector from '../../hooks/useTypedSelector';
import style from './Lobby.module.scss';
import { PathRoutes, SocketTokens } from '../../types/types';
import { emit, on } from '../../services/socket';
import { startTime } from '../../store/timerReducer';
import VotingPopup from '../../components/VotingPopup/VotingPopup';
import BtnChat from '../../components/BtnChat/BtnChat';
import { changeSettings, setCards } from '../../store/settingsReducer';
import { disconnectUsers } from '../../utils/disconnectUsers';
import { setGameRoom } from '../../store/roomDataReducer';
import { deleteLocalStorage } from '../../utils/localStorage.service';

const Lobby: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { roomId } = useParams<{ roomId: string }>();

  const { users, admin, isDealer } = useTypedSelector((state) => state.roomData);
  const timer = useTypedSelector((state) => state.timer);
  const votingData = useTypedSelector((state) => state.voting);
  const { settings, cardSet } = useTypedSelector((state) => state.settings);

  useEffect(() => {
    on(SocketTokens.RedirectUserToGamePage, (data) => {
      if (data.timer) dispatch(startTime(data.timer));
      dispatch(changeSettings(data.settings));
      dispatch(setCards(data.cardSet));
      history.push(`${PathRoutes.Game}/${roomId}`);
    });

    window.onload = () => {
      deleteLocalStorage(roomId);
      history.push(PathRoutes.Home);
    };

    return () => {
      window.onload = null;
    };
  }, []);

  const handleStartGame = () => {
    const time = settings.showTimer ? timer.time : null;
    emit(SocketTokens.RedirectAllToGamePage, { roomId, settings, cardSet, timer: time });
    dispatch(setGameRoom('game'));
    history.push(`${PathRoutes.Game}/${roomId}`);
  };

  const handleCancelGame = async () => {
    try {
      await disconnectUsers(roomId, isDealer);
      deleteLocalStorage(roomId);
      history.push(PathRoutes.Home);
    } catch (err) {
      message.error(`${err}`);
    }
  };

  return (
    <>
      <div className={style.lobbyPage}>
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
            <ImportFile />
            <GameSettings />
            <CustomizeCards />
          </>
        ) : null}
        <BtnChat />
      </div>
      {votingData.isVisible ? <VotingPopup userName={votingData.userName} isVisible={true} /> : null}
    </>
  );
};

export default Lobby;
