import { call, cancelled, put, takeEvery } from 'redux-saga/effects';

import { searchActions } from '../actions';
import * as API from '../services/api';

function* search({ payload }) {
  const error = 'Something went Wrong. Please try again';
  try {
    const resp = yield call(API.search, payload);
    if (resp.status === 200) {
      yield put(searchActions.searchSuccess(resp.data));
    } else {
      yield put(searchActions.searchFailure(error));
    }
  } catch (err) {
    yield put(searchActions.searchFailure(err));
  } finally {
    if (yield cancelled()) {
      console.log('search task cancelled.');
    }
  }
}

function* loadMore({ payload }) {
  const error = 'Something went Wrong. Please try again';
  try {
    const resp = yield call(API.search, payload);
    if (resp.status === 200) {
      yield put(searchActions.loadMoreSuccess(resp.data));
    } else {
      yield put(searchActions.loadMoreFailure(error));
    }
  } catch (err) {
    yield put(searchActions.loadMoreFailure(err));
  } finally {
    if (yield cancelled()) {
      console.log('search task cancelled.');
    }
  }
}

export default function* searchSagas() {
  yield takeEvery(searchActions.searchRequest, search);
  yield takeEvery(searchActions.loadMoreRequest, loadMore);
}
