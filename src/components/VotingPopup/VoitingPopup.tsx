import { Button, Modal } from 'antd';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import useTypedSelector from '../../hooks/useTypedSelector';
import { changeModalActivity, setNameOfDeletedUser } from '../../store/votingReducer';
import socket from '../../utils/soketIO';
import styles from './VoitingPopup.module.scss';

interface ModalVisibility {
  isVisible: boolean;
  userName: string;
}

const VotingCard: FC<ModalVisibility> = ({ isVisible, userName }) => {
  const dispatch = useDispatch();

  const { roomId } = useTypedSelector((state) => state.roomData);

  const resetVoitingData = () => {
    dispatch(setNameOfDeletedUser(''));
    dispatch(changeModalActivity(false));
  };

  const handlerCancel = () => {
    socket.emit('toVoteFor', { voice: 'against', user: userName, roomId });
    resetVoitingData();
  };

  const handlerOk = () => {
    socket.emit('toVoteFor', { voice: 'for', user: userName, roomId });
    resetVoitingData();
  };

  return (
    <div className={styles.voiting}>
      <Modal
        closable={false}
        visible={isVisible}
        centered
        footer={[
          <div key="modal-voting-wrapper">
            <Button type="primary" size="large" onClick={handlerOk}>
              Yes
            </Button>
            <Button type="ghost" size="large" onClick={handlerCancel}>
              No
            </Button>
          </div>,
        ]}
      >
        <h2 className={styles.header}>Kick the player?</h2>
        <p className={styles.text}>
          Do you want to remove player <span className={styles.user}>{userName}</span> from game session?
        </p>
      </Modal>
    </div>
  );
};

export default VotingCard;
