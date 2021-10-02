import { IGradesObject, IIssueData, IStatisticData, IStatisticValues } from '../types/types';

const countStatistics = (issue: IIssueData): IStatisticData => {
  const gradesObject = issue.grades.reduce((acc, item) => {
    const userGrade = item.grade;
    if (userGrade) {
      if (acc[userGrade]) {
        acc[userGrade] += 1;
      } else {
        acc[userGrade] = 1;
      }
    }
    return acc;
  }, {} as IGradesObject);

  const gradesArray = Object.keys(gradesObject);

  const sumValues = gradesArray.reduce((prev, curr) => (curr === 'pass' ? prev : prev + +curr), 0);
  const counterPass = gradesArray.reduce((prev, curr) => (curr === 'pass' ? prev + 1 : prev), 0);

  const lengthAverageValue = sumValues / (gradesArray.length - counterPass) || 'In Progress...';

  const statisticValues: IStatisticValues[] = gradesArray.map((grade: string) => {
    const averageValue = String(((gradesObject[grade] * 100) / issue.grades.length).toFixed(2));
    return {
      card: grade,
      averageValue,
      lengthAverageValue,
    };
  });

  return { taskName: issue.taskName, statisticValues, lengthAverageValue };
};

export default countStatistics;
