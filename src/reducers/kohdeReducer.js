import { GET_KOHDET } from '../actions/actionTypes';

export default function(state={}, action){
    switch(action.type){
        case GET_KOHDET:
            return action.payload;
        
            default:
                return state;
    }
}