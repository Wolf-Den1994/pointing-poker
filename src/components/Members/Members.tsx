import useTypedSelector from '../../hooks/useTypedSelector';
import UserCard from '../UserCard/UserCard';
import style from './Members.module.scss';

const Members: React.FC = () => {
  const { users } = useTypedSelector((state) => state.roomData);

  console.log(users);

  const onlyTeamMembers = users.filter((item, index) => index !== 0);
  const elements = onlyTeamMembers.map((item) => (
    <UserCard key={item.name + item.lastName + item.position} jobStatus={item.position} member={item.name} />
  ));
  return (
    <div className={style.members}>
      <p className={style.title}>Members:</p>
      <div className={style.users}>{elements}</div>
    </div>
  );
};

export default Members;
