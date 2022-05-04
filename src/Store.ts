import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import mainReducer from './Modules/Main/Reducers/index';

const store = createStore(
    combineReducers({
        mainReducer,
    }),
    applyMiddleware(thunk)
);

export default store;
