import { createActions } from 'redux-actions';

const searchActions = createActions({
  searchRequest: undefined,
  searchSuccess: undefined,
  searchFailure: undefined,
  loadMoreRequest: undefined,
  loadMoreSuccess: undefined,
  loadMoreFailure: undefined,
});

export { searchActions };
