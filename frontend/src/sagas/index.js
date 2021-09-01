import { all } from 'redux-saga/effects'

import searchSagas from './search'

export default function* root() {
  yield all([
    searchSagas()
  ])
}
