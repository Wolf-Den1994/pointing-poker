import { Space } from 'antd';
import useTypedSelector from '../../hooks/useTypedSelector';
import style from './TotalValueStatistics.module.scss';

interface ITotalValueProps {
  activeIssueTaskName: string;
}

const TotalValueStatistics: React.FC<ITotalValueProps> = ({ activeIssueTaskName }: ITotalValueProps) => {
  const { statistics } = useTypedSelector((state) => state.statistics);

  const findActiveIssue = statistics.find((el) => el.taskName === activeIssueTaskName);
  const getTotalValue = findActiveIssue?.lengthAverageValue;

  return (
    <div className={style.total}>
      <Space>
        <span className={style.totalTitle}>Total:</span>
        <span className={style.totalValue}>{getTotalValue}</span>
      </Space>
    </div>
  );
};

export default TotalValueStatistics;
