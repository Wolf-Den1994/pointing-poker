import { AnyAction } from 'redux';
import { StatisticsActions } from './actionTypes';
import { IStatisticData } from '../types/types';

interface IInitialStateStatistics {
  statistics: IStatisticData[];
}

const initialState: IInitialStateStatistics = { statistics: [] };

export const statisticsReducer = (state = initialState, action: AnyAction): typeof initialState => {
  switch (action.type) {
    case StatisticsActions.REMOVE_STATISTIC:
      return { ...state, statistics: state.statistics.filter((stat) => stat.taskName !== action.payload) };

    case StatisticsActions.SET_STATISTICS:
      return { ...state, statistics: action.payload };

    default:
      return state;
  }
};

interface IStatisticsActionsString {
  type: StatisticsActions;
  payload: string;
}

interface IStatisticsActionsIStatisticDataArray {
  type: StatisticsActions;
  payload: IStatisticData[];
}

export const removeStatistic = (payload: string): IStatisticsActionsString => ({
  type: StatisticsActions.REMOVE_STATISTIC,
  payload,
});

export const setStatistics = (payload: IStatisticData[]): IStatisticsActionsIStatisticDataArray => ({
  type: StatisticsActions.SET_STATISTICS,
  payload,
});
