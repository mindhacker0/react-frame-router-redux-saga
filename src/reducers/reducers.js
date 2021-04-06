import { combineReducers } from 'redux';
import user from './user/reducer';
import frame from './frame/reducer';
import layout from './layout/reducer';
import report from './report/reducers';
import exhibition from './exhibition/reducer';
import examination from './examination/reducer';
export default combineReducers({
	user,
	layout,
	frame,
	report,
	exhibition,
	examination,
});
