import { combineReducers } from 'redux';

import alert from './alert';
import auth from './auth';
import doctor from './doctor';
import patient from './patient';

import rdv from './rdv';

export default combineReducers({
	alert,
	auth,
	doctor,
	patient,
	rdv,
});
