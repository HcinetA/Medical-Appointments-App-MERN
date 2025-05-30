import axios from 'axios';
import { GET_DOCTORS, DOCTORS_ERROR } from './types';

// GET POSTS

export const getDoctors = () => async (dispatch) => {
	try {
		await Promise.all([
			axios.get('/api/user/byRole/doctor2'),
			axios.get('/api/user/byRole/doctor'),
		]).then(([res, res2]) => {
			dispatch({
				type: GET_DOCTORS,

				payload: [...res.data, ...res2.data],
			});
		});
	} catch (err) {
		dispatch({
			type: DOCTORS_ERROR,
		});
	}
};
