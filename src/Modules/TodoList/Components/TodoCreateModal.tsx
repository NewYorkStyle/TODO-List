import {Input, Modal, Select, Space} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import * as React from 'react';
import {EPriority, EStatus} from '../Enums';
import {ITodo} from '../Models';
import {TextObject} from '../Text';

/**
 * Модель props на компонента TodoCreateModal.
 *
 * @prop {Function} onClose Обработчик закрытия модального окна.
 */
interface ITodoCreateModalProps {
    onClose: () => void;
    onSave: (todo: ITodo) => void;
}

export const TodoCreateModal = ({onClose, onSave}: ITodoCreateModalProps) => {
    const [todo, setTodo] = React.useState<ITodo>({
        description: null,
        priority: EPriority.LOW,
        status: EStatus.TODO,
        title: null,
    });

    /**
     * Обработчик изменения поля title.
     */
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodo({
            ...todo,
            title: e.target.value,
        });
    };

    /**
     * Обработчик изменения поля description.
     */
    const handleDescriptionChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setTodo({
            ...todo,
            description: e.target.value,
        });
    };

    /**
     * Обработчик изменения поля priority.
     */
    const handlePriorityChange = (value: EPriority) => {
        setTodo({
            ...todo,
            priority: value,
        });
    };

    const handleSave = () => {
        onSave(todo);
    };

    return (
        <Modal
            title={TextObject.TodoList.CreateModal.Title}
            visible
            onOk={handleSave}
            onCancel={onClose}
        >
            <Space direction="vertical">
                <Input
                    onChange={handleTitleChange}
                    placeholder={
                        TextObject.TodoList.CreateModal.Placeholder.Title
                    }
                />
                <TextArea
                    onChange={handleDescriptionChange}
                    className="description"
                    placeholder={
                        TextObject.TodoList.CreateModal.Placeholder.Description
                    }
                    autoSize={{minRows: 3, maxRows: 5}}
                />
                <Select
                    onChange={handlePriorityChange}
                    defaultValue={EPriority.LOW}
                    className="prioritySelect"
                >
                    <Select.Option value={EPriority.LOW}>
                        {TextObject.TodoList.CreateModal.Priority.LOW}
                    </Select.Option>
                    <Select.Option value={EPriority.MEDIUM}>
                        {TextObject.TodoList.CreateModal.Priority.MEDIUM}
                    </Select.Option>
                    <Select.Option value={EPriority.HIGH}>
                        {TextObject.TodoList.CreateModal.Priority.HIGH}
                    </Select.Option>
                </Select>
            </Space>
        </Modal>
    );
};
