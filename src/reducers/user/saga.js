import { takeEvery, select, put } from 'redux-saga/effects';
import { GET, POST } from '../../lib/request';
import {
	USER_GETINFO,
	setInfo,
	USER_GETUSERPROJECTS,
	setUserProjects,
	USER_GETUPLOADTOKEN,
	setUploadToken,
	USER_UPDATETOKEN,
} from './constant';
//import { toggleLogin } from '../layout/constant';

/*function* login(action) {
   const state = yield select();
   console.log(state);
}*/
var getUserInfo,getUserProjects,getQiniuToken,updateUserToken;
function* fetchUserInfo() {
	const { isSuccess, result, errors } = yield GET(`${getUserInfo}/${localStorage.userId}`);
	if (isSuccess) {
		yield put(setInfo({ username: result.name, avatar: result.headUrl }));
	}
}

function* fetchUserProjects() {
	const query = `?type=1&userid=${localStorage.userId}&PageIndex=1&PageSize=200`;
	const { isSuccess, result, errors } = yield GET(getUserProjects+query);
	if (isSuccess) {
		if (result.total) {
			yield put(setUserProjects({ projects: result.items }));
			yield put({ type: USER_GETUPLOADTOKEN });
		} else {
			alert('暂无作品，无法报名');
		}
	}
}

function* fetchUploadToken() {
	const { isSuccess, result, errors } = yield GET(getQiniuToken);
	if (isSuccess) {
		yield put(setUploadToken({ token: result.token }));
	}
}

function* updateToken({ payload: { type } }) {
	const { status, data } = yield POST(updateUserToken, {
		token: localStorage.access_token,
	});
	if (status === 'ok') {
		localStorage.access_token = data.access_token;
		yield put({ type });
	} else {
		// login
		alert('登录已过期，请重新登录！');
		//yield put(toggleLogin({ shouldLogin: true }));
	}
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* userSaga() {
  yield takeEvery(USER_UPDATETOKEN, updateToken);
  yield takeEvery(USER_GETINFO, fetchUserInfo);
  yield takeEvery(USER_GETUSERPROJECTS, fetchUserProjects);
  yield takeEvery(USER_GETUPLOADTOKEN, fetchUploadToken);
}

export default userSaga;
