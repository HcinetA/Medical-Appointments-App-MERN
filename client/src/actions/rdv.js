import axios from 'axios';
import { setAlert } from './alert';
import { ADD_RDV, RDVS_ERROR, GET_RDVS, RDV_ERROR } from './types';

// get patients

export const getRdvs = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/appointment/');
		dispatch({
			type: GET_RDVS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: RDVS_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// add  patient

export const addRdv = (formData) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const res = await axios.post('/api/appointment/, formData, config');

		dispatch({
			type: ADD_RDV,
			payload: res.data,
		});

		dispatch(setAlert('RDV Created ', 'success'));
	} catch (err) {
		dispatch({
			type: RDV_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};
