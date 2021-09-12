import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import useTypedSelector from '../../hooks/useTypedSelector';

const Admin: React.FC = () => {
  const roomData = useTypedSelector((state) => state.roomData);
  const dispatch = useDispatch();
  const history = useHistory();
  const { roomId } = useTypedSelector((state) => state.roomData);
  return <div>{roomId}</div>;
};

export default Admin;
