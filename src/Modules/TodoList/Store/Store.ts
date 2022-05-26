import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {todoListApi} from './TodoListApi';

const rootReducer = combineReducers({
    [todoListApi.reducerPath]: todoListApi.reducer,
});

export const setupStore = () =>
    configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(todoListApi.middleware),
    });
