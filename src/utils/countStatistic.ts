import { IGradesObject, IIssueData, IStatisticData, IStatisticValues } from '../types/types';

const countStatistics = (issue: IIssueData): IStatisticData => {
  const gradesObject: IGradesObject = {};

  issue.grades.forEach((grade) => {
    const userGrade = grade.grade as string;

    if (userGrade in gradesObject) {
      gradesObject[userGrade] += 1;
    } else {
      gradesObject[userGrade] = 1;
    }
  });

  const gradesArray = Object.keys(gradesObject);

  const statisticValues: IStatisticValues[] = gradesArray.map((grade: string) => {
    const averageValue = String(((gradesObject[grade] * 100) / issue.grades.length).toFixed(2));
    return {
      card: grade,
      averageValue,
    };
  });

  return { taskName: issue.taskName, statisticValues };
};

export default countStatistics;
