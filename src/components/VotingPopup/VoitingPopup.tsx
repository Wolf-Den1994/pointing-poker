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
          <div key="modal-voting-wrapper" className={styles.voiting__footer}>
            <Button className={styles.voiting__btn_ok} type="primary" onClick={handlerOk}>
              Yes
            </Button>
            <Button className={styles.voiting__btn_cancel} type="ghost" onClick={handlerCancel}>
              No
            </Button>
          </div>,
        ]}
      >
        <h2 className={styles.voiting__header}>Kick the player?</h2>
        <p className={styles.voiting__text}>
          Do you want to remove player <span className={styles.voiting__user}>{userName}</span> from game session?
        </p>
      </Modal>
    </div>
  );
};

export default VotingCard;
