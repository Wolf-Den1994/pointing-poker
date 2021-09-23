import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { LogoutOutlined, PlayCircleOutlined, SaveOutlined, LineOutlined, UndoOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { Button, message } from 'antd';
import IssueList from '../../components/IssueList/IssueList';
import Title from '../../components/Title/Title';
import Timer from '../../components/Timer/Timer';
import UserCard from '../../components/UserCard/UserCard';
import BtnsControl from '../../components/BtnsControl/BtnsControl';
import GameCard from '../../components/GameCard/GameCard';
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
import { changeSettings, setActiveCard } from '../../store/settingsReducer';
import { setStatistics } from '../../store/statisticsReducer';
import { editGrades, setActiveIssue } from '../../store/issuesReducer';
import VotingPopup from '../../components/VotingPopup/VotingPopup';

const statistics = [
  {
    card: '101',
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

let interval: NodeJS.Timeout;

const Game: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [disableButton, setDisableButton] = useState(false);
  const [allowSelectionCard, setAllowSelectionCard] = useState(true);

  const { roomId } = useParams<{ roomId: string }>();

  const { users, admin, isDealer } = useTypedSelector((state) => state.roomData);
  const { issueList } = useTypedSelector((state) => state.issues);
  const { settings, cardSet } = useTypedSelector((state) => state.settings);
  const { requestsFromUsers } = useTypedSelector((state) => state.requests);
  const votingData = useTypedSelector((state) => state.voting);

  const findIssue = issueList.find((issue) => issue.isActive);

  const handleIssueHighlight = (task: string) => {
    dispatch(setActiveIssue(task));
  };

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
      dispatch(changeSettings(data.settings));
    });

    window.onload = () => {
      history.push(PathRoutes.Home);
    };

    return () => {
      window.onload = null;
    };
  }, []);

  const handleResultGame = () => {
    history.push(`${PathRoutes.Result}/${roomId}`);
  };

  let timeSeconds = settings.roundTime * 60;

  const handleStartRound = () => {
    setDisableButton(true);

    interval = setInterval(() => {
      dispatch(startTime((timeSeconds -= 1)));
      emit(SocketTokens.SetTimeOnTimer, { time: timeSeconds, roomId });
      if (timeSeconds <= 0) {
        dispatch(startTime(0));
        clearInterval(interval);
        // блокируем выбор карт пользователями, но, если Changing card in round end включена, то нет.
        if (settings.voteAfterRoundEnd) {
          setAllowSelectionCard(true);
        } else {
          setAllowSelectionCard(false);
        }
      }
    }, 1000);
  };

  const handleResetRound = () => {
    emit(SocketTokens.SetTimeOnTimer, { time: timeSeconds, roomId });
    setDisableButton(false);
    clearInterval(interval);
    dispatch(startTime(timeSeconds));

    const activeIssue = issueList.find((issue) => issue.isActive);
    if (activeIssue) {
      const newGradesArr = activeIssue.grades.map((grade) => {
        const newGrade = { ...grade, grade: 0 };
        return { ...newGrade };
      });
      dispatch(editGrades({ taskName: activeIssue.taskName, newGrade: newGradesArr }));
    }

    setAllowSelectionCard(true);
    dispatch(setActiveCard(''));
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
              <Button size="large" onClick={handleStopGame}>
                <LogoutOutlined />
                Stop Game
              </Button>
              <Button size="large" onClick={handleResultGame}>
                <SaveOutlined />
                Show the game Result
              </Button>
            </BtnsControl>
          </div>
          {isDealer ? (
            <div className={style.box}>
              <GameSettingsPopup />
              {settings.showTimer ? (
                <>
                  <Button type="primary" size="large" disabled={disableButton} onClick={handleStartRound}>
                    <PlayCircleOutlined />
                    Start Round
                  </Button>
                  <Button type="primary" size="large" onClick={handleResetRound}>
                    <UndoOutlined />
                    Reset Round
                  </Button>
                </>
              ) : null}
            </div>
          ) : null}
          <div className={style.field}>
            <IssueList view={LayoutViews.Vertical} onHighlight={handleIssueHighlight} enableHighlight />
            <div className={style.timer}>{settings.showTimer ? <Timer /> : null}</div>
          </div>
          <Statistics />
          {!settings.isDealerActive && isDealer ? null : (
            <div className={style.gameCards}>
              {cardSet.map(({ card, isActive }) =>
                isActive ? (
                  <GameCard key={card} allowSelection={allowSelectionCard} active="active">
                    {card}
                  </GameCard>
                ) : (
                  <GameCard key={card} allowSelection={allowSelectionCard}>
                    {card}
                  </GameCard>
                ),
              )}
            </div>
          )}
        </div>
        <div className={style.userControl}>
          <div className={style.score}>
            <p className={style.title}>Score:</p>
            {users.map((user) => {
              const findGrade = findIssue?.grades.find((grade) => grade.name === user.name);
              return (
                <div className={style.data} key={user.name}>
                  {findGrade?.grade ? (
                    <span>{findGrade?.grade}</span>
                  ) : (
                    <span className={style.dash}>
                      <LineOutlined />
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <div className={style.players}>
            <p className={style.title}>Players:</p>
            {users.length &&
              users.map((item) => (
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
              ))}
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
