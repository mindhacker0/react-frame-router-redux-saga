import { 
	SET_USER_SESSION, 
	SET_USER_PROJECTS,
	SET_USER_ORDERPROJECT,
	SET_USER_PARTICIPANT,
	SET_USER_ISLOGIN,
	SET_USER_MENUPATH,
	SET_VIDEO_CLASS,
	SET_USER_SAVEPROJECT
} from './constant';

const initialState = {
	projects: [],
	orderProject:[],
	userMenuPath:[],
	videoClassList:[],
	isLogin:false,
    session:{},
	participantInfo:{},
	saveProject:{}
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_USER_SESSION:
			return {
				...state,
				session: payload.session,
			};
		case SET_VIDEO_CLASS:
			return {
				...state,
				videoClassList: payload.videoClassList,
			};
		case SET_USER_PROJECTS:
			return {
				...state,
				projects: payload.projects,
			};
		case SET_USER_ORDERPROJECT:
			return {
				...state,
				orderProject: payload.orderProject,
			};
		case SET_USER_ISLOGIN:
			return {
				...state,
				isLogin: payload.isLogin,
			};
		case SET_USER_MENUPATH:
			return {
				...state,
				userMenuPath: payload.userMenuPath,
			};
		case SET_USER_PARTICIPANT:
			return {
				...state,
				participantInfo: payload.participantInfo,
			};
		case SET_USER_SAVEPROJECT:
			return {
				...state,
				saveProject: payload.saveProject,
			};
		default:
			return state;
	}
};
