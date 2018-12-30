import { USER_STATUS, KOHDIEN_STATUS } from '../actions/actionTypes';

export default function(state={}, action){
    switch(action.type){
        case KOHDIEN_STATUS:
            return {...state, kohdet: action.payload}
        
        case USER_STATUS:
            return {...state, user: action.payload}
            
        default:
            return state;
    }
}