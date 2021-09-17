import { AnyAction } from 'redux';
import { IInitialStateIssues, IIssueData } from '../types/types';
import { IssueActions } from './actionTypes';

const initialState: IInitialStateIssues = { issueList: [] };

export const issuesReducer = (state = initialState, action: AnyAction): typeof initialState => {
  switch (action.type) {
    case IssueActions.ADD_ISSUE:
      return {
        ...state,
        issueList: [...state.issueList, { taskName: action.payload.taskName, grades: action.payload.grades }],
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

    // TODO: add grades,

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

interface IIssueActionsIIssueData {
  type: IssueActions;
  payload: IIssueData;
}

export const addIssue = (payload: IIssueData): IIssueActionsIIssueData => ({
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
