import { AnyAction } from 'redux';
import { IInitialStateIssues, IIssueData } from '../types/types';
import { IssueActions } from './actionTypes';

const defaultIssue = {
  taskName: '',
  grades: [],
  isActive: false,
};

const initialState: IInitialStateIssues = { issueList: [] };

export const issuesReducer = (state = initialState, action: AnyAction): typeof initialState => {
  switch (action.type) {
    case IssueActions.ADD_TASK: {
      return {
        ...state,
        issueList: [...state.issueList, { ...defaultIssue, taskName: action.payload }],
      };
    }

    case IssueActions.REMOVE_TASK:
      return { ...state, issueList: state.issueList.filter((issue) => issue.taskName !== action.payload) };

    case IssueActions.EDIT_TASK: {
      return {
        ...state,
        issueList: state.issueList.map((item) => ({
          ...item,
          taskName: item.taskName === action.payload.oldTaskName ? action.payload.newTaskName : item.taskName,
        })),
      };
    }

    case IssueActions.ADD_GRADES:
      return {
        ...state,
        issueList: state.issueList.map((issue) => {
          let userName;
          if (issue.taskName === action.payload.taskName) {
            userName = issue.grades.find((grade) => grade.name === action.payload.newGrade.name);
          }
          return issue.taskName === action.payload.taskName
            ? {
                ...issue,
                grades: userName
                  ? issue.grades.map((grade) =>
                      grade.name === action.payload.newGrade.name
                        ? { ...grade, grade: action.payload.newGrade.grade }
                        : grade,
                    )
                  : [...issue.grades, action.payload.newGrade],
              }
            : issue;
        }),
      };

    case IssueActions.REMOVE_GRADES:
      return {
        ...state,
        issueList: state.issueList.filter((issue) => issue.grades[action.payload] !== action.payload),
      };

    case IssueActions.EDIT_GRADES: {
      return {
        ...state,
        issueList: state.issueList.map((item) => ({
          ...item,
          grades: item.taskName === action.payload.taskName ? action.payload.newGrade : item.grades,
        })),
      };
    }

    case IssueActions.SET_ACTIVE:
      return {
        ...state,
        issueList: state.issueList.map((item) => ({
          ...item,
          isActive: item.taskName === action.payload && !item.isActive,
        })),
      };

    case IssueActions.CHANGE_ISSUES:
      return { ...state, issueList: action.payload };

    default:
      return state;
  }
};

interface IGrades {
  name: string;
  grade: string | null;
}

interface IIssueActionsString {
  type: IssueActions;
  payload: string;
}

interface INewIssue {
  oldTaskName: string;
  newTaskName: string;
}

interface IIssueActionsEdit {
  type: IssueActions;
  payload: INewIssue;
}

interface IIssueActionsArrayIIssueData {
  type: IssueActions;
  payload: IIssueData[];
}

interface INewGrades {
  taskName: string;
  newGrade: IGrades[];
}

interface IAddGrades {
  type: IssueActions;
  payload: INewGrade;
}

interface INewGrade {
  taskName: string;
  newGrade: IGrades;
}

interface IEditGrades {
  type: IssueActions;
  payload: INewGrades;
}

export const addIssue = (payload: string): IIssueActionsString => ({
  type: IssueActions.ADD_TASK,
  payload,
});

export const removeIssue = (payload: string): IIssueActionsString => ({
  type: IssueActions.REMOVE_TASK,
  payload,
});

export const editIssue = (payload: INewIssue): IIssueActionsEdit => ({
  type: IssueActions.EDIT_TASK,
  payload,
});

export const addGrades = (payload: INewGrade): IAddGrades => ({
  type: IssueActions.ADD_GRADES,
  payload,
});

export const removeGrades = (payload: string): IIssueActionsString => ({
  type: IssueActions.REMOVE_GRADES,
  payload,
});

export const editGrades = (payload: INewGrades): IEditGrades => ({
  type: IssueActions.EDIT_GRADES,
  payload,
});

export const setActiveIssue = (payload: string): IIssueActionsString => ({
  type: IssueActions.SET_ACTIVE,
  payload,
});

export const changeIssue = (payload: IIssueData[]): IIssueActionsArrayIIssueData => ({
  type: IssueActions.CHANGE_ISSUES,
  payload,
});
