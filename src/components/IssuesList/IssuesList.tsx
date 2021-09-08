import style from './IssuesList.module.scss';

const IssuesList: React.FC = () => {
  return (
    <div className={style.issuesList}>
      <p className={style.title}>Issues:</p>
    </div>
  );
};

export default IssuesList;
