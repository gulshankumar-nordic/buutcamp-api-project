import { GET_KOHDET } from '../actions/actionTypes';
import { database } from '../firebase';

export function getKohdet(){
    return dispatch => {
        database.on('value', snapshot => {
            dispatch({
                type: GET_KOHDET,
                payload: snapshot.val()
            });
        });
    };
}

export function saveKohde(kohde){
    return dispatch => database.push(kohde)
}
