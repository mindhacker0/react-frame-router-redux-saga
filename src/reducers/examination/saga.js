import { takeEvery, select, put } from 'redux-saga/effects';
import {
	EXAMINATION_GETQUESTIONLIST,
	setQuestionList,
	setSummaryQuestionList,
	setSingleChoiceQuestionList,
	setMultipleChoiceQuestionList,
	toggleLoading,
	setQuestionTotalNumber,
	setTotalTimes,
	setCountdown,
	EXAMINATION_SAVEANSWER,
	toggleCountdown,
	reset,
	setAnswer,
} from './constant';
import { setReportId } from '../report/constants';
import { toggleShowReport } from '../layout/constant';
import request from '../../lib/request';

const getQuestionList = '/api/squarecircle/getList';
const saveUserAnswer = '/api/squarecircle/addAnswer';
function* getQuestions() {
	const { examination } = yield select();
	const { subjectId, difficulty } = examination;
	const { isSuccess, result, errors } = yield request.get(`${getQuestionList}?courseId=${subjectId}&Difficulty=${difficulty}`);
	if (isSuccess) {
		const summaryQuestionList = [];
		const singleChoiceQuestionList = [];
		const multipleChoiceQuestionList = [];
		const answer = {};
		for (const item of result.subjects) {
			if (item.type === 1) {
			  singleChoiceQuestionList.push(item);
			  answer[item.id] = '';
				continue;
			}
			if (item.type === 2) {
				multipleChoiceQuestionList.push(item);
			  answer[item.id] = [];
				continue;
			}
			if (item.type === 3) {
				summaryQuestionList.push(item);
				answer[item.id] = new Array(item.options.length);
				continue;
			}
		}

		const totalTimes = ((singleChoiceQuestionList.length + multipleChoiceQuestionList.length) * 45) + (summaryQuestionList.length * 60);

		yield put(setQuestionList({
			summaryQuestionList,
			singleChoiceQuestionList,
			multipleChoiceQuestionList,
			questionBankId: result.id,
		}));

		yield put(setAnswer({ answer }));

		yield put(setQuestionTotalNumber({ questionTotalNumber: result.subjects.length }));
		yield put(setTotalTimes({ totalTimes }));
		yield put(setCountdown({
			countdown: {
				minutes: Math.floor(totalTimes/60),
				seconds: totalTimes%60,
			},
		}));
		yield put(toggleCountdown({ shouldCountdown: true }));
	} else {
		console.log(errors);
	}
	yield put(toggleLoading({ isLoading: false }));
}

function* saveAnswer() {
	const { examination } = yield select();
	yield put(toggleCountdown({ shouldCountdown: false }));
	const { questionBankId, level, answer, countdown, totalTimes } = examination;
	const answers = Object.keys(answer).map((key) => ({
		subjectId: key,
		answerResult: answer[key].toString() === '[object Object]' ? Object.values(answer[key]).join('|') : answer[key].toString(),
	}));
	const { isSuccess, errors, result } = yield request(saveUserAnswer, {
		method:"post",
		data:{
			barrierNum: level,
			times: totalTimes - (countdown.minutes * 60 + countdown.seconds),
			subjectSetId: questionBankId,
			details: answers,
		}
	});
	if (isSuccess) {
		// history.push('/report', { reportId: result.reportId });
		yield put(setReportId({ reportId: result.reportId }));
		yield put(toggleShowReport({ shouldShowReport: true }));
		yield put(reset());
	} else {
	
		console.log(errors);
	}
}

export default function* () {
	yield takeEvery(EXAMINATION_GETQUESTIONLIST, getQuestions);
	yield takeEvery(EXAMINATION_SAVEANSWER, saveAnswer);
}
