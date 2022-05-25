import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ITodo, ITodoListStore} from '../Models';

const initialState: ITodoListStore = {
    asyncData: {
        data: null,
        errorMsg: null,
    },
    asyncDataList: {
        data: null,
        errorMsg: null,
    },
    isLoading: false,
};

const todoListSlice = createSlice({
    name: 'TodoList',
    initialState: initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },
        getDataSuccess(state, action: PayloadAction<ITodo>) {
            state.asyncData.data = action.payload;
            state.isLoading = false;
        },
        getDataFailure(state, action: PayloadAction<string>) {
            state.asyncData.errorMsg = action.payload;
            state.isLoading = false;
        },
        getDataListSuccess(state, action: PayloadAction<ITodo[]>) {
            state.asyncDataList.data = action.payload;
            state.isLoading = false;
        },
        getDataListFailure(state, action: PayloadAction<string>) {
            state.asyncDataList.errorMsg = action.payload;
            state.isLoading = false;
        },
    },
});

export default todoListSlice.reducer;

export const {
    startLoading,
    getDataSuccess,
    getDataFailure,
    getDataListSuccess,
    getDataListFailure,
} = todoListSlice.actions;
