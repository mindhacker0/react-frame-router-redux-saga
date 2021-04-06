import action from '../action-method';

// contants
export const EXAMINATION_GETQUESTIONLIST = 'examination/getQuestionList';
export const EXAMINATION_SETQUESTIONLIST = 'examination/setQuestionList';
export const EXAMINATION_SETDIFFICULTY = 'examination/setDifficulty';
export const EXAMINATION_TOGGLELOADING = 'examination/toggleLoading';
export const EXAMINATION_SETQUESTIONTOTALNUMBER = 'examination/setQuestionTotalNumber';
export const EXAMINATION_SETTOTALTIMES = 'examination/setTotalTimes';
export const EXAMINATION_TOGGLESUBMITANSWER = 'examination/toggleSubmitAnswer';
export const EXAMINATION_SETCOUNTDOWN = 'examination/setCountdown';
export const EXAMINATION_SETANSWER = 'examination/setAnswer';
export const EXAMINATION_SAVEANSWER = 'examination/saveAnswer';
export const EXAMINATION_TOGGLECOUNTDOWN = 'examination/toggleCountdown';
export const EXAMINATION_SETSUBJECTID = 'examination/setSubjectId';
export const EXAMINATION_RESET = 'examination/reset';
export const EXAMINATION_REDO = 'examination/redo';

// actions
export const getQuestionList = action(EXAMINATION_GETQUESTIONLIST);
export const setQuestionList = action(EXAMINATION_SETQUESTIONLIST);
export const setDifficulty = action(EXAMINATION_SETDIFFICULTY);
export const toggleLoading = action(EXAMINATION_TOGGLELOADING);
export const setQuestionTotalNumber = action(EXAMINATION_SETQUESTIONTOTALNUMBER);
export const setTotalTimes = action(EXAMINATION_SETTOTALTIMES);
export const toggleSubmitAnswer = action(EXAMINATION_TOGGLESUBMITANSWER);
export const setCountdown = action(EXAMINATION_SETCOUNTDOWN);
export const setAnswer = action(EXAMINATION_SETANSWER);
export const saveAnswer = action(EXAMINATION_SAVEANSWER);
export const toggleCountdown = action(EXAMINATION_TOGGLECOUNTDOWN);
export const setSubjectId = action(EXAMINATION_SETSUBJECTID);
export const reset = action(EXAMINATION_RESET);
export const redo = action(EXAMINATION_REDO);
