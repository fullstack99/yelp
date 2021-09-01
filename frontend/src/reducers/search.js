import { handleActions } from 'redux-actions';

import { searchActions } from '../actions';

const INITIAL_STATE = {
  isLoading: false,
  error: null,
  isLoaded: false,
  total: 0,
  yelp: [],
  google: [],
};

const searchReducer = handleActions(
  {
    [searchActions.searchRequest]: (state) => {
      return {
        ...state,
        error: null,
        isLoading: true,
        isLoaded: false,
        results: [],
      };
    },
    [searchActions.searchSuccess]: (state, { payload }) => {
      return {
        ...state,
        yelp: payload.yelp.businesses,
        google: payload.google,
        total: payload.yelp.total,
        isLoading: false,
        isLoaded: true,
      };
    },
    [searchActions.searchFailure]: (state, { payload }) => {
      return { ...state, error: payload, isLoading: false, isLoaded: true };
    },
    [searchActions.loadMoreRequest]: (state) => {
      return {
        ...state,
        error: null,
        isLoading: true,
        isLoaded: false,
      };
    },
    [searchActions.loadMoreSuccess]: (state, { payload }) => {
      return {
        ...state,
        yelp: [...state.yelp, ...payload.yelp.businesses],
        google: [...state.google, ...payload.google],
        isLoading: false,
        isLoaded: true,
      };
    },
    [searchActions.loadMoreFailure]: (state, { payload }) => {
      return { ...state, error: payload, isLoading: false, isLoaded: true };
    },
  },
  INITIAL_STATE
);

export default searchReducer;
