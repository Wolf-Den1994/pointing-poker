import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, message } from 'antd';
import { useHistory, useParams } from 'react-router';
import moment from 'moment';
import Title from '../../components/Title/Title';
import UserCard from '../../components/UserCard/UserCard';
import BtnsControl from '../../components/BtnsControl/BtnsControl';
import LinkToLobby from '../../components/LinkToLobby/LinkToLobby';
import Members from '../../components/Members/Members';
import CustomizeCards from '../../components/CustomizeCards/CustomizeCards';
import GameSettings from '../../components/GameSettings/GameSettings';
import IssueList from '../../components/IssueList/IssueList';
import useTypedSelector from '../../hooks/useTypedSelector';
import style from './Lobby.module.scss';
import { addUsers, clearRoomData } from '../../store/roomDataReducer';
import { OptionSettings, PathRoutes, SocketTokens, TextForUser } from '../../types/types';
import { emit, on } from '../../services/socket';
import { startTime } from '../../store/timerReducer';
import VotingPopup from '../../components/VotingPopup/VoitingPopup';
import { deleteRoom } from '../../services/api';
import BtnChat from '../../components/BtnChat/BtnChat';
import { changeSettings } from '../../store/settingsReducer';

const Lobby: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { roomId } = useParams<{ roomId: string }>();

  const { users, admin, isDealer } = useTypedSelector((state) => state.roomData);
  const timer = useTypedSelector((state) => state.timer);
  const votingData = useTypedSelector((state) => state.voting);
  const { settings } = useTypedSelector((state) => state.settings);

  useEffect(() => {
    on(SocketTokens.EnteredRoom, (data) => {
      dispatch(addUsers(data.user));
      message.info(`${data.user.name}, ${TextForUser.EnteredRoom}`);
    });

    on(SocketTokens.RedirectUserToGamePage, (data) => {
      if (data.timer) dispatch(startTime(data.timer));
      dispatch(changeSettings({ ...data.settings, roundTime: moment(data.settings.roundTime, 'mm:ss') }));
      history.push(`${PathRoutes.Game}/${roomId}`);
    });

    window.onload = () => {
      history.push(PathRoutes.Home);
    };

    return () => {
      window.onload = null;
    };
  }, []);

  const handleStartGame = () => {
    const newSettings = { ...settings, roundTime: settings.roundTime.format() };
    const time = settings.showTimer ? timer.time : null;
    emit(SocketTokens.RedirectAllToGamePage, { roomId, settings: newSettings, timer: time });
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
            <GameSettings />
            {settings.scoreType !== OptionSettings.StoryPoint ? <CustomizeCards /> : null}
          </>
        ) : null}
        <BtnChat />
      </div>
      {votingData.isVisible ? <VotingPopup userName={votingData.userName} isVisible={true} /> : null}
    </>
  );
};

export default Lobby;
