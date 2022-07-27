import { all, call, put, takeLatest } from 'typed-redux-saga/macro'

import {
  loadMusics,
  loadMusicsFailure,
  loadMusicsSuccess
} from '@/store/slices/musics'
import { Response } from '@/types'
import { BASE_URL } from '@/utils/constants'

const getMusics = async (): Promise<Response> => {
  return fetch(BASE_URL + '/qiniu/get_musics?filename=default.json').then(
    (response) => response.json()
  )
}

function* fetchMusics() {
  try {
    const res = yield* call(getMusics)
    if (res.success) {
      yield put(loadMusicsSuccess(res.data))
    }
  } catch (error) {
    yield put(loadMusicsFailure((error as Error).message))
  }
}

function* rootSaga() {
  yield all([takeLatest(loadMusics.type, fetchMusics)])
}

export default rootSaga
