import {Button, Modal, Popconfirm, Spin, Steps} from 'antd';
import * as React from 'react';
import {EStatus} from '../Enums';
import {todoListApi} from '../Store/todos.api';
import {TextObject} from '../Text';

/**
 * Модель props на компонента TodoDetailsModal.
 *
 * @prop {Function} onClose Обработчик закрытия модального окна.
 * @prop {Function} onDelete Обработчик удаления задачи.
 * @prop {Function} onEdit Обработчик кнопки редактирования.
 * @prop {string} todoId Идентификатор задачи.
 */
interface ITodoDetailsModalProps {
    onClose: () => void;
    onDelete: () => void;
    onEdit: () => void;
    todoId: string;
}

export const TodoDetailsModal = ({
    onClose,
    onEdit,
    onDelete,
    todoId,
}: ITodoDetailsModalProps) => {
    /** Получение задачи */
    const {data: todo, isFetching} = todoListApi.useGetTodoByIDQuery(todoId);
    /** Редактирование задачи */
    const [editTodo] = todoListApi.useEditTodoMutation();
    /** Удаление задачи */
    const [deleteTodo] = todoListApi.useDeleteTodoMutation();

    /**
     * Функцмя для получения текущего шага.
     *
     * @param {EStatus} status Текущий статус.
     */
    const getCurrentStep = (status: EStatus): number => {
        switch (status) {
            case EStatus.DOING:
                return 1;
            case EStatus.DONE:
                return 2;
            case EStatus.TODO:
            default:
                return 0;
        }
    };

    /**
     * Обработчик изменения статуса задачи.
     *
     * @param {EStatus} status Новое значение статуса.
     */
    const handleStatusChange = (status: EStatus) => {
        editTodo({...todo!, status});
    };

    /**
     * Обработчик удаления задачи.
     */
    const handleDelete = () => {
        deleteTodo(todo!);
        onDelete();
    };

    /**
     * Функция для получения конфигурации футера модального окнаю
     *
     * @param {EStatus} status Текущее значение статуса.
     */
    const getFooterButtons = (status: EStatus): JSX.Element[] => {
        let config = [
            <Button key="close" onClick={onClose}>
                {TextObject.TodoList.DetailsModal.Footer.Buttons.Close}
            </Button>,
        ];

        switch (status) {
            case EStatus.TODO:
            case EStatus.DONE:
                config.unshift(
                    <Button
                        key="start"
                        onClick={() => handleStatusChange(EStatus.DOING)}
                        type="primary"
                    >
                        {TextObject.TodoList.DetailsModal.Footer.Buttons.Start}
                    </Button>
                );
                break;
            case EStatus.DOING:
                config.unshift(
                    <Button
                        key="hold"
                        onClick={() => handleStatusChange(EStatus.TODO)}
                        type="primary"
                    >
                        {TextObject.TodoList.DetailsModal.Footer.Buttons.Hold}
                    </Button>,
                    <Button
                        key="finish"
                        onClick={() => handleStatusChange(EStatus.DONE)}
                        type="primary"
                    >
                        {TextObject.TodoList.DetailsModal.Footer.Buttons.Finish}
                    </Button>
                );
                break;
            default:
                break;
        }

        config.unshift(
            <div className="deleteButton">
                <Popconfirm
                    cancelText={
                        TextObject.TodoList.DetailsModal.Footer.PopConfirm
                            .Cancle
                    }
                    okText={
                        TextObject.TodoList.DetailsModal.Footer.PopConfirm
                            .Confirm
                    }
                    onConfirm={handleDelete}
                    title={
                        TextObject.TodoList.DetailsModal.Footer.PopConfirm.Title
                    }
                >
                    <Button danger key="Delete" type="primary">
                        {TextObject.TodoList.DetailsModal.Footer.Buttons.Delete}
                    </Button>
                </Popconfirm>
                <Button key="edit" onClick={onEdit} type="primary">
                    {TextObject.TodoList.DetailsModal.Footer.Buttons.Edit}
                </Button>
            </div>
        );

        return config;
    };

    return (
        <Modal
            footer={getFooterButtons(todo?.status!)}
            onCancel={onClose}
            title={todo?.title}
            visible
        >
            <Spin spinning={isFetching} tip={TextObject.TodoList.Loading}>
                <Steps current={getCurrentStep(todo?.status!)} progressDot>
                    <Steps.Step
                        title={TextObject.TodoList.DetailsModal.Steps.TODO}
                    />
                    <Steps.Step
                        title={TextObject.TodoList.DetailsModal.Steps.Doing}
                    />
                    <Steps.Step
                        title={TextObject.TodoList.DetailsModal.Steps.Done}
                    />
                </Steps>
                {todo?.description}
            </Spin>
        </Modal>
    );
};
