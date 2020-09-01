import { TEXT_ADD, TEXT_REMOVE } from '../actions';

const initState = {
    text: '',
};

const reducer = (state = initState, action) => {
    switch (action.type){
        case TEXT_ADD:
            return {
                ...state,
                text: action.payload,
            };
        case TEXT_REMOVE:
            return {
                ...state,
                text: [],
            };
        default:
            return state;
    }
};

export default reducer;