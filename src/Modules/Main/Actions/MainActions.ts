import {Dispatch} from 'redux';
import {IData} from '../Models';
import {IServices} from '../Services/MainServices';
import {ActionsTypes} from './ActionTypes';

/**
 * Интерфейс экшенов для работы с модулем Main.
 */
export interface IActions {
    /**
     * Получение данных с бэка.
     */
    getData: () => void;
}

/**
 * Экшены для работы с модулем Main.
 */
export class MainActions implements IActions {
    constructor(private dispatch: Dispatch, private service: IServices) {
        this.dispatch = dispatch;
        this.service = service;
    }

    /**
     * @inheritdoc
     */
    getData = () => {
        this.dispatch({
            type: ActionsTypes.GET_DATA_START,
        });
        this.service.getData().then(
            (response: IData) => {
                this.dispatch({
                    type: ActionsTypes.GET_DATA_SUCCESS,
                    payload: response.data,
                });
            },
            (error: string) => {
                console.log(error);
                this.dispatch({
                    type: ActionsTypes.GET_DATA_FAILURE,
                    payload: error,
                });
            }
        );
    };
}
