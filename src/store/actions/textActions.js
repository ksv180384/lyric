import { TEXT_ADD, TEXT_REMOVE } from './index';
import store from "../index";

export const addText = (text) => {
    return { type: TEXT_ADD, payload: text };
};

export const addMarkInText = (index, mark_time) => {
    const text = store.getState().textReducer.text;
    const lines = text.split(/\n/);
    const count_lines = lines.length;
    if((count_lines - 1) >= index){
        lines[index] = '[' + mark_time + ']' + lines[index];
    }
    let new_text = '';
    for (let key in lines){
        //console.log(key + ' === ' + (lines.length - 1));
        if(parseInt(key, 10) === (lines.length - 1)){
            new_text += lines[key];
            //console.log(key + ' === ' + (lines.length - 1));
        }else{
            new_text += lines[key] + "\n";
        }
    }
    return { type: TEXT_ADD, payload: new_text };
};

export const changeTime = (index, mark_time) => {
    const text = store.getState().textReducer.text;
    const times = store.getState().timesReducer.times;
    const lines = text.split(/\n/);
    const count_lines = lines.length;
    if((count_lines - 1) >= index){
        lines[index] = lines[index].replace(/(\[.*?\]) */g, '');
        lines[index] = '[' + mark_time + ']' + lines[index];
    }
    let new_text = '';
    for (let key in lines){
        //console.log(key + ' === ' + (lines.length - 1));
        if(parseInt(key, 10) === (lines.length - 1)){
            new_text += lines[key];
            //console.log(key + ' === ' + (lines.length - 1));
        }else{
            new_text += lines[key] + "\n";
        }
    }
    return { type: TEXT_ADD, payload: new_text };
};

export const removeText = (index) => {
    return { type: TEXT_REMOVE };
};