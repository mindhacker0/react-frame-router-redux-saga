import { 
	OPEN_MODAL, 
	CLOSE_MODAL,
	SET_NOTICE_LIST,
	SET_NOTICE_TITLE,
	SET_PROJECT_INFO,
	SET_VIDEO_DETAIL
} from './constant';

const initialState = {
	noticeModal:false,
	videoModal:false,
	projectModal:false,
	loginModal:false,
	noticeList:[],
	noticeTitle:"默认标题",
	videoInfo:{
		title:"默认标题",
		videoSrc:"",
		name:"",
		describe:""
	},
	projectInfo:{
		title:"",
		makerProjectDetails:[],
		userName:"",
		describe:""
	},
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case OPEN_MODAL:
			return {
				...state,
				[payload.modalName]:true,
			};
		case CLOSE_MODAL:
			return {
				...state,
				[payload.modalName]:false,
			};
		case SET_NOTICE_LIST:
			return {
				...state,
				noticeList:payload.noticeList
			};
		case SET_VIDEO_DETAIL:
			return {
				...state,
				videoInfo:payload.videoInfo
			};
		case SET_NOTICE_TITLE:
			return {
				...state,
				noticeTitle:payload.noticeTitle
			};
		case SET_PROJECT_INFO:
			return {
				...state,
				projectInfo:payload.projectInfo
			};
		default:
			return state;
	}
};
