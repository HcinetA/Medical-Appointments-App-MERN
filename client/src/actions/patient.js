import axios from 'axios';
import { setAlert } from './alert';

import {
	ADD_PATIENT,
	PATIENTS_ERROR,
	GET_PATIENTS,
	PATIENT_ERROR,
	UPT_PATIENT,
	GET_PATIENT,
	DELETE_PATIENT,
	GET_PATIENT_PHONE,
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

export const addPatient = (formData) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const res = await axios.post('/api/patient/', formData, config);

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

// get patient

export const getPatient = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/patient/${id}`);
		dispatch({
			type: GET_PATIENT,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PATIENT_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// uptade  patient

export const uptPatient = (id, formData) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const res = await axios.put(`/api/patient/${id}`, formData, config);
		dispatch({
			type: UPT_PATIENT,
			payload: res.data,
		});

		dispatch(setAlert('RDV Created ', 'success'));
	} catch (err) {
		dispatch({
			type: PATIENT_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};
// DELETE patient

export const deletePatient = (id) => async (dispatch) => {
	try {
		await axios.delete(`/api/patient/${id}`);

		dispatch({
			type: DELETE_PATIENT,
			payload: id,
		});
		dispatch(setAlert('Patient Delted', 'success'));
	} catch (err) {
		dispatch({
			type: PATIENT_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// get patient by phone

export const getPatientByPhone = (phone) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/patient/by_phone_number/${phone}`);
		dispatch({
			type: GET_PATIENT_PHONE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PATIENT_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};
