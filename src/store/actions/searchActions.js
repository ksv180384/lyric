import { REQUEST_SEARCH, SUCCESS_SEARCH, ERROR_SEARCH } from './index';
import axios from 'axios';
import { config } from '../../config';

export const search = (text) => {

    return (dispatch) => {
        dispatch({ type: REQUEST_SEARCH });
        axios.post(config.path + 'api/search', { text: text }).then(result => {

            dispatch({ type: SUCCESS_SEARCH, payload: result.data.search });
        }).catch(error => {
            dispatch({ type: ERROR_SEARCH });
            if(error.response){
                let err = error.response.data;
                if(error.response.status === 404){
                    err = 'Неудалось подключиться к серверу. Попробуйте позже.';
                }
                alert(err);
            }else if(error.request){
                alert('Неудалось подключиться к серверу. Попробуйте позже.');
            }
        });
    }
};