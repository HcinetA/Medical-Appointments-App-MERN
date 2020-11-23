import axios from 'axios';
import { setAlert } from './alert';
import {
	ADD_RDV,
	RDVS_ERROR,
	GET_RDVS,
	RDV_ERROR,
	GET_RDV,
	UPT_RDV,
	UPTRDV_ERROR,
	GET_PATIENT_APT,
} from './types';

// get rddvs

export const getRdvs = () => async (dispatch) => {
	const res = await axios
		.get('/api/appointment/')
		.then((res) => {
			dispatch({
				type: GET_RDVS,
				payload: res.data,
			});
		})
		.catch((error) => console.log('catched error: \n', error));
};

// add  rdvs

export const addRdv = (formData) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const res = await axios.post('/api/appointment/', formData, config);

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

// get rdv

export const getRdv = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/appointment/${id}`);
		dispatch({
			type: GET_RDV,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: RDV_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// uptade  rdvs

export const uptRdv = (id, formData) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	// try {
	const res = await axios
		.put(`/api/appointment/${id}`, formData, config)
		.then((res) => {
			dispatch(setAlert('RDV Created ', 'success'));
			dispatch({
				type: UPT_RDV,
				payload: res.data.updated_element,
			});
		})
		.catch((error) => console.log('catched error: \n', error));
};

// get appts  by patient id

export const getAptPatient = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/appointment/by_patient_id/${id}`);
		dispatch({
			type: GET_PATIENT_APT,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: RDVS_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};
