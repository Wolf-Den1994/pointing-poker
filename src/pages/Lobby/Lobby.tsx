import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import BtnsLobby from '../../components/BtnsLobby/BtnsLobby';
import IssuesList from '../../components/IssuesList/IssuesList';
import LinkToLobby from '../../components/LinkToLobby/LinkToLobby';
import Members from '../../components/Members/Members';
import Planning from '../../components/Planning/Planning';
import UserCard from '../../components/UserCard/UserCard';
import useTypedSelector from '../../hooks/useTypedSelector';
import { changeDealer } from '../../store/lobbyReducer';
import style from './Lobby.module.scss';

const Lobby: React.FC = () => {
  const { user, users } = useTypedSelector((state) => state.lobby);

  const isDealer = users[0].name === user.name;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeDealer(isDealer));
  }, []);

  return (
    <div className={style.lobbyPage}>
      <Planning />
      <p className={style.scramMaster}>Scram master:</p>
      <div className={style.card}>
        <UserCard jobStatus={users[0].jobStatus} member={users[0].name} />
      </div>
      {isDealer ? <LinkToLobby /> : null}
      <BtnsLobby />
      <Members />
      {isDealer ? <IssuesList /> : null}
    </div>
  );
};

export default Lobby;
