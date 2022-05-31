import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {todoListApi} from './Modules/TodoList/Store/todos.api';

const rootReducer = combineReducers({
    [todoListApi.reducerPath]: todoListApi.reducer,
});

export const setupStore = () =>
    configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(todoListApi.middleware),
    });
