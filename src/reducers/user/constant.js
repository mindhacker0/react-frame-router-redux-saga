import action from '../action-method';

// contant
export const USER_GETINFO = 'user/getInfo';
export const USER_GETUSERPROJECTS = 'user/getUserProjects';
export const USER_GETUPLOADTOKEN = 'user/getUploadToken';
export const USER_UPDATETOKEN = 'user/updateToken';
export const USER_SETINFO = 'user/setInfo';
export const USER_SETUSERPROJECTS = 'user/setUserProjects';
export const USER_SETUPLOADTOKEN = 'user/setUploadToken';

// action
export const getInfo = action(USER_GETINFO);
export const getUserProjects = action(USER_GETUSERPROJECTS);
export const getUploadToken = action(USER_GETUPLOADTOKEN);
export const setInfo = action(USER_SETINFO);
export const setUserProjects = action(USER_SETUSERPROJECTS);
export const setUploadToken = action(USER_SETUPLOADTOKEN);
export const updateToken = action(USER_UPDATETOKEN);
