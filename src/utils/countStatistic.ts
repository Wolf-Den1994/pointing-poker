import { IIssueData, IStatisticData } from '../types/types';

const countStatistics = (issue: IIssueData): IStatisticData => {
  const obj: { [grade: string]: number } = {};

  issue.grades.forEach((grade) => {
    const userGrade = grade.grade as string;

    if (userGrade in obj) {
      obj[userGrade] += 1;
    } else {
      obj[userGrade] = 1;
    }
  });

  const resultArr = Object.keys(obj);

  const result: { card: string; averageValue: string }[] = resultArr.map((el: string) => {
    return {
      card: el,
      averageValue: String(((obj[el] * 100) / issue.grades.length).toFixed(2)),
    };
  });

  return { taskName: issue.taskName, statisticValues: result };
};

export default countStatistics;