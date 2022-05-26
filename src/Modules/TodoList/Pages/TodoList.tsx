import {Button, Col, List, Row, Spin} from 'antd';
import {
    CheckCircleTwoTone,
    FireTwoTone,
    PlusCircleOutlined,
    QuestionCircleTwoTone,
} from '@ant-design/icons';
import * as React from 'react';
import {TodoCard} from '../Components/TodoCard';
import {TodoCreateModal} from '../Components/TodoCreateModal';
import {TodoDetailsModal} from '../Components/TodoDetailsModal';
import {EStatus} from '../Enums';
import {ITodo} from '../Models';
import {TextObject} from '../Text';
import {todoListApi} from '../Store/TodoListApi';

export const TodoList = () => {
    /** Флаг для показа модального окна детального просмотра */
    const [showDetailsModal, setShowDetailsModal] =
        React.useState<boolean>(false);
    /** Флаг для показа модального окна создания */
    const [showCreateModal, setShowCreateModal] =
        React.useState<boolean>(false);
    /** Флаг для показа модального окна редактирования */
    const [showEditModal, setShowEditModal] = React.useState<boolean>(false);
    /** Идентификатор выбранной задачи */
    const [todoId, setTodoId] = React.useState<string>(null);

    /** Получение списка задач */
    const {data: dataList, isFetching: isListLoading} =
        todoListApi.useGetTodoListQuery();
    /** Получение задачи */
    const {data, isFetching: isDataLoading} =
        todoListApi.useGetTodoByIDQuery(todoId);
    /** Создание задачи */
    const [createTodo, {isLoading: isCreateLoading}] =
        todoListApi.useCreateTodoMutation();
    /** Редактирование задачи */
    const [editTodo, {isLoading: isEditLoading}] =
        todoListApi.useEditTodoMutation();
    /** Удаление задачи */
    const [deleteTodo, {isLoading: isDeleteLoading}] =
        todoListApi.useDeleteTodoMutation();

    /**
     * Обаотчик клика по задаче в списке.
     *
     * @param {string} id Идентификатор.
     */
    const handleCardOnClick = (id: string): void => {
        setTodoId(id);
        setShowDetailsModal(true);
    };

    /**
     * Обработчик закрытия модального окна детального просмотра.
     */
    const handleDetailsModalClose = (): void => {
        setShowDetailsModal(false);
    };

    /**
     * Обработчик закрытия модального окна создания.
     */
    const handleCreateModalClose = (): void => {
        setShowCreateModal(false);
    };

    /**
     * Обработчик клика по кнопке создать (плюсик)
     */
    const handleCreateButtonClick = (): void => {
        setShowCreateModal(true);
    };

    /**
     * Обработчик создания TODO.
     */
    const handleCreateTodoClick = (todo: ITodo): void => {
        createTodo(todo);
        setShowCreateModal(false);
    };

    /**
     * Обработчик изменения статуса TODO.
     */
    const handleStatusChange = (todo: ITodo): void => {
        editTodo(todo);
    };

    /**
     * Обработчик удаления TODO.
     */
    const handleDelete = (todo: ITodo): void => {
        deleteTodo(todo);
        setShowDetailsModal(false);
    };

    /**
     * Обработчик кнопки редактировать.
     */
    const handleEditButtonClick = (): void => {
        setShowDetailsModal(false);
        setShowEditModal(true);
    };

    /**
     * Обработчик закрытия модального окна редактирования.
     */
    const handleEditModalClose = (): void => {
        setShowEditModal(false);
    };

    /**
     * Обработчик сохранения при редактировании.
     */
    const handleEditSave = (todo: ITodo): void => {
        editTodo(todo);
        setShowEditModal(false);
        setShowDetailsModal(true);
    };

    /** Список задач в статусе TODO */
    const todoList = dataList?.filter((todo: ITodo) => {
        return todo.status === EStatus.TODO;
    });

    /** Список задач в статусе DOING */
    const doingList = dataList?.filter((todo: ITodo) => {
        return todo.status === EStatus.DOING;
    });

    /** Список задач в статусе DONE */
    const doneList = dataList?.filter((todo: ITodo) => {
        return todo.status === EStatus.DONE;
    });

    /** Состояние загрузки */
    const isLoading =
        isListLoading ||
        isCreateLoading ||
        isEditLoading ||
        isDeleteLoading ||
        isDataLoading;

    return (
        <Spin spinning={isLoading} tip={TextObject.TodoList.Loading}>
            {dataList ? (
                <Row>
                    <Col span={8}>
                        <List
                            bordered
                            className="todoList"
                            dataSource={todoList}
                            header={
                                <b>
                                    <QuestionCircleTwoTone />{' '}
                                    {TextObject.TodoList.List.ColumnTitle.TODO}
                                </b>
                            }
                            renderItem={(todo: ITodo) => (
                                <List.Item key={todo.id}>
                                    <TodoCard
                                        onClick={handleCardOnClick}
                                        todo={todo}
                                    />
                                </List.Item>
                            )}
                        />
                    </Col>
                    <Col span={8}>
                        <List
                            bordered
                            className="todoList"
                            dataSource={doingList}
                            header={
                                <b>
                                    <FireTwoTone />{' '}
                                    {TextObject.TodoList.List.ColumnTitle.Doing}
                                </b>
                            }
                            renderItem={(todo: ITodo) => (
                                <List.Item key={todo.id}>
                                    <TodoCard
                                        onClick={handleCardOnClick}
                                        todo={todo}
                                    />
                                </List.Item>
                            )}
                        />
                    </Col>
                    <Col span={8}>
                        <List
                            bordered
                            className="todoList"
                            dataSource={doneList}
                            header={
                                <b>
                                    <CheckCircleTwoTone />{' '}
                                    {TextObject.TodoList.List.ColumnTitle.Done}
                                </b>
                            }
                            renderItem={(todo: ITodo) => (
                                <List.Item key={todo.id}>
                                    <TodoCard
                                        onClick={handleCardOnClick}
                                        todo={todo}
                                    />
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
            ) : null}
            {showDetailsModal && !isLoading && data ? (
                <TodoDetailsModal
                    onChange={handleStatusChange}
                    onClose={handleDetailsModalClose}
                    onDelete={handleDelete}
                    onEdit={handleEditButtonClick}
                    todo={data}
                />
            ) : null}
            {showCreateModal && !isLoading && (
                <TodoCreateModal
                    onClose={handleCreateModalClose}
                    onSave={handleCreateTodoClick}
                />
            )}
            {showEditModal && !isLoading && (
                <TodoCreateModal
                    onClose={handleEditModalClose}
                    onSave={handleEditSave}
                    todo={data}
                />
            )}
            <Button
                className="createButton"
                icon={<PlusCircleOutlined />}
                onClick={handleCreateButtonClick}
                shape="circle"
                type="primary"
            />
        </Spin>
    );
};

export default TodoList;
