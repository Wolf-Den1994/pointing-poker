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
    case IssueActions.ADD_ISSUE: {
      return {
        ...state,
        issueList: [...state.issueList, { ...defaultIssue, taskName: action.payload }],
      };
    }

    case IssueActions.REMOVE_ISSUE:
      return { ...state, issueList: state.issueList.filter((issue) => issue.taskName !== action.payload) };

    case IssueActions.EDIT_ISSUE: {
      const findTask = state.issueList.find((item) => item.taskName === action.payload.oldIssue) || defaultIssue;
      const index = state.issueList.findIndex((issue) => issue.taskName === action.payload.oldIssue);
      const newIssuesArray = [...state.issueList];
      newIssuesArray[index] = { ...findTask, taskName: action.payload.newIssue };
      return { ...state, issueList: newIssuesArray };
    }

    case IssueActions.CHANGE_ISSUES:
      return { ...state, issueList: action.payload };

    case IssueActions.ADD_GRADES: {
      const findTask = state.issueList.find((item) => item.taskName === action.payload.taskName) || defaultIssue;
      return {
        ...state,
        issueList: [...state.issueList, { ...findTask, grades: action.payload.grades }],
      };
    }

    case IssueActions.REMOVE_GRADES:
      return {
        ...state,
        issueList: state.issueList.filter((issue) => issue.grades[action.payload] !== action.payload),
      };

    case IssueActions.EDIT_GRADES: {
      const findTask = state.issueList.find((item) => item.taskName === action.payload.oldIssue) || defaultIssue;
      const index = state.issueList.findIndex((issue) => issue.taskName === action.payload.oldIssue);
      const newIssuesArray = [...state.issueList];
      newIssuesArray[index] = { ...findTask, grades: action.payload.newIssue };
      return { ...state, issueList: newIssuesArray };
    }

    case IssueActions.SET_ACTIVE:
      return {
        ...state,
        issueList: state.issueList.map((item) => ({ ...item, isActive: item.taskName === action.payload })),
      };

    default:
      return state;
  }
};

interface IGrades {
  name: string;
  grade: number | null;
}

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

interface IIssueActionsArrayIIssueData {
  type: IssueActions;
  payload: IIssueData[];
}

interface IAddGrades {
  grades: IGrades;
  taskName: string;
}

interface IIssueActionsAddGrade {
  type: IssueActions;
  payload: IAddGrades;
}

interface INewGrades {
  oldIssue: string;
  newIssue: INewGrades;
}

interface IEditGrades {
  type: IssueActions;
  payload: INewGrades;
}

interface IIssueActionEditGrade {
  type: IssueActions;
  payload: IEditGrades;
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

export const editGrades = (payload: IEditGrades): IIssueActionEditGrade => ({
  type: IssueActions.EDIT_ISSUE,
  payload,
});

export const setActiveIssue = (payload: string): IIssueActionsString => ({
  type: IssueActions.SET_ACTIVE,
  payload,
});
