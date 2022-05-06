import {Modal} from 'antd';
import * as React from 'react';
import {ITodo} from '../Models';

/**
 * Модель props на компонента TodoModal.
 */
export interface ITodoModalProps {
    onClose: () => void;
    todo: ITodo;
}

export const TodoModal = ({
    onClose,
    todo: {description, title},
}: ITodoModalProps) => {
    return (
        <Modal title={title} visible onOk={onClose} onCancel={onClose}>
            {description}
        </Modal>
    );
};
