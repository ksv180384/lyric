import { PLAYER_INIT, PLAYER_SET_PLAY } from '../actions';

const initState = {
    player: null,
    play: false,
};

const reducer = (state = initState, action) => {
    switch (action.type){
        case PLAYER_INIT:
            return {
                ...state,
                player: action.payload,
            };
        case PLAYER_SET_PLAY:
            return {
                ...state,
                play: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;