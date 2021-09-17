import { Button, Modal } from 'antd';
import { useState } from 'react';
import GameSettings from '../GameSettings/GameSettings';

const GameSettingsPopup: React.FC = () => {
  const [modalActive, setModalActive] = useState(false);

  const handleOpenModal = () => setModalActive(true);

  const handleCloseModal = () => setModalActive(false);

  return (
    <>
      <Button onClick={handleOpenModal}>Game Settings</Button>
      <Modal onOk={handleCloseModal} onCancel={handleCloseModal} visible={modalActive} cancelText width={680}>
        <GameSettings />
      </Modal>
    </>
  );
};

export default GameSettingsPopup;
