import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import {REST_URL} from '../../../Core/Consts';
import {ITodo} from '../Models';

export const todoListApi = createApi({
    reducerPath: 'todoList',
    baseQuery: fetchBaseQuery({baseUrl: REST_URL}),
    tagTypes: ['TodoList', 'Todo'],
    endpoints: (build) => ({
        /**
         * Получение данных списка с бэка.
         */
        getTodoList: build.query<ITodo[], void>({
            query: () => ({
                url: '/todo',
            }),
            providesTags: () => ['TodoList'],
        }),
        /**
         * Получение данных с бэка.
         *
         * @param {string} id Идентификатор задачи.
         */
        getTodoByID: build.query<ITodo, string>({
            query: (id: string) => ({
                url: `/todo/${id}`,
            }),
            providesTags: () => ['Todo'],
        }),
        /**
         * Создание задачи.
         *
         * @param {ITodo} todo Задача.
         */
        createTodo: build.mutation<ITodo, ITodo>({
            query: (todo: ITodo) => ({
                url: '/todo',
                method: 'POST',
                body: todo,
            }),
            invalidatesTags: ['TodoList'],
        }),
        /**
         * Редактирование задачи.
         *
         * @param {ITodo} todo Задача.
         */
        editTodo: build.mutation<ITodo, ITodo>({
            query: (todo: ITodo) => ({
                url: `/todo/${todo.id}`,
                method: 'PUT',
                body: todo,
            }),
            invalidatesTags: ['Todo', 'TodoList'],
        }),
        /**
         * Удаление задачи.
         *
         * @param {ITodo} todo Задача.
         */
        deleteTodo: build.mutation<ITodo, ITodo>({
            query: (todo: ITodo) => ({
                url: `/todo/${todo.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['TodoList'],
        }),
    }),
});
