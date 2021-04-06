import {
	REPORT_SETUSERREPORT,
	REPORT_SETREPORTID,
	REPORT_SETUSERAVATAR,
} from './constants';

const initialState = {
	reportId: '',
	accuracy: 0,
	questionNumber: {
		error: 0,
		total: 0,
	},
	score: {
		total: 0,
		report: 0,
	},
	reportTime: 0,
	questionReports: [],
	wishes: '',
	avatar: '',
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case REPORT_SETREPORTID:
			return {
				...state,
				reportId: payload.reportId,
			};
		case REPORT_SETUSERREPORT:
			return {
				...state,
				accuracy: payload.accuracy,
				questionNumber: payload.questionNumber,
				score: payload.score,
				reportTime: payload.reportTime,
				questionReports: payload.questionReports,
				wishes: payload.wishes,
			};
		case REPORT_SETUSERAVATAR:
			return {
				...state,
				avatar: payload.avatar,
			};
		default:
			return state;
	}
};
