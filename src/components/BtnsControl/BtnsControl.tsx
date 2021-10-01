import { Button, message } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import useTypedSelector from '../../hooks/useTypedSelector';
import { PathRoutes } from '../../types/types';
import { disconnectUsers } from '../../utils/disconnectUsers';
import style from './BtnsControl.module.scss';

interface IBtnsControlProps {
  children: React.ReactNode;
}

const BtnsControl: React.FC<IBtnsControlProps> = ({ children }: IBtnsControlProps) => {
  const { isDealer } = useTypedSelector((state) => state.roomData);
  const userName = useTypedSelector((state) => state.userData.name);

  const history = useHistory();

  const { roomId } = useParams<{ roomId: string }>();

  const handleExitGame = async () => {
    try {
      await disconnectUsers(roomId, isDealer, userName);
      history.push(PathRoutes.Home);
    } catch (err) {
      message.error(`${err}`);
    }
  };

  return (
    <div className={style.btnsControl}>
      {isDealer ? (
        <div className={style.control}>{children}</div>
      ) : (
        <div className={style.exit}>
          <Button type="ghost" size="large" onClick={handleExitGame}>
            Exit
          </Button>
        </div>
      )}
    </div>
  );
};

export default BtnsControl;
