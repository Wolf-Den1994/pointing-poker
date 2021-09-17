import { Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import useTypedSelector from '../../hooks/useTypedSelector';
import { deleteRoom } from '../../services/api';
import { emit } from '../../services/socket';
import { clearRoomData } from '../../store/roomDataReducer';
import { PathRoutes, SocketTokens } from '../../types/types';
import socket from '../../utils/soketIO';
import style from './BtnsLobby.module.scss';

const BtnsLobby: React.FC = () => {
  const { isDealer } = useTypedSelector((state) => state.roomData);
  const userName = useTypedSelector((state) => state.userData.name);

  const history = useHistory();
  const dispatch = useDispatch();

  const { roomId } = useParams<{ roomId: string }>();

  const handleStartGame = () => {
    history.push(PathRoutes.Game);
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

  const handleExitGame = () => {
    emit(SocketTokens.LeaveRoom, { roomId, user: userName, id: socket.id });
    history.push(PathRoutes.Home);
  };

  return (
    <div className={style.btnsLobby}>
      {isDealer ? (
        <div className={style.control}>
          <Button type="primary" size="large" className={style.button} onClick={handleStartGame}>
            Start Game
          </Button>
          <Button type="ghost" size="large" className={style.button} onClick={handleCancelGame}>
            Cancel game
          </Button>
        </div>
      ) : (
        <div className={style.exit}>
          <Button type="ghost" size="large" className={style.button} onClick={handleExitGame}>
            Exit
          </Button>
        </div>
      )}
    </div>
  );
};

export default BtnsLobby;
