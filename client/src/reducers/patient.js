import {
	ADD_PATIENT,
	GET_PATIENTS,
	PATIENTS_ERROR,
	PATIENT_ERROR,
} from '../actions/types';

const initialState = {
	patients: [],
	patient: null,
	loading: true,
	error: {},
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case GET_PATIENTS:
			return {
				...state,
				patients: payload,
				loading: false,
			};
		case PATIENTS_ERROR:
		case PATIENT_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
			};
		case ADD_PATIENT:
			return {
				...state,
				patients: [...state.patients, payload],
				loading: false,
			};

		default:
			return state;
	}
}
