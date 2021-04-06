import { takeEvery, select, put } from 'redux-saga/effects';
import {
  EXHIBITION_GETTOPSLIST,
  EXHIBITION_GETRANKLIST,
  EXHIBITION_GETPROJECTLIST,
  setTopsList,
  setRankList,
  setProjectList,
} from '../actions';
import request from '../../lib/request';
const getTopthreeList = '/api/squarecircle/getTopthreeList';
const getRankingList = '/api/squarecircle/getRankingList';
const getProjectList = '/api/squarecircle/getProjectList';
function* getTops({ type, payload }) {
    const { exhibition } = yield select();
    const { level } = exhibition;
    const { isSuccess, result } = yield request.get(`${getTopthreeList}?Difficulty=${level}`);
    if (isSuccess) {
    	yield put(setTopsList({ topList: result }));
    }
}

function* getRanks({ type, payload }) {
    const { exhibition } = yield select();
    const { level, size, page } = exhibition;
    const { isSuccess, result } = yield request.get(`${getRankingList}?Difficulty=${level}&PageIndex=${page}&PageSize=${size}`);
    if (isSuccess) {
      const { items, total } = result;
      yield put(setRankList({ rankList: items, total }));
    }
}

function* getProjects({ type, payload }) {
  const { exhibition, layout } = yield select();
  const { page, size } = exhibition;
  const { isSuccess, result } = yield request.get(`${getProjectList}?PageIndex=${page}&PageSize=${size}`);
  if (isSuccess) {
    yield put(setProjectList({ projectList: result.items, total: result.total }));
  }
}

export default function* () {
  yield takeEvery(EXHIBITION_GETTOPSLIST, getTops);
  yield takeEvery(EXHIBITION_GETRANKLIST, getRanks);
  yield takeEvery(EXHIBITION_GETPROJECTLIST, getProjects);
}
