import {Button, List, Spin} from 'antd';
import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {IAsyncData, IStore} from '../../../Core/Models';
import {ITodoListActions, TodoListActions} from '../Actions/TodoListActions';
import {ITodo} from '../Models';
import {TodoListServices} from '../Services/TodoListServices';
import {TextObject} from '../Text';
import {TodoCard} from '../Components/TodoCard';
import {TodoDetailsModal} from '../Components/TodoDetailsModal';
import PlusCircleOutlined from '@ant-design/icons/lib/icons/PlusCircleOutlined';
import {TodoCreateModal} from '../Components/TodoCreateModal';

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
    asyncDataList,
    asyncData,
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

    return (
        <Spin spinning={isLoading} tip={TextObject.TodoList.Loading}>
            {asyncDataList?.data ? (
                <List
                    header={<div>{TextObject.TodoList.List.TODO}</div>}
                    bordered
                    dataSource={asyncDataList.data}
                    renderItem={(item) => (
                        <List.Item key={item.id}>
                            <TodoCard onClick={handleCardOnClick} todo={item} />
                        </List.Item>
                    )}
                />
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
                    todo={asyncData.data}
                    onClose={handleEditModalClose}
                    onSave={handleEditSave}
                />
            )}
            <Button
                className="createButton"
                type="primary"
                shape="circle"
                icon={<PlusCircleOutlined />}
                onClick={handleCreateButtonClick}
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
