import { all, call } from 'redux-saga/effects';
import userSaga from './user/saga';
import frameSaga from './frame/saga';
import reportSaga from './report/sagas';
import exhibitionSaga from './exhibition/saga';
import examinationSaga from './examination/saga';
export default function* () {
  yield all([
    call(userSaga),
    call(frameSaga),
    call(reportSaga),
    call(exhibitionSaga),
    call(examinationSaga),
  ]);
}
