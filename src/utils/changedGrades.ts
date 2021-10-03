import { IIssueGrade } from '../types/types';

export const changeGrades = (grades: IIssueGrade[], newGrade: IIssueGrade): IIssueGrade[] => {
  const newGradesArray = [...grades];
  const existGrade = newGradesArray.find((grade) => grade.name === newGrade.name);
  return existGrade
    ? newGradesArray.map((grade) => {
        if (grade.name === newGrade.name) return { ...grade, grade: newGrade.grade };
        return grade;
      })
    : [...newGradesArray, newGrade];
};
