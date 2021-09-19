import { AnyAction } from 'redux';
import { IInitialStateIssues, IIssueData } from '../types/types';
import { IssueActions } from './actionTypes';

const initialState: IInitialStateIssues = { issueList: [] };

export const issuesReducer = (state = initialState, action: AnyAction): typeof initialState => {
  switch (action.type) {
    case IssueActions.ADD_ISSUE:
      return {
        ...state,
        issueList: [
          ...state.issueList,
          {
            taskName: action.payload,
            grades: state.issueList.find((item) => item.taskName === action.payload)?.grades || [],
            isActive: state.issueList.find((item) => item.taskName === action.payload)?.isActive || false,
          },
        ],
      };

    case IssueActions.REMOVE_ISSUE:
      return { ...state, issueList: state.issueList.filter((issue) => issue.taskName !== action.payload) };

    case IssueActions.EDIT_ISSUE: {
      const index = state.issueList.findIndex((issue) => issue.taskName === action.payload.oldIssue);
      const newIssuesArray = [...state.issueList];
      newIssuesArray[index] = action.payload.newIssue;
      return { ...state, issueList: newIssuesArray };
    }

    case IssueActions.CHANGE_ISSUES:
      return { ...state, issueList: action.payload };

    case IssueActions.ADD_GRADES:
      return {
        ...state,
        issueList: [
          ...state.issueList,
          {
            taskName: state.issueList.find((item) => item.taskName === action.payload.taskName)?.taskName || '',
            grades: action.payload.grades,
            isActive: state.issueList.find((item) => item.taskName === action.payload.taskName)?.isActive || false,
          },
        ],
      };

    case IssueActions.REMOVE_GRADES:
      return {
        ...state,
        issueList: state.issueList.filter((issue) => issue.grades[action.payload] !== action.payload),
      };

    case IssueActions.SET_ACTIVE: {
      const findTask = state.issueList.find((item) => item.taskName === action.payload);
      if (findTask) {
        findTask.isActive = !findTask.isActive;
        const index = state.issueList.findIndex((issue) => issue.taskName === action.payload);

        const copyIssues = [...state.issueList];
        const newIssuesArray = copyIssues.map((item) => (item.isActive ? { ...item, isActive: false } : item));
        newIssuesArray[index] = findTask;
        return { ...state, issueList: newIssuesArray };
      }
      return state;
    }

    default:
      return state;
  }
};

interface IIssueActionsString {
  type: IssueActions;
  payload: string;
}

interface INewIssue {
  oldIssue: string;
  newIssue: IIssueData;
}

interface IIssueActionsEdit {
  type: IssueActions;
  payload: INewIssue;
}

interface IIssueActionsArrayIIssueData {
  type: IssueActions;
  payload: IIssueData[];
}

interface IAddGrades {
  grades: {
    [key: string]: number | null;
  };
  taskName: string;
}

interface IIssueActionsAddGrade {
  type: IssueActions;
  payload: IAddGrades;
}

export const addIssue = (payload: string): IIssueActionsString => ({
  type: IssueActions.ADD_ISSUE,
  payload,
});

export const removeIssue = (payload: string): IIssueActionsString => ({
  type: IssueActions.REMOVE_ISSUE,
  payload,
});

export const editIssue = (payload: INewIssue): IIssueActionsEdit => ({
  type: IssueActions.EDIT_ISSUE,
  payload,
});

export const changeIssue = (payload: IIssueData[]): IIssueActionsArrayIIssueData => ({
  type: IssueActions.CHANGE_ISSUES,
  payload,
});

export const addGrades = (payload: IAddGrades): IIssueActionsAddGrade => ({
  type: IssueActions.ADD_GRADES,
  payload,
});

export const removeGrades = (payload: string): IIssueActionsString => ({
  type: IssueActions.REMOVE_GRADES,
  payload,
});

export const setActiveIssue = (payload: string): IIssueActionsString => ({
  type: IssueActions.SET_ACTIVE,
  payload,
});
