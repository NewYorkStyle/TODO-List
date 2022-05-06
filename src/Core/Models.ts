import {ITodoListStore} from '../Modules/TodoList/Models';

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
 * @param {ITodoListStore} todoListReducer Модуль "Главная страница"
 */
export interface IStore {
    todoListReducer: ITodoListStore;
}

/**
 * Модель данных с бэка.
 *
 * @prop {T} [data] Данные с бэка.
 * @prop {string} [errorMsg] Сообщение об ошибке.
 */
export interface IAsyncData<T> {
    data?: T;
    errorMsg?: string;
}
