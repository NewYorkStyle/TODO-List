import {Button, Modal, Steps} from 'antd';
import * as React from 'react';
import {EStatus} from '../Enums';
import {ITodo} from '../Models';
import {TextObject} from '../Text';

/**
 * Модель props на компонента TodoDetailsModal.
 *
 * @prop {Function} onChange Обработчик изменения статуса.
 * @prop {Function} onClose Обработчик закрытия модального окна.
 * @prop {ITodo} todo Задача.
 */
interface ITodoDetailsModalProps {
    onChange: (todo: ITodo) => void;
    onClose: () => void;
    todo: ITodo;
}

export const TodoDetailsModal = ({
    onChange,
    onClose,
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

    const handleStatusChange = (status: EStatus) => {
        onChange({...todo, status});
    };

    const getFooterByttons = (status: EStatus) => {
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
                        type="primary"
                        onClick={() => handleStatusChange(EStatus.DOING)}
                    >
                        {TextObject.TodoList.DetailsModal.Footer.Buttons.Start}
                    </Button>
                );
                break;
            case EStatus.DOING:
                config.unshift(
                    <Button
                        key="hold"
                        type="primary"
                        onClick={() => handleStatusChange(EStatus.TODO)}
                    >
                        {TextObject.TodoList.DetailsModal.Footer.Buttons.Hold}
                    </Button>,
                    <Button
                        key="finish"
                        type="primary"
                        onClick={() => handleStatusChange(EStatus.DONE)}
                    >
                        {TextObject.TodoList.DetailsModal.Footer.Buttons.Finish}
                    </Button>
                );
                break;
            default:
                break;
        }

        return config;
    };

    return (
        <Modal
            onCancel={onClose}
            title={title}
            visible
            footer={getFooterByttons(status)}
        >
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
