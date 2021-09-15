import { Button, Modal } from 'antd';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import useTypedSelector from '../../hooks/useTypedSelector';
import { changeModalActivity, setNameOfDeletedUser } from '../../store/votingReducer';
import socket from '../../utils/soketIO';
import styles from './Voiting.module.scss';

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
    <div className={styles.module}>
      <Modal
        closable={false}
        visible={isVisible}
        centered
        footer={[
          <div key="modal-voting-wrapper" className={styles.module__footer}>
            <Button className={styles.module__btn_ok} type="primary" onClick={handlerOk}>
              Yes
            </Button>
            <Button className={styles.module__btn_cancel} type="ghost" onClick={handlerCancel}>
              No
            </Button>
          </div>,
        ]}
      >
        <h2 className={styles.module__header}>Kick the player?</h2>
        <p className={styles.module__text}>
          Do you want to remove player <span className={styles.module__user}>{userName}</span> from game session?
        </p>
      </Modal>
    </div>
  );
};

export default VotingCard;
