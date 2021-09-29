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

    case StatisticsActions.ADD_STATISTICS: {
      const statisticIn = state.statistics.find((stat) => stat.taskName === action.payload.taskName);
      return {
        ...state,
        statistics: statisticIn
          ? state.statistics.map((stat) => (stat.taskName === action.payload.taskName ? action.payload : stat))
          : [...state.statistics, action.payload],
      };
    }

    default:
      return state;
  }
};

interface IStatisticsActionsString {
  type: StatisticsActions;
  payload: string;
}

interface IStatisticsActionsIStatisticData {
  type: StatisticsActions;
  payload: IStatisticData;
}

interface IStatisticsActionsIStatisticDataArray {
  type: StatisticsActions;
  payload: IStatisticData[];
}

export const removeStatistic = (payload: string): IStatisticsActionsString => ({
  type: StatisticsActions.REMOVE_STATISTIC,
  payload,
});

export const addStatistics = (payload: IStatisticData): IStatisticsActionsIStatisticData => ({
  type: StatisticsActions.ADD_STATISTICS,
  payload,
});

export const setStatistics = (payload: IStatisticData[]): IStatisticsActionsIStatisticDataArray => ({
  type: StatisticsActions.SET_STATISTICS,
  payload,
});
