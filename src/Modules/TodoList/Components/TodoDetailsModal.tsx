import {Button, Modal, Popconfirm, Steps} from 'antd';
import * as React from 'react';
import {EStatus} from '../Enums';
import {ITodo} from '../Models';
import {TextObject} from '../Text';

/**
 * Модель props на компонента TodoDetailsModal.
 *
 * @prop {Function} onChange Обработчик изменения статуса.
 * @prop {Function} onClose Обработчик закрытия модального окна.
 * @prop {Function} onDelete Обработчик удаления задачи.
 * @prop {Function} onEdit Обработчик кнопки редактирования.
 * @prop {ITodo} todo Задача.
 */
interface ITodoDetailsModalProps {
    onChange: (todo: ITodo) => void;
    onClose: () => void;
    onDelete: (todo: ITodo) => void;
    onEdit: () => void;
    todo: ITodo;
}

export const TodoDetailsModal = ({
    onChange,
    onClose,
    onDelete,
    onEdit,
    todo,
    todo: {description, status, title},
}: ITodoDetailsModalProps) => {
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
        onChange({...todo, status});
    };

    /**
     * Обработчик удаления задачи.
     */
    const handleDelete = () => {
        onDelete(todo);
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
            footer={getFooterButtons(status)}
            onCancel={onClose}
            title={title}
            visible
        >
            <Steps current={getCurrentStep(status)} progressDot>
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
            {description}
        </Modal>
    );
};
