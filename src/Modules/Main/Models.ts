/**
 * Модель данных с бэка.
 * @prop {string[]} [data] Данные с бэка.
 * @prop {string} [errorMsg] Сообщение об ошибке.
 */
export interface IData {
    data?: string[];
    errorMsg?: string;
}

/**
 * Модель state в store.
 *
 * @prop {IData} [asyncData] Данные с бэка.
 * @prop {boolean} [isLoading] Состояние загрузки.
 */
export interface IMainStore {
    asyncData?: IData;
    isLoading?: boolean;
}
