import { takeEvery, select, put } from 'redux-saga/effects';
import request from "../../lib/request";
import {GET_PROJECT_INFO,GET_VIDEO_DETAIL,setProjectInfo,setVideoDetail} from './constant';

/*function* login(action) {
   const state = yield select();
   console.log(state);
}*/
var getMakerProjectById="/api/maker/GetMakerProjectById";
var getMakerCourseById="/api/maker/GetMakerCourseById";
function* getProjectInfo({ type, payload:{id}}) {
	console.log("id",id)
	const { isSuccess, result, errors } = yield request(getMakerProjectById,{
		method: "GET",
		params: {Id:id}
	});
	if (isSuccess) {
	  yield put(setProjectInfo({projectInfo:result}));
	} else {
		 console.error("request error "+errors);
	}
}

function* getVideoInfo({ type, payload:{id}}) {
	console.log("id",id)
	const { isSuccess, result, errors } = yield request(getMakerCourseById,{
		method: "GET",
		params: {Id:id}
	});
	if (isSuccess) {
	    yield put(setVideoDetail({videoInfo:result}));
	} else {
		console.error("request error "+errors);
	}
}
/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* frameSaga() {
	yield takeEvery(GET_PROJECT_INFO,getProjectInfo);
	yield takeEvery(GET_VIDEO_DETAIL,getVideoInfo);
}

export default frameSaga;
