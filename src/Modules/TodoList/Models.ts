import {EPriority, EStatus} from './Enums';
import {IAsyncData} from '../../Core/Models';

/**
 * Модель задачи.
 *
 * @prop {string} description Описание задачи.
 * @prop {EPriority} priority Приоритет задачи.
 * @prop {EStatus} status Статус выполнения задачи.
 * @prop {string} title Название задачи.
 * @prop {string} [id] Идентификатор задачи.
 */
export interface ITodo {
    description: string;
    priority: EPriority;
    status: EStatus;
    title: string;
    id?: string;
}

/**
 * Модель state в store.
 *
 * @prop {IAsyncData<ITodo>} [asyncData] Задача.
 * @prop {IAsyncData<ITodo[]>} [asyncDataList] Список задач.
 * @prop {boolean} [isLoading] Состояние загрузки.
 */
export interface ITodoListStore {
    asyncData?: IAsyncData<ITodo>;
    asyncDataList?: IAsyncData<ITodo[]>;
    isLoading?: boolean;
}
