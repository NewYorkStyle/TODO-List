import {Modal, Steps} from 'antd';
import * as React from 'react';
import {EStatus} from '../Enums';
import {ITodo} from '../Models';
import {TextObject} from '../Text';

/**
 * Модель props на компонента TodoDetailsModal.
 *
 * @prop {Function} onClose Обработчик закрытия модального окна.
 * @prop {ITodo} todo Задача.
 */
interface ITodoDetailsModalProps {
    onClose: () => void;
    todo: ITodo;
}

export const TodoDetailsModal = ({
    onClose,
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

    return (
        <Modal title={title} visible onOk={onClose} onCancel={onClose}>
            <Steps progressDot current={getCurrentStep(status)}>
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
