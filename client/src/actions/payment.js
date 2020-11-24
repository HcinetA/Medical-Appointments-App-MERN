import axios from 'axios';
import { setAlert } from './alert';
import {
	ADD_PAYMENT,
	PAYMENTS_ERROR,
	GET_PAYMENTS,
	GET_PAYMENT,
	UPT_PAYMENT,
	GET_PATIENT_INV,
} from './types';

// add payment

export const addPayment = (formData) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const res = await axios.post('/api/invoice/', formData, config);

		dispatch({
			type: ADD_PAYMENT,
			payload: res.data,
		});

		dispatch(setAlert('Payment Created ', 'success'));
	} catch (err) {
		dispatch({
			type: PAYMENTS_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// get payments

export const getPayments = () => async (dispatch) => {
	const res = await axios
		.get('/api/invoice/')
		.then((res) => {
			dispatch({
				type: GET_PAYMENTS,
				payload: res.data,
			});
		})
		.catch((error) => console.log('catched error: \n', error));
};

// get payment by id

export const getPayment = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/invoice/${id}`);
		dispatch({
			type: GET_PAYMENT,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PAYMENTS_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// uptade  payment

export const uptPayment = (id, formData) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	// try {
	const res = await axios
		.put(`/api/invoice/${id}`, formData, config)
		.then((res) => {
			dispatch(setAlert('Payment Updated ', 'success'));
			dispatch({
				type: UPT_PAYMENT,
				payload: res.data.updated_element,
			});
		})
		.catch((error) => console.log('catched error: \n', error));
};

// get invoices  by patient id

export const getInvPatient = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/invoice/by_patient_id/${id}`);
		dispatch({
			type: GET_PATIENT_INV,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PAYMENTS_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};
