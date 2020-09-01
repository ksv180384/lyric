import { REQUEST_SEARCH, SUCCESS_SEARCH, ERROR_SEARCH } from '../actions';

const initState = {
    loading: false,
    search_result: [],
};

const reducer = (state = initState, action) => {
    switch (action.type){
        case REQUEST_SEARCH:
            return {
                ...state,
                loading: true,
            };
        case SUCCESS_SEARCH:
            return {
                ...state,
                loading: false,
                search_result: action.payload,
            };
        case ERROR_SEARCH:
            return {
                ...state,
                loading: false,
                search_result: [],
            };
        default:
            return state;
    }
};

export default reducer;