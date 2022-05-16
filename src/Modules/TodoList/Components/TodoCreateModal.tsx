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
    todo?: ITodo;
}

export const TodoCreateModal = ({
    onClose,
    onSave,
    todo,
}: ITodoCreateModalProps) => {
    const [newTodo, setNewTodo] = React.useState<ITodo>(
        todo
            ? todo
            : {
                  description: null,
                  priority: EPriority.LOW,
                  status: EStatus.TODO,
                  title: null,
              }
    );

    /**
     * Обработчик изменения поля title.
     */
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodo({
            ...newTodo,
            title: e.target.value,
        });
    };

    /**
     * Обработчик изменения поля description.
     */
    const handleDescriptionChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setNewTodo({
            ...newTodo,
            description: e.target.value,
        });
    };

    /**
     * Обработчик изменения поля priority.
     */
    const handlePriorityChange = (value: EPriority) => {
        setNewTodo({
            ...newTodo,
            priority: value,
        });
    };

    const handleSave = () => {
        onSave(newTodo);
    };

    const getTitle = (): string => {
        return todo
            ? TextObject.TodoList.CreateModal.Title.Edit
            : TextObject.TodoList.CreateModal.Title.Create;
    };

    return (
        <Modal title={getTitle()} visible onOk={handleSave} onCancel={onClose}>
            <Space direction="vertical">
                <Input
                    onChange={handleTitleChange}
                    placeholder={
                        TextObject.TodoList.CreateModal.Placeholder.Title
                    }
                    value={newTodo.title}
                />
                <TextArea
                    onChange={handleDescriptionChange}
                    className="description"
                    placeholder={
                        TextObject.TodoList.CreateModal.Placeholder.Description
                    }
                    autoSize={{minRows: 3, maxRows: 5}}
                    value={newTodo.description}
                />
                <Select
                    onChange={handlePriorityChange}
                    defaultValue={EPriority.LOW}
                    className="prioritySelect"
                    value={newTodo.priority}
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
