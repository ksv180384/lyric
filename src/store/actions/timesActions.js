import { TIME_ADD, TIME_REMOVE, TIME_REMOVE_ALL, TIME_CHANGE } from './index';
import store  from '../index';

export const addTime = (time) => {
    const t = [...store.getState().timesReducer.times, time];
    return { type: TIME_ADD, payload: t };
};

export const removeTime = (index) => {
    return { type: TIME_REMOVE, payload: index };
};

export const removeTimeAll = () => {
    return { type: TIME_REMOVE_ALL };
};
