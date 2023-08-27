import { Button, Modal } from 'antd';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { emit } from '../../services/socket';
import { changeModalActivity, setNameOfDeletedUser } from '../../store/votingReducer';
import { SocketTokens, VotingVoit } from '../../types/types';
import styles from './VotingPopup.module.scss';

interface IModalVisibilityProps {
  isVisible: boolean;
  userName: string;
}

const VotingPopup: FC<IModalVisibilityProps> = ({ isVisible, userName }) => {
  const dispatch = useDispatch();

  const { roomId } = useParams<{ roomId: string }>();

  const resetVotingData = () => {
    dispatch(setNameOfDeletedUser(''));
    dispatch(changeModalActivity(false));
  };

  const handleCancel = () => {
    emit(SocketTokens.ToVoteFor, { voice: VotingVoit.Against, user: userName, roomId });
    resetVotingData();
  };

  const handleOk = () => {
    emit(SocketTokens.ToVoteFor, { voice: VotingVoit.For, user: userName, roomId });
    resetVotingData();
  };

  return (
    <div className={styles.voiting}>
      <Modal
        closable={false}
        open={isVisible}
        centered
        footer={[
          <div key="modal-voting-wrapper">
            <Button type="primary" size="large" onClick={handleOk}>
              Yes
            </Button>
            <Button type="ghost" size="large" onClick={handleCancel}>
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

export default VotingPopup;
