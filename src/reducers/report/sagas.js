import { takeEvery, select, put } from 'redux-saga/effects';
import {
	REPORT_GETUSERREPORT,
	setUserReport,
	setUserAvatar,
} from './constants';
import request from '../../lib/request';
const getUserAnswerReport = '/api/squarecircle/getAnswerSubjectReport';
const getUserInfo = '/api/Personal/GetPersonaldata';
function* getReport() {
	const { report } = yield select();
	const { reportId } = report;
	const { isSuccess, errors, result } = yield request.get(`${getUserAnswerReport}?id=${reportId}`);
	if (isSuccess) {
		const { totleNum, errorNum, details, times, remark, barrierScore } = result;

		const accuracy = ((totleNum - errorNum) / totleNum).toFixed(2) * 100;

		const wishes = [];

		if (accuracy === 100) wishes.push('你是一个聪明伶俐、积极上进、优秀的学生，希望你在未来也能够不改初衷，努力追寻自己的目标，更上一层楼。');

		if (accuracy >= 80 && accuracy < 100) wishes.push('你是一个很有潜力的学生，相信天道酬勤，付出一定会有收获，愿你在今后的学习中能够实现突破，相信自己，你会做得更好！');

		if (accuracy >= 60 && accuracy < 80) wishes.push('你思维开阔，具有强烈的好奇心是你的闪光点，希望你能够发挥出自己的优势，把握今天，成就明天优秀的自己。');

		if (accuracy < 60) wishes.push('偶尔的失败也不要气馁，是不是小马虎了呢？是不是对哪个知识点掌握不牢固呢？只要找到原因并做出改变，一定会有明显的变化。');

		yield put(setUserReport({
			accuracy,
			questionNumber: {
				total: totleNum,
				error: errorNum,
			},
			score: {
				total: details.reduce((total, { score }) => {
					if (typeof total === 'object')
						return total.score + score;
					return total + score;
				}),
				report: barrierScore,
			},
			wishes,
			reportTime: times,
			questionReports: details,
		}));
	} else {
		console.log(errors);
	}

	const res = yield request.get(getUserInfo);
	if (res.isSuccess) {
		yield put(setUserAvatar({ avatar: res.result.headUrl }));
	} else {
		console.log(res.errors);
	}
}

export default function* () {
	yield takeEvery(REPORT_GETUSERREPORT, getReport);
}
