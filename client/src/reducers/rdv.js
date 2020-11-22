import { ADD_RDV, RDVS_ERROR, GET_RDVS, RDV_ERROR } from '../actions/types';

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
			};
		case RDV_ERROR:
		case RDVS_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
			};
		case ADD_RDV:
			return {
				...state,
				rdvs: [...state.rdvs, payload],
				loading: false,
			};

		default:
			return state;
	}
}
