import { AnyAction } from 'redux';
import { IssueActions } from './actionTypes';

interface IInitialStateIssues {
  issueList: string[];
}

const initialState: IInitialStateIssues = {
  issueList: [],
};

export const issuesReducer = (state = initialState, action: AnyAction): typeof initialState => {
  switch (action.type) {
    case IssueActions.ADD_ISSUE:
      return { ...state, issueList: [...state.issueList, action.payload] };

    case IssueActions.REMOVE_ISSUE:
      return { ...state, issueList: state.issueList.filter((issue) => issue !== action.payload) };

    case IssueActions.EDIT_ISSUE: {
      const index = state.issueList.findIndex((issue) => issue === action.payload.oldIssue);
      const newIssuesArray = [...state.issueList];
      newIssuesArray[index] = action.payload.newIssue;
      return { ...state, issueList: newIssuesArray };
    }

    case IssueActions.CHANGE_ISSUES:
      return { ...state, issueList: action.payload };

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
  newIssue: string;
}

interface IIssueActionsEdit {
  type: IssueActions;
  payload: INewIssue;
}

interface IIssueActionsArrayStrings {
  type: IssueActions;
  payload: string[];
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

export const changeIssue = (payload: string[]): IIssueActionsArrayStrings => ({
  type: IssueActions.CHANGE_ISSUES,
  payload,
});
