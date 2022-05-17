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
