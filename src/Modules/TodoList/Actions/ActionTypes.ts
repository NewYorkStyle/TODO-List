/**
 * Типы экшенов
 */
export enum ActionsTypes {
    GET_DATA_START = 'GET_DATA_START', // Начало загрузки.
    GET_DATA_SUCCESS = 'GET_DATA_SUCCESS', // Успешное завершение загрузки.
    GET_DATA_FAILURE = 'GET_DATA_FAILURE', // Ошибка при загрузке.
    GET_DATA_LIST_SUCCESS = 'GET_DATA_LIST_SUCCESS', // Успешное завершение загрузки списка.
    GET_DATA_LIST_FAILURE = 'GET_DATA_LIST_FAILURE', // Ошибка при загрузке списка.
}
