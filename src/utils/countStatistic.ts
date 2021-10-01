import { IGradesObject, IIssueData, IStatisticData, IStatisticValues } from '../types/types';

const countStatistics = (issue: IIssueData): IStatisticData => {
  const gradesObject: IGradesObject = {};

  issue.grades.forEach((grade) => {
    const userGrade = grade.grade;

    if (userGrade) {
      if (gradesObject[userGrade]) {
        gradesObject[userGrade] += 1;
      } else {
        gradesObject[userGrade] = 1;
      }
    }
  });

  const gradesArray = Object.keys(gradesObject);

  const sumValues = gradesArray?.reduce((prev, curr) => (curr === 'pass' ? prev : prev + +curr), 0);

  let lengthAverageValue = '';
  // console.log(gradesArray, sumValues);

  if (sumValues) {
    let counterPass = 0;
    for (let i = 0; i < gradesArray.length; i += 1) {
      if (gradesArray[i] === 'pass') counterPass += 1;
    }
    lengthAverageValue = String(sumValues / (gradesArray.length - counterPass));
  }

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
