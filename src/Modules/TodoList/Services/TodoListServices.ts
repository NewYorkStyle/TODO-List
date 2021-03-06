import axios from 'axios';
import {ITodo} from '../Models';
import {REST} from '../../../Core/Consts';
import {IAsyncData} from '../../../Core/Models';

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
     * @param {string} id Идентификатор задачи.
     */
    getDataByID: (id: string) => Promise<IAsyncData<ITodo>>;

    /**
     * Создание задачи.
     *
     * @param {ITodo} todo Задача.
     */
    createTodo: (todo: ITodo) => Promise<IAsyncData<ITodo>>;

    /**
     * Редактирование задачи.
     *
     * @param {ITodo} todo Задача.
     */
    editTodo: (todo: ITodo) => Promise<IAsyncData<ITodo>>;

    /**
     * Удаление задачи.
     *
     * @param {ITodo} todo Задача.
     */
     deleteTodo: (todo: ITodo) => Promise<IAsyncData<ITodo>>;
}

/**
 * Сервисы для работы с модулем TodoList.
 */
export class TodoListServices implements ITodoListServices {
    /**
     * @inheritdoc
     */
    getData = (): Promise<IAsyncData<ITodo[]>> => {
        return axios.get(`${REST}/todo`);
    };

    /**
     * @inheritdoc
     */
    getDataByID = (id: string): Promise<IAsyncData<ITodo>> => {
        return axios.get(`${REST}/todo/${id}`);
    };

    /**
     * @inheritdoc
     */
    createTodo = (todo: ITodo): Promise<IAsyncData<ITodo>> => {
        return axios.post(`${REST}/todo`, todo);
    };

    /**
     * @inheritdoc
     */
    editTodo = (todo: ITodo): Promise<IAsyncData<ITodo>> => {
        return axios.put(`${REST}/todo/${todo.id}`, todo);
    };

    /**
     * @inheritdoc
     */
    deleteTodo = (todo: ITodo): Promise<IAsyncData<ITodo>> => {
        return axios.delete(`${REST}/todo/${todo.id}`);
    };
}
