import { v4 as uuidv4 } from 'uuid';
import { Button } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import IssueList from '../../components/IssueList/IssueList';
import Title from '../../components/Title/Title';
import Timer from '../../components/Timer/Timer';
import UserCard from '../../components/UserCard/UserCard';
import BtnsControl from '../../components/BtnsControl/BtnsControl';
import useTypedSelector from '../../hooks/useTypedSelector';
import style from './Game.module.scss';
import { LayoutViews } from '../../types/types';
import GameSettingsPopup from '../../components/GameSettingsPopup/GameSettingsPopup';
import BtnChat from '../../components/BtnChat/BtnChat';
import Statistics from '../../components/Statistics/Statistics';
import { setStatistics } from '../../store/statisticsReducer';

const statistics = [
  {
    card: '10',
    grades: '42.8%',
  },
  {
    card: '5',
    grades: '28.5%',
  },
  {
    card: 'pass',
    grades: '28.5%',
  },
];

const Game: React.FC = () => {
  const dispatch = useDispatch();

  const { users, admin, isDealer } = useTypedSelector((state) => state.roomData);
  const { issueList } = useTypedSelector((state) => state.issues);
  const { showTimer } = useTypedSelector((state) => state.settings.settings);

  const handleStopGame = () => {};

  useEffect(() => {
    dispatch(setStatistics(statistics));
  }, []);

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
            <IssueList view={LayoutViews.Vertical} />
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
    </div>
  );
};

export default Game;
