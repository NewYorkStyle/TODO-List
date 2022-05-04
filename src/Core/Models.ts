import {IMainStore} from '../Modules/Main/Models';

/**
 * Интерфейс экшенов.
 */
export interface IAction {
    type: string;
    payload?: any;
}

/**
 * Общий стор приложения.
 *
 * @param {IMainStore} mainReducer Модуль "Главная страница"
 */
export interface IStore {
    mainReducer: IMainStore;
}
