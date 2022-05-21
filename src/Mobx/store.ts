import {makeAutoObservable} from 'mobx';
import {IAsyncData} from '../Core/Models';
import {ITodo} from '../Modules/TodoList/Models';
import {TodoListServices} from '../Modules/TodoList/Services/TodoListServices';

/**
 * Интерфейс стора.
 *
 * @prop {IAsyncData<ITodo>} asyncData Задача.
 * @prop {IAsyncData<ITodo[]>} asyncDataList Список задач.
 * @prop {Function} createTodo Создание задачи.
 * @prop {Function} deleteTodo Удаление задачи.
 * @prop {Function} editTodo Редактирование задачи.
 * @prop {Function} getData Получение данных списка с бэка.
 * @prop {Function} getDataByID Получение данных с бэка.
 * @prop {boolean} isLoading Состояние загрузки.
 */
interface ITodoStore {
    asyncData: IAsyncData<ITodo>;
    asyncDataList: IAsyncData<ITodo[]>;
    createTodo: (todo: ITodo) => void;
    deleteTodo: (todo: ITodo) => void;
    editTodo: (todo: ITodo) => void;
    getData: () => void;
    getDataByID: (id: string) => void;
    isLoading: boolean;
}

/**
 * Общий стор приложения.
 */
export type StoreProps = {
    todoStore?: ITodoStore;
};

/**
 * Стор модуля TodoList
 *
 */
export default class TodoStore implements ITodoStore {
    private service = new TodoListServices();

    constructor() {
        makeAutoObservable(this);
    }

    asyncData: {
        data: ITodo;
        errorMsg: string;
    } = {
        data: null,
        errorMsg: null,
    };

    asyncDataList: {
        data: ITodo[];
        errorMsg: string;
    } = {data: [], errorMsg: ''};

    isLoading: boolean = false;

    /**
     * @inheritDoc
     */
    createTodo = (todo: ITodo) => {
        this.isLoading = true;
        this.service
            .createTodo(todo)
            .then(
                () => {
                    this.getData();
                },
                (error: string) => {
                    console.log(error);
                }
            )
            .finally(() => {
                this.isLoading = false;
            });
    };

    /**
     * @inheritDoc
     */
    getData = () => {
        this.isLoading = true;
        this.service
            .getData()
            .then(
                (response: IAsyncData<ITodo[]>) => {
                    this.asyncDataList.data = response.data;
                },
                (error: string) => {
                    console.log(error);
                    this.asyncDataList.errorMsg = error;
                }
            )
            .finally(() => {
                this.isLoading = false;
            });
    };

    /**
     * @inheritDoc
     */
    getDataByID = (id: string) => {
        this.isLoading = true;
        this.service
            .getDataByID(id)
            .then(
                (response: IAsyncData<ITodo>) => {
                    this.asyncData.data = response.data;
                },
                (error: string) => {
                    console.log(error);
                    this.asyncData.errorMsg = error;
                }
            )
            .finally(() => {
                this.isLoading = false;
            });
    };

    /**
     * @inheritDoc
     */
    editTodo = (todo: ITodo) => {
        this.isLoading = true;
        this.service
            .editTodo(todo)
            .then(
                () => {
                    this.getData();
                    this.getDataByID(todo.id);
                },
                (error: string) => {
                    console.log(error);
                    this.asyncData.errorMsg = error;
                }
            )
            .finally(() => {
                this.isLoading = false;
            });
    };

    /**
     * @inheritDoc
     */
    deleteTodo = (todo: ITodo) => {
        this.isLoading = true;
        this.service
            .deleteTodo(todo)
            .then(
                () => {
                    this.getData();
                },
                (error: string) => {
                    console.log(error);
                    this.asyncData.errorMsg = error;
                }
            )
            .finally(() => {
                this.isLoading = false;
            });
    };
}
