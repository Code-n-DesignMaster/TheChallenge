import { ITEMS_FETCH_DATA_SUCCESS, ITEMS_FETCH_DATA_FAIL, ITEMS_FETCH_DATA_REQUEST } from '../constants';

const newState = {
    loading: true,
    state: [],
    error: []
};

export function items(state = newState, action) {
    switch (action.type) {
        case ITEMS_FETCH_DATA_SUCCESS:
            return {
                loading: false,
                state: [...action.items]
            };

        case ITEMS_FETCH_DATA_FAIL:
            return {
                ...state,
                loading: false,
                error: [...action.error]
            };

        case ITEMS_FETCH_DATA_REQUEST:
            return {
                ...state,
                loading: true
            };

        default:
            return state;
    }
}
