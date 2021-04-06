import {
	LAYOUT_TOGGLESHOWTOP,
	LAYOUT_TOGGLELOGIN,
	LAYOUT_TOGGLESHOWREPORT,
} from './constant';

const initialState = {
	shouldShowTop: true,
	shouldLogin: false,
	shouldShowReport: false,
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case LAYOUT_TOGGLESHOWTOP:
			return {
				...state,
				shouldShowTop: payload.shouldShowTop,
			};
		case LAYOUT_TOGGLELOGIN:
			return {
				...state,
				shouldLogin: payload.shouldLogin,
			};
		case LAYOUT_TOGGLESHOWREPORT:
			return {
				...state,
				shouldShowReport: payload.shouldShowReport,
			};
		default:
			return state;
	}
};
