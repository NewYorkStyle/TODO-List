import {Dispatch} from 'redux';
import {IAsyncData} from '../../../Core/Models';
import {ITodo} from '../Models';
import {ITodoListServices} from '../Services/TodoListServices';
import {ActionsTypes} from './ActionTypes';

/**
 * Интерфейс экшенов для работы с модулем TodoList.
 */
export interface ITodoListActions {
    /**
     * Получение списка задач.
     */
    getData: () => void;

    /**
     * Получение детальных даных по задаче.
     *
     * @param {string} id Идентификатор.
     */
    getDataByID: (id: string) => void;

    /**
     * Создание задачи.
     *
     * @param {ITodo} todo Задача.
     */
    createTodo: (todo: ITodo) => void;

    /**
     * Редактирование задачи.
     *
     * @param {ITodo} todo Задача.
     */
     editTodo: (todo: ITodo) => void;
}

/**
 * Экшены для работы с модулем TodoList.
 */
export class TodoListActions implements ITodoListActions {
    constructor(
        private dispatch: Dispatch,
        private service: ITodoListServices
    ) {
        this.dispatch = dispatch;
        this.service = service;
    }

    /**
     * @inheritdoc
     */
    getData = () => {
        this.dispatch({
            type: ActionsTypes.GET_DATA_START,
        });
        this.service.getData().then(
            (response: IAsyncData<ITodo[]>) => {
                this.dispatch({
                    type: ActionsTypes.GET_DATA_LIST_SUCCESS,
                    payload: response.data,
                });
            },
            (error: string) => {
                console.log(error);
                this.dispatch({
                    type: ActionsTypes.GET_DATA_LIST_FAILURE,
                    payload: error,
                });
            }
        );
    };

    /**
     * @inheritdoc
     */
    getDataByID = (id: string) => {
        this.dispatch({
            type: ActionsTypes.GET_DATA_START,
        });
        this.service.getDataByID(id).then(
            (response: IAsyncData<ITodo>) => {
                this.dispatch({
                    type: ActionsTypes.GET_DATA_SUCCESS,
                    payload: response.data,
                });
            },
            (error: string) => {
                console.log(error);
                this.dispatch({
                    type: ActionsTypes.GET_DATA_FAILURE,
                    payload: error,
                });
            }
        );
    };

    /**
     * @inheritdoc
     */
    createTodo = (todo: ITodo) => {
        this.dispatch({
            type: ActionsTypes.GET_DATA_START,
        });
        this.service.createTodo(todo).then(
            () => {
                this.getData();
            },
            (error: string) => {
                console.log(error);
                this.dispatch({
                    type: ActionsTypes.GET_DATA_FAILURE,
                    payload: error,
                });
            }
        );
    };

    /**
     * @inheritdoc
     */
    editTodo = (todo: ITodo) => {
        this.dispatch({
            type: ActionsTypes.GET_DATA_START,
        });
        this.service.editTodo(todo).then(
            () => {
                this.getData();
                this.getDataByID(todo.id);
            },
            (error: string) => {
                console.log(error);
                this.dispatch({
                    type: ActionsTypes.GET_DATA_FAILURE,
                    payload: error,
                });
            }
        );
    };
}
