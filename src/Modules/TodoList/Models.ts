import {IAsyncData} from '../../Core/Models';
import {EPriority, EStatus} from './Enums';

/**
 * Модель задачи.
 *
 * @prop {string} description Описание задачи.
 * @prop {EPriority} priotiry Приоритет задачи.
 * @prop {EStatus} status Статус выполнения задачи.
 * @prop {string} title Название задачи.
 * @prop {string} id Идентификатор задачи.
 */
export interface ITodo {
    description: string;
    priotiry: EPriority;
    status: EStatus;
    title: string;
    id: string;
}

/**
 * Модель state в store.
 *
 * @prop {IData} [asyncDataList] Данные с бэка.
 */
export interface ITodoListStore {
    asyncData?: IAsyncData<ITodo>;
    asyncDataList?: IAsyncData<ITodo[]>;
    isLoading?: boolean;
}
