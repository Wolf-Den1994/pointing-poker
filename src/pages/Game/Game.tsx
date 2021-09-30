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
import { changeSettings, setActiveCard, setCards, disableActiveCards } from '../../store/settingsReducer';
import { addStatistics } from '../../store/statisticsReducer';
import { addGrades, editGrades, setActiveIssue } from '../../store/issuesReducer';
import VotingPopup from '../../components/VotingPopup/VotingPopup';
import { setOffProgress, setOnProgress } from '../../store/progressReducer';
import countStatistics from '../../utils/countStatistic';

let interval: NodeJS.Timeout;

const Game: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [disableButtonStart, setDisableButtonStart] = useState(true);
  const [disableButtonFlipCards, setDisableButtonFlipCards] = useState(true);
  const [allowSelectionCard, setAllowSelectionCard] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  const [activeIssueValue, setActiveIssueValue] = useState('');

  const { roomId } = useParams<{ roomId: string }>();

  const { users, admin, isDealer } = useTypedSelector((state) => state.roomData);
  const { issueList } = useTypedSelector((state) => state.issues);
  const { settings, cardSet } = useTypedSelector((state) => state.settings);
  const { requestsFromUsers } = useTypedSelector((state) => state.requests);
  const votingData = useTypedSelector((state) => state.voting);
  const { progress } = useTypedSelector((state) => state.progress);
  const timer = useTypedSelector((state) => state.timer);

  const findIssue = issueList.find((issue) => issue.isActive);

  const handleFlipCards = () => {
    setDisableButtonFlipCards(true);

    if (findIssue) {
      emit(SocketTokens.OffProgress, {
        roomId,
        progress: false,
        taskName: findIssue.taskName,
        grades: findIssue.grades,
        statistics: countStatistics(findIssue),
      });
      dispatch(addStatistics(countStatistics(findIssue)));
    }

    dispatch(setOffProgress());
    dispatch(disableActiveCards());
    setDisableButtonStart(false);

    setShowStatistics(true);
    emit(SocketTokens.ShowStatistics, { roomId, showStatistics: true });

    if (!settings.voteAfterRoundEnd) {
      setAllowSelectionCard(false);
      emit(SocketTokens.DisableCards, { roomId, enableCards: false });
    }
  };

  const handleIssueHighlight = (task: string) => {
    setDisableButtonFlipCards(true);
    emit(SocketTokens.SendActiveIssueToUser, { roomId, issueName: task });
    setActiveIssueValue(task);
    dispatch(setActiveIssue(task));
    setDisableButtonStart(false);

    if (findIssue?.isActive) {
      handleFlipCards();
      clearInterval(interval);
    }

    setAllowSelectionCard(false);
    emit(SocketTokens.DisableCards, { roomId, enableCards: false });
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

    on(SocketTokens.OnProgress, () => {
      dispatch(setOnProgress());
    });

    on(SocketTokens.OffProgress, (data) => {
      dispatch(setOffProgress());
      dispatch(disableActiveCards());
      dispatch(addStatistics(data.statistics));
    });

    on(SocketTokens.EnableCards, () => {
      setAllowSelectionCard(true);
    });

    on(SocketTokens.DisableCards, () => {
      setAllowSelectionCard(false);
    });

    on(SocketTokens.ShowStatistics, () => {
      setShowStatistics(true);
    });

    on(SocketTokens.HideStatistics, () => {
      setShowStatistics(false);
    });

    window.onload = () => {
      history.push(PathRoutes.Home);
    };

    return () => {
      window.onload = null;
    };
  }, []);

  useEffect(() => {
    if (!timer.time && settings.autoFlipCards) handleFlipCards();
  }, [timer]);

  const handleResultGame = () => {
    emit(SocketTokens.RedirectAllToResultPage, { roomId });
    history.push(`${PathRoutes.Result}/${roomId}`);
  };

  let timeSeconds = settings.roundTime * 60;

  const handleStartRound = () => {
    if (findIssue?.isActive) {
      setDisableButtonStart(true);

      if (settings.showTimer) {
        clearInterval(interval);
        interval = setInterval(() => {
          dispatch(startTime((timeSeconds -= 1)));
          emit(SocketTokens.SetTimeOnTimer, { time: timeSeconds, roomId });
          if (timeSeconds <= 0) {
            dispatch(startTime(0));
            clearInterval(interval);
          }
        }, 1000);
      }

      dispatch(setOnProgress());
      emit(SocketTokens.OnProgress, { roomId, progress: true });

      setAllowSelectionCard(true);
      emit(SocketTokens.EnableCards, { roomId, enableCards: true });

      setShowStatistics(false);
      emit(SocketTokens.HideStatistics, { roomId, showStatistics: false });

      setDisableButtonFlipCards(false);
    }
  };

  const handleResetRound = () => {
    if (findIssue?.isActive) {
      emit(SocketTokens.SetTimeOnTimer, { time: timeSeconds, roomId });
      setDisableButtonStart(false);
      clearInterval(interval);
      dispatch(startTime(timeSeconds));

      setShowStatistics(false);
      emit(SocketTokens.HideStatistics, { roomId, showStatistics: false });

      const activeIssue = issueList.find((issue) => issue.isActive);
      if (activeIssue) {
        const newGradesArr = activeIssue.grades.map((grade) => {
          const newGrade = { ...grade, grade: null };
          emit(SocketTokens.EditIssueGrade, { roomId, userData: { taskName: activeIssue.taskName, ...newGrade } });
          return { ...newGrade };
        });
        dispatch(editGrades({ taskName: activeIssue.taskName, newGrade: newGradesArr }));

        setAllowSelectionCard(false);
        emit(SocketTokens.DisableCards, { roomId, enableCards: false });

        dispatch(setActiveCard(''));
      }
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
              <Button size="large" type="primary" disabled={disableButtonFlipCards} onClick={handleFlipCards}>
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
              <Button type="primary" size="large" disabled={disableButtonStart} onClick={handleStartRound}>
                <PlayCircleOutlined />
                Start Round
              </Button>
              <Button type="primary" size="large" onClick={handleResetRound}>
                <UndoOutlined />
                Reset Round
              </Button>
            </div>
          ) : null}
          <div className={style.field}>
            <IssueList view={LayoutViews.Vertical} onHighlight={handleIssueHighlight} enableHighlight />
            <div className={style.timer}>{settings.showTimer ? <Timer /> : null}</div>
          </div>
          {showStatistics ? <Statistics activeIssue={activeIssueValue} /> : null}
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
