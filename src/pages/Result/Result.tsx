import style from './Result.module.scss';
import IssueCard from '../../components/IssueCard/IssueCard';
import useTypedSelector from '../../hooks/useTypedSelector';
import ExportFile from '../../components/ExportFile/ExportFile';
import createElementsPlanning from '../../utils/createElementsPlanning';

const Result: React.FC = () => {
  const { statistics } = useTypedSelector((state) => state.statistics);

  return (
    <>
      <div className={style.wrapper}>
        <p className={style.tasks}>
          Spring {statistics.length} planning ({createElementsPlanning(statistics)})
        </p>
        <ExportFile />
        {statistics.map((elem) => {
          return <IssueCard key={elem.taskName} data={elem} />;
        })}
      </div>
    </>
  );
};

export default Result;
