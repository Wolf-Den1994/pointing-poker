import { IIssueGrade } from '../types/types';

export const changeGrades = (grades: IIssueGrade[], newGrade: IIssueGrade): IIssueGrade[] => {
  const existGrade = grades.find((grade) => grade.name === newGrade.name);
  return existGrade
    ? grades.map((grade) => {
        if (grade.name === newGrade.name) return { ...grade, grade: newGrade.grade };
        return grade;
      })
    : [...grades, newGrade];
};
