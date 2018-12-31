import { GET_KOHDET, KOHDIEN_STATUS, GET_LOCATIONS } from '../actions/actionTypes';
import { database } from '../firebase';

export function getKohdet(){
    return dispatch => {
        dispatch({
            type: KOHDIEN_STATUS,
            payload: true
        });
        database.on('value', snapshot => {
            dispatch({
                type: GET_KOHDET,
                payload: snapshot.val()
            });
            dispatch({
                type: KOHDIEN_STATUS,
                payload: false
            });
        }, 
        () => {
            dispatch({
                type: KOHDIEN_STATUS,
                payload: -1
            });
        });
    };
}

export function getLocations(){
    return dispatch => {
        database.on('value', snapshot => {
            dispatch({
                type: GET_LOCATIONS,
                payload: snapshot.val()
            });
          
        });
    };
}

export function saveKohde(kohde){
    return dispatch => database.push(kohde)
}

export function updateKohde(id, kohde){
    return dispatch => database.child(id).update(kohde)
}

export function deleteKohde(id){
    return dispatch => database.child(id).remove()
}

export function saveReview(kohdeId, review){
    return dispatch => database.child(kohdeId).child('review').push(review)
}