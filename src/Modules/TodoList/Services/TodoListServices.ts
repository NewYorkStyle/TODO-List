import axios from 'axios';
import {REST} from '../../../Core/Consts';
import {IAsyncData} from '../../../Core/Models';
import {ITodo} from '../Models';

/**
 * Интерфейс сервисов для работы с модулем TodoList.
 */
export interface ITodoListServices {
    /**
     * Получение данных списка с бэка.
     */
    getData: () => Promise<IAsyncData<ITodo[]>>;

    /**
     * Получение данных с бэка.
     *
     * @param {string} id Идентификатор задачи
     */
    getDataByID: (id: string) => Promise<IAsyncData<ITodo>>;
}

/**
 * Сервисы для работы с модулем TodoList.
 */
export class TodoListServices implements ITodoListServices {
    /**
     * @inheritdoc
     */
    getData = (): Promise<IAsyncData<ITodo[]>> => {
        return axios.get(`${REST}/getData`);
    };

    /**
     * @inheritdoc
     */
    getDataByID = (id: string): Promise<IAsyncData<ITodo>> => {
        return axios.get(`${REST}/getData/${id}`);
    };
}
