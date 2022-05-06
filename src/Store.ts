import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import todoListReducer from './Modules/TodoList/Reducers/index';

const store = createStore(
    combineReducers({
        todoListReducer: todoListReducer,
    }),
    applyMiddleware(thunk)
);

export default store;
