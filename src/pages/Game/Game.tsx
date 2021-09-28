import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import {
  LogoutOutlined,
  PlayCircleOutlined,
  SaveOutlined,
  LineOutlined,
  UndoOutlined,
  RotateLeftOutlined,
} from '@ant-design/icons';
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
import { changeSettings, setActiveCard, setCards } from '../../store/settingsReducer';
import { setStatistics } from '../../store/statisticsReducer';
import { addGrades, editGrades, setActiveIssue } from '../../store/issuesReducer';
import VotingPopup from '../../components/VotingPopup/VotingPopup';
import { setOffProgress, setOnProgress } from '../../store/progressReducer';

const statistics = [
  {
    taskName: 'test',
    statisticValues: [
      {
        card: '101',
        averageValue: '42.8',
      },
      {
        card: '5',
        averageValue: '28.5',
      },
      {
        card: 'pass',
        averageValue: '28.5',
      },
    ],
  },
  {
    taskName: 'test2',
    statisticValues: [
      {
        card: '10',
        averageValue: '9.8',
      },
      {
        card: '58',
        averageValue: '26.5',
      },
      {
        card: 'pass',
        averageValue: '78.5',
      },
    ],
  },
];

let interval: NodeJS.Timeout;
// let isInProgress = 0;

const Game: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [disableButton, setDisableButton] = useState(false);
  const [allowSelectionCard, setAllowSelectionCard] = useState(true);
  const [activeIssueValue, setActiveIssueValue] = useState('');

  const { roomId } = useParams<{ roomId: string }>();

  const { users, admin, isDealer } = useTypedSelector((state) => state.roomData);
  const { name } = useTypedSelector((state) => state.userData);
  const { issueList } = useTypedSelector((state) => state.issues);
  const { settings, cardSet } = useTypedSelector((state) => state.settings);
  const { requestsFromUsers } = useTypedSelector((state) => state.requests);
  const votingData = useTypedSelector((state) => state.voting);
  const { progress } = useTypedSelector((state) => state.progress);
  const timer = useTypedSelector((state) => state.timer);

  const findIssue = issueList.find((issue) => issue.isActive);

  const handleIssueHighlight = (task: string) => {
    emit(SocketTokens.SendActiveIssueToUser, { roomId, issueName: task });
    setActiveIssueValue(task);
    dispatch(setActiveIssue(task));
    emit(SocketTokens.EditIssueGrade, { roomId, userData: { taskName: task, name, grade: 'In progress' } });
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
      dispatch(setCards(data.cardSet));
    });

    on(SocketTokens.RedirectToResultPage, () => {
      history.push(`${PathRoutes.Result}/${roomId}`);
    });

    on(SocketTokens.GetActiveIssue, (data) => {
      setActiveIssueValue(data.issueName);
      dispatch(setActiveIssue(data.issueName));
    });

    on(SocketTokens.GetNewIssueGrade, (data) => {
      dispatch(
        addGrades({
          taskName: data.userData.taskName,
          newGrade: { name: data.userData.name, grade: data.userData.grade },
        }),
      );
      dispatch(setOnProgress());
    });

    on('testON', () => {
      dispatch(setOnProgress());
    });

    on('testOFF', () => {
      dispatch(setOffProgress());
    });

    window.onload = () => {
      history.push(PathRoutes.Home);
    };

    return () => {
      window.onload = null;
    };
  }, []);

  const handleFlipCards = () => {
    emit(SocketTokens.OffProgress, { roomId, progress: false });
    dispatch(setOffProgress());
  };

  useEffect(() => {
    if (timer.time === 0) if (settings.autoFlipCards) handleFlipCards();
  }, [timer]);

  const handleResultGame = () => {
    emit(SocketTokens.RedirectAllToResultPage, { roomId });
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
        const newGrade = { ...grade, grade: null };
        emit(SocketTokens.EditIssueGrade, { roomId, userData: { taskName: activeIssue.taskName, ...newGrade } });
        return { ...newGrade };
      });
      dispatch(editGrades({ taskName: activeIssue.taskName, newGrade: newGradesArr }));
      setAllowSelectionCard(true);
      dispatch(setActiveCard(''));
    }
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
              <Button size="large" type="primary" onClick={handleFlipCards}>
                <RotateLeftOutlined />
                Flip Cards
              </Button>
              <Button size="large" type="primary" onClick={handleResultGame}>
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
          <Statistics activeIssue={activeIssueValue} />
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
            {users.map((member) => {
              const findGrade = findIssue?.grades.find((grade) => grade.name === member.name);
              if (findGrade?.grade === 'In progress' && !progress) {
                dispatch(setOnProgress());
                emit(SocketTokens.OnProgress, { roomId, progress: true });
              }
              if (progress && !isDealer) {
                return (
                  <div className={style.data} key={member.name}>
                    <span>In progress</span>
                  </div>
                );
              }
              return (
                <div className={style.data} key={member.name}>
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
