import { GET_DOCTORS, DOCTORS_ERROR } from '../actions/types';

const initialState = {
	doctors: [],
	doctor: null,
	dloading: true,
	error: {},
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_DOCTORS:
			return {
				...state,
				doctors: payload,
				dloading: false,
			};
		case DOCTORS_ERROR:
			return {
				...state,
				error: payload,
				dloading: false,
			};

		default:
			return state;
	}
}
