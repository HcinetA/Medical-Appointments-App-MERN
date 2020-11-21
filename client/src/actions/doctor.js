import axios from 'axios';
import { setAlert } from './alert';
import { GET_DOCTORS, DOCTORS_ERROR } from './types';

// GET POSTS

export const getDoctors = () => async (dispatch) => {
	try {
		const res = await axios.get('api/user/byRole/doctor2');
		dispatch({
			type: GET_DOCTORS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: DOCTORS_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};
