import { GET_KOHDET, GET_LOCATIONS } from '../actions/actionTypes';

export default function(state={}, action){
    switch(action.type){
        case GET_KOHDET:
            return action.payload;
            
        case GET_LOCATIONS:
            return action.payload;

        default:
            return state;
    }
}