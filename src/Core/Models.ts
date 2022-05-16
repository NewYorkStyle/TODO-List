import {ITodoListStore} from '../Modules/TodoList/Models';

/**
 * Интерфейс экшенов.
 *
 * @param {any} [payload] Значение.
 * @param {string} type Тип экшена.
 */
export interface IAction {
    payload?: any;
    type: string;
}

/**
 * Общий стор приложения.
 *
 * @param {ITodoListStore} todoListReducer Модуль "Список задач"
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
