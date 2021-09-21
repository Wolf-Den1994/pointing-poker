import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Button, message } from 'antd';
import moment from 'moment';
import IssueList from '../../components/IssueList/IssueList';
import Title from '../../components/Title/Title';
import Timer from '../../components/Timer/Timer';
import UserCard from '../../components/UserCard/UserCard';
import BtnsControl from '../../components/BtnsControl/BtnsControl';
import useTypedSelector from '../../hooks/useTypedSelector';
import style from './Game.module.scss';
import { LayoutViews, SocketTokens, PathRoutes } from '../../types/types';
import GameSettingsPopup from '../../components/GameSettingsPopup/GameSettingsPopup';
import BtnChat from '../../components/BtnChat/BtnChat';
import Statistics from '../../components/Statistics/Statistics';
import { addUserRequest } from '../../store/requestsForEnterReducer';
import RequestPopup from '../../components/RequestPopup/RequestPopup';
import { deleteRoom } from '../../services/api';
import { emit, on } from '../../services/socket';
import { clearRoomData } from '../../store/roomDataReducer';
import { startTime } from '../../store/timerReducer';
import { changeSettings } from '../../store/settingsReducer';
import { setStatistics } from '../../store/statisticsReducer';
import { setActiveIssue } from '../../store/issuesReducer';
import VotingPopup from '../../components/VotingPopup/VoitingPopup';

const statistics = [
  {
    card: '10',
    averageGrade: '42.8%',
  },
  {
    card: '5',
    averageGrade: '28.5%',
  },
  {
    card: 'pass',
    averageGrade: '28.5%',
  },
];

const Game: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { roomId } = useParams<{ roomId: string }>();

  const { users, admin, isDealer } = useTypedSelector((state) => state.roomData);
  const { issueList } = useTypedSelector((state) => state.issues);
  const { showTimer } = useTypedSelector((state) => state.settings.settings);
  const { requestsFromUsers } = useTypedSelector((state) => state.requests);
  const votingData = useTypedSelector((state) => state.voting);

  const handleStopGame = async () => {
    try {
      await deleteRoom({ data: { id: roomId } });
      emit(SocketTokens.DisconnectAll, { roomId });
      dispatch(clearRoomData());
      history.push(PathRoutes.Home);
    } catch (err) {
      message.error(`${err}`);
    }
  };

  useEffect(() => {
    dispatch(setStatistics(statistics));
    on(SocketTokens.AdminsAnswerForRequest, (data) => {
      dispatch(addUserRequest(data.userId));
    });

    on(SocketTokens.GetNewSettingsFromAdmin, (data) => {
      dispatch(startTime(data.time));
      dispatch(changeSettings({ ...data.settings, roundTime: moment(data.settings.roundTime, 'mm:ss') }));
    });

    window.onload = () => {
      history.push(PathRoutes.Home);
    };

    return () => {
      window.onload = null;
    };
  }, []);

  const handleIssueHighlight = (task: string) => {
    dispatch(setActiveIssue(task));
  };

  return (
    <div className={style.gamePage}>
      <div className={style.gameInner}>
        <div className={style.scramControl}>
          <Title editAvailable={false} />
          <p className={style.scramMaster}>Scram master:</p>
          <div className={style.fieldControl}>
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
          </div>
          <div className={style.btns}>
            <BtnsControl>
              <Button type="primary" size="large" onClick={handleStopGame}>
                Stop Game
              </Button>
            </BtnsControl>
          </div>
          {isDealer ? <GameSettingsPopup /> : null}
          <div className={style.field}>
            <IssueList view={LayoutViews.Vertical} onHighlight={handleIssueHighlight} enableHighlight />
            <div className={style.timer}>{showTimer ? <Timer /> : null}</div>
          </div>
          <Statistics />
        </div>
        <div className={style.userControl}>
          <div className={style.score}>
            <p className={style.title}>Score:</p>
            {issueList.map((item, index) =>
              Object.keys(item.grades).length ? (
                <div key={item.grades[index].name}>{item.grades[index].name}</div>
              ) : null,
            )}
          </div>
          <div className={style.players}>
            <p className={style.title}>Players:</p>
            {users.length &&
              users.map((item, index) =>
                index !== 0 ? (
                  <UserCard
                    key={uuidv4()}
                    jobStatus={item.position}
                    name={item.name}
                    lastName={item.lastName}
                    avatar={item.avatarUrl}
                    id={item.id}
                    role={item.role}
                    size="small"
                  />
                ) : null,
              )}
          </div>
        </div>
      </div>
      <BtnChat />
      {votingData.isVisible ? <VotingPopup userName={votingData.userName} isVisible={true} /> : null}
      {!requestsFromUsers.length ? null : <RequestPopup />}
    </div>
  );
};

export default Game;
