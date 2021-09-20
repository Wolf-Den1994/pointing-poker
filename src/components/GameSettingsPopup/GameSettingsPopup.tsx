import { SettingOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useState } from 'react';
import { useParams } from 'react-router';
import GameSettings from '../GameSettings/GameSettings';
import useTypedSelector from '../../hooks/useTypedSelector';
import { SocketTokens } from '../../types/types';
import { emit } from '../../services/socket';

const GameSettingsPopup: React.FC = () => {
  const [modalActive, setModalActive] = useState(false);
  const { settings } = useTypedSelector((state) => state.settings);
  const { time } = useTypedSelector((state) => state.timer);
  const { roomId } = useParams<{ roomId: string }>();

  const handleOpenModal = () => setModalActive(true);

  const handleCloseModal = () => {
    const newSettings = { ...settings, roundTime: settings.roundTime.format() };
    emit(SocketTokens.SendNewSettingsToUsers, { roomId, settings: newSettings, time });
    setModalActive(false);
  };

  return (
    <>
      <Button onClick={handleOpenModal}>
        <SettingOutlined />
        Game Settings
      </Button>
      <Modal onOk={handleCloseModal} onCancel={handleCloseModal} visible={modalActive} cancelText width={680}>
        <GameSettings />
      </Modal>
    </>
  );
};

export default GameSettingsPopup;
