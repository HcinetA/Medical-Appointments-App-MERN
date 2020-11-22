import axios from 'axios';
import { setAlert } from './alert';
import {
	ADD_PATIENT,
	PATIENTS_ERROR,
	GET_PATIENTS,
	PATIENT_ERROR,
} from './types';

// get patients

export const getPatients = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/patient/');
		dispatch({
			type: GET_PATIENTS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PATIENTS_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// add  patient

export const addPatient = (formData2) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const res = await axios.post('/api/patient/', formData2, config);

		dispatch({
			type: ADD_PATIENT,
			payload: res.data,
		});

		dispatch(setAlert('Patient Created ', 'success'));
	} catch (err) {
		dispatch({
			type: PATIENT_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};
