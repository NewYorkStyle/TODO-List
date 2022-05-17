import {ITodo} from '../Models';
import {ITodoListServices} from '../Services/TodoListServices';
import {IAsyncData} from '../../../Core/Models';
import {
    getDataListSuccess,
    getDataListFailure,
    startLoading,
    getDataFailure,
    getDataSuccess,
} from '../Reducers';
import {Dispatch} from '@reduxjs/toolkit';

/**
 * Интерфейс экшенов для работы с модулем TodoList.
 */
interface ITodoListActions {
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

    /**
     * Удаление задачи.
     *
     * @param {ITodo} todo Задача.
     */
    deleteTodo: (todo: ITodo) => void;
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
        this.dispatch(startLoading());
        this.service.getData().then(
            (response: IAsyncData<ITodo[]>) => {
                this.dispatch(getDataListSuccess(response.data));
            },
            (error: string) => {
                console.log(error);
                this.dispatch(getDataListFailure(error));
            }
        );
    };

    /**
     * @inheritdoc
     */
    getDataByID = (id: string) => {
        this.dispatch(startLoading());
        this.service.getDataByID(id).then(
            (response: IAsyncData<ITodo>) => {
                this.dispatch(getDataSuccess(response.data));
            },
            (error: string) => {
                console.log(error);
                this.dispatch(getDataFailure(error));
            }
        );
    };

    /**
     * @inheritdoc
     */
    createTodo = (todo: ITodo) => {
        this.dispatch(startLoading());
        this.service.createTodo(todo).then(
            () => {
                this.getData();
            },
            (error: string) => {
                console.log(error);
                this.dispatch(getDataFailure(error));
            }
        );
    };

    /**
     * @inheritdoc
     */
    editTodo = (todo: ITodo) => {
        this.dispatch(startLoading());
        this.service.editTodo(todo).then(
            () => {
                this.getData();
                this.getDataByID(todo.id);
            },
            (error: string) => {
                console.log(error);
                this.dispatch(getDataFailure(error));
            }
        );
    };

    /**
     * @inheritdoc
     */
    deleteTodo = (todo: ITodo) => {
        this.dispatch(startLoading());
        this.service.deleteTodo(todo).then(
            () => {
                this.getData();
            },
            (error: string) => {
                console.log(error);
                this.dispatch(getDataFailure(error));
            }
        );
    };
}
