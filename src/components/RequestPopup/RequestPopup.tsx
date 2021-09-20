import { Button, Modal } from 'antd';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import useTypedSelector from '../../hooks/useTypedSelector';
import { emit } from '../../services/socket';
import { deleteUserRequest } from '../../store/requestsForEnterReducer';
import { SocketTokens } from '../../types/types';
import styles from './RequestPopup.module.scss';

const RequestPopup: FC = () => {
  const dispatch = useDispatch();

  const { requestsFromUsers } = useTypedSelector((state) => state.requests);

  const handleRequest = (event: React.MouseEvent) => {
    const btn = event.currentTarget as HTMLInputElement;
    const response = btn.name === 'confirm';
    emit(SocketTokens.ResponseForEnteringRequest, { id: btn.dataset.id, response });
    dispatch(deleteUserRequest(btn.dataset.id as string));
  };

  return (
    <>
      {requestsFromUsers.map((el) => {
        return (
          <div key={el} className={styles.request}>
            <Modal
              closable={false}
              visible={true}
              centered
              footer={[
                <div key="modal-voting-wrapper">
                  <Button type="primary" size="large" data-id={el} name="confirm" onClick={handleRequest}>
                    Confirm
                  </Button>
                  <Button type="ghost" size="large" data-id={el} name="reject" onClick={handleRequest}>
                    Reject
                  </Button>
                </div>,
              ]}
            >
              <h2 className={styles.header}>
                Allow the user with id <span className={styles.user}>{el}</span> enter the room
              </h2>
            </Modal>
          </div>
        );
      })}
    </>
  );
};

export default RequestPopup;
