import {IAction} from '../../../Core/Models';
import {ActionsTypes} from '../Actions/ActionTypes';
import {IMainStore} from '../Models';

const initialState: IMainStore = {
    asyncData: {
        data: null,
        errorMsg: null,
    },
    isLoading: false,
};

const mainReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
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

export default mainReducer;
