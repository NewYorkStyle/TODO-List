import {EPriority, EStatus} from '../Enums';

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
