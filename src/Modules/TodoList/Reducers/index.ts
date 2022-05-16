import {ActionsTypes} from '../Actions/ActionTypes';
import {ITodoListStore} from '../Models';
import {IAction} from '../../../Core/Models';

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

const todoListReducer = (
    state = initialState,
    action: IAction
): ITodoListStore => {
    switch (action.type) {
        case ActionsTypes.GET_DATA_LIST_SUCCESS:
            return {
                ...state,
                asyncDataList: {
                    data: action.payload,
                },
                isLoading: false,
            };
        case ActionsTypes.GET_DATA_LIST_FAILURE:
            return {
                ...state,
                asyncDataList: {
                    errorMsg: action.payload,
                },
                isLoading: false,
            };
        case ActionsTypes.GET_DATA_START:
            return {
                ...state,
                isLoading: true,
            };
        case ActionsTypes.GET_DATA_SUCCESS:
            return {
                ...state,
                asyncData: {
                    data: action.payload,
                },
                isLoading: false,
            };
        case ActionsTypes.GET_DATA_FAILURE:
            return {
                ...state,
                asyncData: {
                    errorMsg: action.payload,
                },
                isLoading: false,
            };
        default:
            return state;
    }
};

export default todoListReducer;
