import {combineReducers, configureStore} from '@reduxjs/toolkit';
import todoListSlice from './Modules/TodoList/Reducers';

const rootReducer = combineReducers({
    todoListReducer: todoListSlice,
});

export const setupStore = () =>
    configureStore({
        reducer: rootReducer,
    });

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof setupStore>['dispatch'];
