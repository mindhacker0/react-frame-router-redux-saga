import action from '../action-method';

// contant
export const OPEN_MODAL = Symbol("OPEN_MODAL");
export const CLOSE_MODAL = Symbol("CLOSE_MODAL");
export const SET_NOTICE_LIST = Symbol("SET_NOTICE_LIST");
export const SET_NOTICE_TITLE = Symbol("SET_NOTICE_TITLE");

export const SET_PROJECT_INFO = Symbol("SET_PROJECT_INFO");
export const GET_PROJECT_INFO = Symbol("GET_PROJECT_INFO");

export const SET_VIDEO_INFO = Symbol("SET_VIDEO_INFO");
export const GET_VIDEO_INFO = Symbol("GET_VIDEO_INFO");

export const GET_VIDEO_DETAIL = Symbol("GET_VIDEO_DETAIL");
export const SET_VIDEO_DETAIL = Symbol("SET_VIDEO_DETAIL");
// action
export const openModal = action(OPEN_MODAL);
export const closeModal = action(CLOSE_MODAL);
export const setNoticeList = action(SET_NOTICE_LIST);
export const setNoticeTitle = action(SET_NOTICE_TITLE);

export const setProjectInfo = action(SET_PROJECT_INFO);
export const getProjectInfo = action(GET_PROJECT_INFO);

export const setVideoInfo = action(SET_VIDEO_INFO);
export const getVideoInfo = action(GET_VIDEO_INFO);

export const getVideoDetail = action(GET_VIDEO_DETAIL);
export const setVideoDetail = action(SET_VIDEO_DETAIL);

