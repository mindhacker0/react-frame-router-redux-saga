import { USER_SETINFO, USER_SETUSERPROJECTS, USER_SETUPLOADTOKEN } from './constant';

const initialState = {
	username: '',
	avatar: '',
	projects: [],
	token: '',
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case USER_SETINFO:
			return {
				...state,
				username: payload.username,
				avatar: payload.avatar,
			};
		case USER_SETUSERPROJECTS:
			return {
				...state,
				projects: payload.projects,
			};
		case USER_SETUPLOADTOKEN:
			return {
				...state,
				token: payload.token,
			};
		default:
			return state;
	}
};
