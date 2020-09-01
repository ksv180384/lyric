import { PLAYER_INIT, PLAYER_SET_PLAY } from './index';
//import store  from '../index';


export const initPlayer = (player) => {
    return { type: PLAYER_INIT, payload: player };
};

export const setPlay = (play) => {
    return { type: PLAYER_SET_PLAY, payload: play };
};

