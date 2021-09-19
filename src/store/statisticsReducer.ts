import { AnyAction } from 'redux';
import { StatisticsActions } from './actionTypes';

interface IStatisticData {
  card: string;
  rate: string;
}

interface IInitialStateStatistics {
  statistics: IStatisticData[];
}

const initialState: IInitialStateStatistics = { statistics: [] };

export const statisticsReducer = (state = initialState, action: AnyAction): typeof initialState => {
  switch (action.type) {
    case StatisticsActions.ADD_STATISTIC:
      return { ...state, statistics: [...state.statistics, action.payload] };

    case StatisticsActions.REMOVE_STATISTIC:
      return { ...state, statistics: state.statistics.filter((stat) => stat.card !== action.payload) };

    case StatisticsActions.EDIT_STATISTIC: {
      const index = state.statistics.findIndex((stat) => stat.card === action.payload.oldStatistic);
      const newIssuesArray = [...state.statistics];
      newIssuesArray[index] = action.payload.newStatistic;
      return { ...state, statistics: newIssuesArray };
    }

    case StatisticsActions.SET_STATISTICS:
      return { ...state, statistics: action.payload };

    default:
      return state;
  }
};

interface IStatisticsActionsIStatisticData {
  type: StatisticsActions;
  payload: IStatisticData;
}

interface IStatisticsActionsString {
  type: StatisticsActions;
  payload: string;
}

interface IStatisticsEdit {
  oldStatistic: string;
  newStatistic: IStatisticData;
}

interface IStatisticsActionsIStatisticsEdit {
  type: StatisticsActions;
  payload: IStatisticsEdit;
}

interface IStatisticsActionsIStatisticDataArray {
  type: StatisticsActions;
  payload: IStatisticData[];
}

export const addStatistic = (payload: IStatisticData): IStatisticsActionsIStatisticData => ({
  type: StatisticsActions.ADD_STATISTIC,
  payload,
});

export const removeStatistic = (payload: string): IStatisticsActionsString => ({
  type: StatisticsActions.REMOVE_STATISTIC,
  payload,
});

export const editStatistic = (payload: IStatisticsEdit): IStatisticsActionsIStatisticsEdit => ({
  type: StatisticsActions.EDIT_STATISTIC,
  payload,
});

export const setStatistics = (payload: IStatisticData[]): IStatisticsActionsIStatisticDataArray => ({
  type: StatisticsActions.SET_STATISTICS,
  payload,
});
