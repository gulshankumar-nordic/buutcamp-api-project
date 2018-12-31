import { combineReducers } from 'redux';
import kohdeReducer from './kohdeReducer';
import userReducer from './userReducer';
import loadingReducer from './loadingReducer';

const rootReducer = combineReducers({
    kohdet: kohdeReducer,
    user: userReducer,
    loading: loadingReducer
});

export default rootReducer;