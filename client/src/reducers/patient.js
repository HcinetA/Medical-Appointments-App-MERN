import {
	ADD_PATIENT,
	GET_PATIENTS,
	PATIENTS_ERROR,
	PATIENT_ERROR,
	UPT_PATIENT,
	GET_PATIENT,
	DELETE_PATIENT,
	GET_PATIENT_PHONE,
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
				patient: null,
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
		case GET_PATIENT:
			return {
				...state,
				patient: payload,
				loading: false,
			};
		case UPT_PATIENT:
			return {
				...state,
				patient: { ...state.patient, payload },
				loading: false,
			};
		case DELETE_PATIENT:
			return {
				...state,
				patients: state.patients.filter((patient) => patient._id !== payload),
				loading: false,
			};

		case GET_PATIENT_PHONE:
			return {
				...state,
				patients: payload,
				loading: false,
			};
		default:
			return state;
	}
}
