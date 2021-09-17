import GameSettingsPopup from '../../components/GameSettingsPopup/GameSettingsPopup';
import useTypedSelector from '../../hooks/useTypedSelector';

const Game: React.FC = () => {
  const { isDealer } = useTypedSelector((state) => state.roomData);

  return <>{isDealer ? <GameSettingsPopup /> : null}</>;
};

export default Game;
