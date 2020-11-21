import axios from 'axios';
import { setAlert } from './alert';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
} from './types';
import setAuthToken from '../utils/setAuthToken';

// LOAD USER
export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	try {
		const res = await axios.get('api/user');
		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

// REGISTER USER

export const register = ({
	first_name,
	last_name,
	gender,
	email,
	password,
	role,
}) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify({
		first_name,
		last_name,
		gender,
		email,
		password,
		role,
	});
	try {
		const res = await axios.post('api/user/register', body, config);
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: REGISTER_FAIL,
		});
	}
};
