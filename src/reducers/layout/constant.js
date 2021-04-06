import action from '../action-method';

// constants
export const LAYOUT_TOGGLESHOWTOP = 'layout/toggleShowTop';
export const LAYOUT_TOGGLELOGIN = 'layout/toggleLogin';
export const LAYOUT_TOGGLESHOWREPORT = 'layout/toggleShowReport';

// actions
export const toggleShowTop = action(LAYOUT_TOGGLESHOWTOP);
export const toggleLogin = action(LAYOUT_TOGGLELOGIN);
export const toggleShowReport = action(LAYOUT_TOGGLESHOWREPORT);
