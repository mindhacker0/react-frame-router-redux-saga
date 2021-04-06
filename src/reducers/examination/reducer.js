import {
	EXAMINATION_SETDIFFICULTY,
	EXAMINATION_TOGGLELOADING,
	EXAMINATION_SETQUESTIONTOTALNUMBER,
	EXAMINATION_SETTOTALTIMES,
	EXAMINATION_TOGGLESUBMITANSWER,
	EXAMINATION_SETCOUNTDOWN,
	EXAMINATION_SETANSWER,
	EXAMINATION_TOGGLECOUNTDOWN,
	EXAMINATION_SETSUBJECTID,
	EXAMINATION_SETQUESTIONLIST,
	EXAMINATION_RESET,
	EXAMINATION_REDO,
} from './constant';

const initialState = {
	subjectId: '',
	questionBankId: '',
	difficulty: 0,
	isLoading: true,
	shouldCountdown: false,
	questionTotalNumber: 0,
	totalTimes: 0,
	level: 1,
	shouldSubmitAnswer: false,
	answer: {},
	summaryQuestionList: [],
	singleChoiceQuestionList: [],
	multipleChoiceQuestionList: [],
	countdown: {
		minutes: 0,
		seconds: 0,
	},
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case EXAMINATION_SETQUESTIONLIST:
			return {
				...state,
				singleChoiceQuestionList: payload.singleChoiceQuestionList,
				multipleChoiceQuestionList: payload.multipleChoiceQuestionList,
				summaryQuestionList: payload.summaryQuestionList,
				questionBankId: payload.questionBankId,
			};
		case EXAMINATION_SETDIFFICULTY:
			return {
				...state,
				difficulty: payload.difficulty,
			};
		case EXAMINATION_TOGGLELOADING:
			return {
				...state,
				isLoading: payload.isLoading,
			};
		case EXAMINATION_SETQUESTIONTOTALNUMBER:
			return {
				...state,
				questionTotalNumber: payload.questionTotalNumber,
			};
		case EXAMINATION_TOGGLESUBMITANSWER:
			return {
				...state,
				shouldSubmitAnswer: payload.shouldSubmitAnswer,
			};
		case EXAMINATION_SETTOTALTIMES:
			return {
				...state,
				totalTimes: payload.totalTimes,
			};
		case EXAMINATION_SETCOUNTDOWN:
			return {
				...state,
				countdown: payload.countdown,
			};
		case EXAMINATION_SETANSWER:
			return {
				...state,
				answer: payload.answer,
			};
		case EXAMINATION_TOGGLECOUNTDOWN:
			return {
				...state,
				shouldCountdown: payload.shouldCountdown,
			};
		case EXAMINATION_SETSUBJECTID:
			return {
				...state,
				subjectId: payload.subjectId,
			};
		case EXAMINATION_RESET:
			return {
				...initialState,
				subjectId: state.subjectId,
			};
		case EXAMINATION_REDO:
			return {
				...initialState,
				isLoading: true,
				subjectId: state.subjectId,
				questionBankId: state.questionBankId,
				difficulty: 0,
			};
		default:
			return state;
	}
};
