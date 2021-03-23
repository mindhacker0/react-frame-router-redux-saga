const action = type => payload => ({ type, payload });

// contants
export const EXHIBITION_GETTOPSLIST = 'exhibition/getTopsList';
export const EXHIBITION_GETRANKLIST = 'exhibition/getRankList';
export const EXHIBITION_GETPROJECTLIST = 'exhibition/getProjectList';

export const LAYOUT_TOGGLESHOWTOP = 'layout/toggleShowTop';
export const EXHIBITION_SETLEVEL = 'exhibition/setLevel';
export const EXHIBITION_SETTOPSLIST = 'exhibition/setTopsList';
export const EXHIBITION_SETRANKTLIST = 'exhibition/setRankList';
export const EXHIBITION_CLEARRANKTLIST = 'exhibition/clearRankList';
export const EXHIBITION_SETPROJECTLIST = 'exhibition/setProjectList';
export const EXHIBITION_CLEARPROJECTLIST = 'exhibition/clearProjectList';

// effects
export const getTopsList = action(EXHIBITION_GETTOPSLIST);
export const getRankList = action(EXHIBITION_GETRANKLIST);
export const getProjectList = action(EXHIBITION_GETPROJECTLIST);

// reducer
export const toggleShowTop = action(LAYOUT_TOGGLESHOWTOP);
export const setLevel = action(EXHIBITION_SETLEVEL);
export const setTopsList = action(EXHIBITION_SETTOPSLIST);
export const setRankList = action(EXHIBITION_SETRANKTLIST);
export const clearRankList = action(EXHIBITION_CLEARRANKTLIST);
export const setProjectList = action(EXHIBITION_SETPROJECTLIST);
export const clearProjectList = action(EXHIBITION_CLEARPROJECTLIST);
