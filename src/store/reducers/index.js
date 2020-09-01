import { combineReducers } from 'redux';

import timesReducer from './timesReducer';
import textReducer from './textReducer';
import playerReducer from './playerReducer';
import searchReducer from './searchReducer';


export default combineReducers({
    timesReducer: timesReducer,
    textReducer: textReducer,
    playerReducer: playerReducer,
    searchReducer: searchReducer,
});