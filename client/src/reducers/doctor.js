import { GET_DOCTORS, DOCTORS_ERROR } from '../actions/types';

const initialState = {
	doctors: [],
	doctor: null,
	loading: true,
	error: {},
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_DOCTORS:
			return {
				...state,
				doctors: payload,
				loading: false,
			};
		case DOCTORS_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
			};

		default:
			return state;
	}
}
