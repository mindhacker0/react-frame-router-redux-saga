import { takeEvery, select, put } from 'redux-saga/effects';
import request from "../../lib/request";
import {
	GET_USER_PROJECTS,
	GET_USER_PARTICIPANT,
	ADD_USER_REPORTFORM,
	GET_USER_SAVEPROJECT,
	GET_VIDEO_CLASS,
	setProjectList,
	setParticipant,
	setVideoClass,
	setOrderProjectList,
	setSaveProject,
	SUBMIT_USER_PROJECT
} from './constant';

/*function* login(action) {
   const state = yield select();
   console.log(state);
}*/
var getUserProjects = "/api/maker/GetMakerProjectPageList";
var getParticipantInfo = "/api/maker/GetParticipant";
var addParticipantAsync = "/api/maker/AddParticipantAsync";
var addMakerProjectAsync = "/api/maker/AddMakerProjectAsync";
var getMakerProject = "/api/maker/GetMakerProject";
var getMakerCoursePageList = "/api/maker/GetMakerCoursePageList";
function* fetchUserProjects({ type, payload:{params} }) {
	const { isSuccess, result, errors } = yield request(getUserProjects,{
		method: "GET",
		params: params
	});
	if (isSuccess) {
		if (result.total){
			if(params.OrderColumn){
				yield put(setOrderProjectList({orderProject:result.data}));
			}else{
				yield put(setProjectList({projects:result.data}));
			}
		} else {
			console.error("request error "+errors);
		}
	}
}

function* fetchParticipant({ type, payload}) {
	const { isSuccess, result, errors } = yield request.get(getParticipantInfo);
	if (isSuccess) {
		yield put(setParticipant({participantInfo:result}));
	}else{
		console.error("request error "+errors);
		yield put(setParticipant({participantInfo:{}}));
	}
}

function* fetchMakerProject({ type, payload}) {
	const params =`?ProjectType=${payload.projectType}`;
	const { isSuccess, result, errors } = yield request.get(getMakerProject+params);
	if (isSuccess){
		yield put(setSaveProject({saveProject:result}));
	}else{
		console.error("request error "+errors);
		yield put(setSaveProject({saveProject:{}}));
	}
}

function* addUserForm({ type, payload}) {
	const { isSuccess, result, errors } = yield request(addParticipantAsync,{
		method: "POST",
		data: {...payload.params}
	});
	if(isSuccess) {
	
	}
}

function* submitProject({ type, payload}) {
	const { isSuccess, result, errors } = yield request(addMakerProjectAsync,{
		method: "POST",
		data: {...payload.params}
	});
	console.log("submit project",result);
	if (isSuccess) {
		
	}
}

function* fetchVideoClass({ type, payload:{params} }) {
	const { isSuccess, result, errors } = yield request(getMakerCoursePageList,{
		method: "GET",
		params: params
	});
	if (isSuccess) {
		yield put(setVideoClass({videoClassList:result.data}));
	} else {
		console.error("request error "+errors);
	}

}

function* userSaga() {
  yield takeEvery(GET_USER_PROJECTS, fetchUserProjects);
  yield takeEvery(GET_USER_PARTICIPANT, fetchParticipant);
  yield takeEvery(ADD_USER_REPORTFORM, addUserForm);
  yield takeEvery(SUBMIT_USER_PROJECT, submitProject);
  yield takeEvery(GET_USER_SAVEPROJECT, fetchMakerProject);
  yield takeEvery(GET_VIDEO_CLASS, fetchVideoClass);
}

export default userSaga;
