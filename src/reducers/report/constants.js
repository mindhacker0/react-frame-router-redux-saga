import action from '../action-method';

// constants
export const REPORT_GETUSERREPORT = 'report/getUserReport';
export const REPORT_GETUSERINFO = 'report/getUserInfo';
export const REPORT_SETUSERREPORT = 'report/setUserReport';
export const REPORT_SETREPORTID = 'report/setReportId';
export const REPORT_SETUSERAVATAR = 'report/setUserAvatar';

// actions
export const getUserReport = action(REPORT_GETUSERREPORT);
export const getUserInfo = action(REPORT_GETUSERINFO);
export const setUserReport = action(REPORT_SETUSERREPORT);
export const setReportId = action(REPORT_SETREPORTID);
export const setUserAvatar = action(REPORT_SETUSERAVATAR);
