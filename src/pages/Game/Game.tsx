import IssueList from '../../components/IssueList/IssueList';
import Planning from '../../components/Planning/Planning';
import Timer from '../../components/Timer/Timer';
import UserCard from '../../components/UserCard/UserCard';
import BtnsControl from '../../components/BtnsControl/BtnsControl';
import useTypedSelector from '../../hooks/useTypedSelector';
import style from './Game.module.scss';

const Game: React.FC = () => {
  const { users } = useTypedSelector((state) => state.roomData);

  return (
    <div className={style.gamePage}>
      <div className={style.scramControl}>
        <Planning />
        <p className={style.scramMaster}>Scram master:</p>
        <div className={style.fieldControl}>
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
          <div className={style.btns}>
            <BtnsControl />
          </div>
        </div>
        <div className={style.field}>
          <IssueList />
          <div className={style.timer}>
            <Timer />
          </div>
        </div>
      </div>
      <div className={style.userControl}>
        <div className={style.score}>
          <p>Score:</p>
        </div>
        <div className={style.players}>
          <p>Players:</p>
        </div>
      </div>
    </div>
  );
};

export default Game;
