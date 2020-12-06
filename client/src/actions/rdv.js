import axios from 'axios';
import { setAlert } from './alert';
import {
	ADD_RDV,
	RDVS_ERROR,
	GET_RDVS,
	RDV_ERROR,
	GET_RDV,
	UPT_RDV,
	GET_PATIENT_APT,
	GET_DOCTOR_APT,
	DELETE_RDV,
} from './types';

// get rddvs

export const getRdvs = () => async (dispatch) => {
	await axios
		.get('/api/appointment/')
		.then((res) => {
			dispatch({
				type: GET_RDVS,
				payload: res.data,
			});
		})
		.catch((error) => console.log('catched error: \n', error));
};

// get rddvs false

export const getRdvsFalse = () => async (dispatch) => {
	await axios
		.get('/api/appointment/non_traite')
		.then((res) => {
			dispatch({
				type: GET_RDVS,
				payload: res.data,
			});
		})
		.catch((error) => console.log('catched error: \n', error));
};

// add  rdv

export const addRdv = (formData, history) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	await axios
		.post('/api/appointment/', formData, config)
		.then((res) => {
			dispatch(setAlert('RDV Created ', 'success'));

			dispatch({
				type: ADD_RDV,
				payload: res.data,
			});
			history.push('/apps');
		})

		.catch((error) => console.log('catched error: \n', error));
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

// uptade  rdvs by doc1

export const modifRdv = (id, formData, history) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	// try {
	await axios
		.put(`/api/appointment/${id}`, formData, config)
		.then((res) => {
			dispatch(setAlert('RDV Created ', 'success'));

			dispatch({
				type: UPT_RDV,
				payload: res.data,
			});
			history.push('/apps');
		})
		.catch((error) => console.log('catched error: \n', error));
};

// uptade  rdvs by doc1

export const uptRdv = (id, formData, history) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	// try {
	await axios
		.put(`/api/appointment/${id}`, formData, config)
		.then((res) => {
			dispatch(setAlert('RDV Created ', 'success'));

			dispatch({
				type: UPT_RDV,
				payload: res.data,
			});
			history.push('/consultations');
		})
		.catch((error) => console.log('catched error: \n', error));
};

// uptade  rdvs by doctor2

export const uptRdv2 = (id, formData, history) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	// try {
	await axios
		.put(`/api/appointment/${id}`, formData, config)
		.then((res) => {
			dispatch(setAlert('RDV Created ', 'success'));
			dispatch({
				type: UPT_RDV,
				payload: res.data,
			});
			history.push('/appointments');
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

// get rddvs by doctor id

export const getRdvsd = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/appointment/doctor/${id}`);
		dispatch({
			type: GET_DOCTOR_APT,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: RDVS_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// DELETE Rdv

export const deleteRdv = (id) => async (dispatch) => {
	try {
		await axios.delete(`/api/appointment/${id}`);

		dispatch({
			type: DELETE_RDV,
			payload: id,
		});
		dispatch(setAlert('RDV Delted', 'success'));
	} catch (err) {
		dispatch({
			type: RDVS_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};
