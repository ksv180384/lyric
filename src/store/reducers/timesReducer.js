import { TIME_ADD, TIME_REMOVE, TIME_REMOVE_ALL, TIME_CHANGE } from '../actions';

const initState = {
    times: [],
};

const reducer = (state = initState, action) => {
    switch (action.type){
        case TIME_ADD:
            return {
                ...state,
                times: action.payload,
            };
        case TIME_REMOVE:
            return {
                ...state,
                times: state.payload.splice(action.payload, 1),
            };
        case TIME_REMOVE_ALL:
            return {
                ...state,
                times: [],
            };
        case TIME_CHANGE:
            return {
                ...state,
                times: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;