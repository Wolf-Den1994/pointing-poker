import { Button, message } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useTypedSelector from '../../hooks/useTypedSelector';
import { emit } from '../../services/socket';
import { clearRoomData } from '../../store/roomDataReducer';
import { PathRoutes, BASE_URL, SocketTokens } from '../../types/types';
import socket from '../../utils/soketIO';
import style from './BtnsLobby.module.scss';

const BtnsLobby: React.FC = () => {
  const { isDealer } = useTypedSelector((state) => state.lobby);
  const roomData = useTypedSelector((state) => state.roomData);
  const userName = useTypedSelector((state) => state.userData.name);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleStartGame = () => {
    history.push(PathRoutes.Game);
  };

  const handleCancelGame = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/`, { data: { id: roomData.roomId } });
      emit(SocketTokens.DisconnectAll, { roomId: roomData.roomId });
      dispatch(clearRoomData());
      history.push(PathRoutes.Home);
    } catch (err) {
      message.error(`${err}`);
    }
  };

  const handleExitGame = () => {
    emit(SocketTokens.LeaveRoom, { roomId: roomData.roomId, user: userName, id: socket.id });
    history.push(PathRoutes.Home);
  };

  return (
    <div className={style.btnsLobby}>
      {isDealer ? (
        <div className={style.control}>
          <Button type="primary" size="large" className={style.button} onClick={handleStartGame}>
            Start Game
          </Button>
          <Button size="large" className={`${style.button} ${style.white}`} onClick={handleCancelGame}>
            Cancel game
          </Button>
        </div>
      ) : (
        <div className={style.exit}>
          <Button size="large" className={`${style.button} ${style.white}`} onClick={handleExitGame}>
            Exit
          </Button>
        </div>
      )}
    </div>
  );
};

export default BtnsLobby;
