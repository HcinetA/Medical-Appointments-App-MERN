import {
	ADD_RDV,
	RDVS_ERROR,
	GET_RDVS,
	RDV_ERROR,
	GET_RDV,
	UPT_RDV,
	UPTRDV_ERROR,
	GET_PATIENT_APT,
} from '../actions/types';

const initialState = {
	rdvs: [],
	rdv: null,
	loading: true,
	error: {},
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case GET_RDVS:
			return {
				...state,
				rdvs: payload,
				loading: false,
				rdv: null,
			};
		case GET_PATIENT_APT:
			return {
				...state,
				rdvs: payload,
				loading: false,
			};
		case GET_RDV:
			return {
				...state,
				rdv: payload,
				loading: false,
			};

		case ADD_RDV:
			return {
				...state,
				rdvs: [...state.rdvs, payload],
				loading: false,
			};
		case UPT_RDV:
			return {
				...state,
				rdv: { ...state.rdv, payload },
				loading: false,
			};
		case RDV_ERROR:
		case RDVS_ERROR:
		case UPTRDV_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
			};
		default:
			return state;
	}
}
