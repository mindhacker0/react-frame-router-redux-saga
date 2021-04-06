import action from '../action-method';

// contant
export const SET_USER_ISLOGIN =  Symbol('SET_USER_ISLOGIN');
export const SET_USER_SESSION =  Symbol('SET_USER_SESSION');
export const SET_USER_MENUPATH = Symbol("SET_USER_MENUPATH");
export const SET_USER_PROJECTS = Symbol("SET_USER_PROJECTS");
export const GET_USER_PROJECTS = Symbol("GET_USER_PROJECTS");
export const SET_USER_ORDERPROJECT = Symbol("SET_USER_ORDERPROJECT");
export const GET_USER_PARTICIPANT = Symbol("GET_USER_PARTICIPANT");
export const SET_USER_PARTICIPANT = Symbol("SET_USER_PARTICIPANT");
export const ADD_USER_REPORTFORM = Symbol("ADD_USER_REPORTFORM");
export const SUBMIT_USER_PROJECT = Symbol("SUBMIT_USER_PROJECT");

export const GET_USER_SAVEPROJECT = Symbol("GET_USER_SAVEPROJECT");
export const SET_USER_SAVEPROJECT = Symbol("SET_USER_SAVEPROJECT");

export const GET_VIDEO_CLASS = Symbol("GET_VIDEO_CLASS");
export const SET_VIDEO_CLASS = Symbol("SET_VIDEO_CLASS");

// action
export const setUserMenuPath = action(SET_USER_MENUPATH);
export const setUserLogin = action(SET_USER_ISLOGIN);
export const setUserSession = action(SET_USER_SESSION);

export const getProjectList = action(GET_USER_PROJECTS);
export const setProjectList = action(SET_USER_PROJECTS);

export const setOrderProjectList = action(SET_USER_ORDERPROJECT);

export const getParticipant = action(GET_USER_PARTICIPANT);
export const setParticipant = action(SET_USER_PARTICIPANT);

export const getSaveProject = action(GET_USER_SAVEPROJECT);
export const setSaveProject = action(SET_USER_SAVEPROJECT);

export const getVideoClass = action(GET_VIDEO_CLASS);
export const setVideoClass = action(SET_VIDEO_CLASS);

export const addUserReportForm = action(ADD_USER_REPORTFORM);
export const submitUserProject = action(SUBMIT_USER_PROJECT);