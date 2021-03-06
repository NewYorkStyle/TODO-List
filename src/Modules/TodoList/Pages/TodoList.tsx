import {Button, Col, List, Row, Spin} from 'antd';
import {
    CheckCircleTwoTone,
    FireTwoTone,
    PlusCircleOutlined,
    QuestionCircleTwoTone,
} from '@ant-design/icons';
import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {ITodoListActions, TodoListActions} from '../Actions/TodoListActions';
import {TodoCard} from '../Components/TodoCard';
import {TodoCreateModal} from '../Components/TodoCreateModal';
import {TodoDetailsModal} from '../Components/TodoDetailsModal';
import {EStatus} from '../Enums';
import {ITodo} from '../Models';
import {TodoListServices} from '../Services/TodoListServices';
import {TextObject} from '../Text';
import {IAsyncData, IStore} from '../../../Core/Models';

/**
 * Модель props на компонента TodoList.
 *
 * @prop {ITodoListActions} [actions] Экшены.
 * @prop {IAsyncData<ITodo>} [asyncData] Задача.
 * @prop {IAsyncData<ITodo[]>} [asyncDataList] Список задач.
 * @prop {boolean} isLoading Состояние загрузки.
 */
interface ITodoListProps {
    actions?: ITodoListActions;
    asyncData?: IAsyncData<ITodo>;
    asyncDataList?: IAsyncData<ITodo[]>;
    isLoading: boolean;
}

export const TodoList = ({
    actions,
    asyncData,
    asyncDataList,
    isLoading,
}: ITodoListProps) => {
    const [showDetailsModal, setShowDetailsModal] =
        React.useState<boolean>(false);
    const [showCreateModal, setShowCreateModal] =
        React.useState<boolean>(false);
    const [showEditModal, setShowEditModal] = React.useState<boolean>(false);

    /**
     * Обаотчик клика по задаче в списке.
     *
     * @param {string} id Идентификатор.
     */
    const handleCardOnClick = (id: string): void => {
        actions.getDataByID(id);
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
        actions.createTodo(todo);
        setShowCreateModal(false);
    };

    /**
     * Обработчик изменения статуса TODO.
     */
    const handleStatusChange = (todo: ITodo): void => {
        actions.editTodo(todo);
    };

    /**
     * Обработчик удаления TODO.
     */
    const handleDelete = (todo: ITodo): void => {
        actions.deleteTodo(todo);
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
        actions.editTodo(todo);
        setShowEditModal(false);
        setShowDetailsModal(true);
    };

    React.useEffect(() => {
        actions.getData();
    }, []);

    const todoList = asyncDataList?.data?.filter((todo) => {
        return todo.status === EStatus.TODO;
    });

    const doingList = asyncDataList?.data?.filter((todo) => {
        return todo.status === EStatus.DOING;
    });

    const doneList = asyncDataList?.data?.filter((todo) => {
        return todo.status === EStatus.DONE;
    });

    return (
        <Spin spinning={isLoading} tip={TextObject.TodoList.Loading}>
            {asyncDataList?.data ? (
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
                            renderItem={(item) => (
                                <List.Item key={item.id}>
                                    <TodoCard
                                        onClick={handleCardOnClick}
                                        todo={item}
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
                            renderItem={(item) => (
                                <List.Item key={item.id}>
                                    <TodoCard
                                        onClick={handleCardOnClick}
                                        todo={item}
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
                            renderItem={(item) => (
                                <List.Item key={item.id}>
                                    <TodoCard
                                        onClick={handleCardOnClick}
                                        todo={item}
                                    />
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
            ) : null}
            {showDetailsModal && asyncData?.data ? (
                <TodoDetailsModal
                    onChange={handleStatusChange}
                    onClose={handleDetailsModalClose}
                    onDelete={handleDelete}
                    onEdit={handleEditButtonClick}
                    todo={asyncData.data}
                />
            ) : null}
            {showCreateModal && (
                <TodoCreateModal
                    onClose={handleCreateModalClose}
                    onSave={handleCreateTodoClick}
                />
            )}
            {showEditModal && (
                <TodoCreateModal
                    onClose={handleEditModalClose}
                    onSave={handleEditSave}
                    todo={asyncData.data}
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

const mapStateToProps = (store: IStore) => ({
    asyncData: store.todoListReducer.asyncData,
    asyncDataList: store.todoListReducer.asyncDataList,
    isLoading: store.todoListReducer.isLoading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: new TodoListActions(dispatch, new TodoListServices()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
