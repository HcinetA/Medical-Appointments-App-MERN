import {
	ADD_PAYMENT,
	PAYMENTS_ERROR,
	GET_PAYMENTS,
	GET_PAYMENT,
	UPT_PAYMENT,
	GET_PATIENT_INV,
} from '../actions/types';

const initialState = {
	payments: [],
	payment: null,
	loading: true,
	error: {},
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case ADD_PAYMENT:
			return {
				...state,
				payments: [...state.payments, payload],
				loading: false,
			};
		case PAYMENTS_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
			};
		case GET_PAYMENTS:
			return {
				...state,
				payments: payload,
				loading: false,
			};
		case GET_PAYMENT:
			return {
				...state,
				payment: payload,
				loading: false,
			};
		case UPT_PAYMENT:
			return {
				...state,
				payment: { ...state.payment, payload },
				loading: false,
			};
		case GET_PATIENT_INV:
			return {
				...state,
				payments: payload,
				loading: false,
			};
		default:
			return state;
	}
}
