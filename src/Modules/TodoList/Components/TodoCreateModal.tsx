import {Form, Input, Modal, Select, Space} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import * as React from 'react';
import {EPriority, EStatus} from '../Enums';
import {ITodo} from '../Store/todos.types';
import {todoListApi} from '../Store/todos.api';
import {TextObject} from '../Text';

/**
 * Модель props на компонента TodoCreateModal.
 *
 * @prop {Function} onClose Обработчик закрытия модального окна.
 * @prop {Function} onSave Обработчик создания/сохранения.
 * @prop {string} [todoId] Идентификатор задачи.
 */
interface ITodoCreateModalProps {
    onClose: () => void;
    onSave: () => void;
    todoId?: string;
}

export const TodoCreateModal = ({
    onClose,
    onSave,
    todoId,
}: ITodoCreateModalProps) => {
    let todo: ITodo = {
        description: '',
        priority: EPriority.LOW,
        status: EStatus.TODO,
        title: '',
    };

    let handleOnSave: (todo: ITodo) => void;

    if (todoId) {
        /** Получение задачи */
        todo = todoListApi.useGetTodoByIDQuery(todoId).data!;
        /** Редактирование задачи */
        const [editTodo] = todoListApi.useEditTodoMutation();
        handleOnSave = editTodo;
    } else {
        /** Создание задачи */
        const [createTodo] = todoListApi.useCreateTodoMutation();
        handleOnSave = createTodo;
    }

    /**
     * Обработчик создания/сохранения
     */
    const handleSave = (values: ITodo) => {
        const newTodo = {...todo, ...values};
        handleOnSave(newTodo);
        onSave();
    };

    /**
     * Получение заголовка модального окна.
     */
    const getTitle = (): string => {
        return todo
            ? TextObject.TodoList.CreateModal.Title.Edit
            : TextObject.TodoList.CreateModal.Title.Create;
    };

    const [form] = Form.useForm();

    return (
        <Modal
            onCancel={onClose}
            title={getTitle()}
            visible
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        form.resetFields();
                        handleSave(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="createTodoFOrm"
                initialValues={todo}
            >
                <Form.Item
                    name="title"
                    label={TextObject.TodoList.CreateModal.Label.Title}
                    rules={[
                        {
                            required: true,
                            message: 'Please input the title of TODO!',
                        },
                    ]}
                >
                    <Input
                        placeholder={
                            TextObject.TodoList.CreateModal.Placeholder.Title
                        }
                    />
                </Form.Item>
                <Form.Item
                    name="description"
                    label={TextObject.TodoList.CreateModal.Label.Description}
                    rules={[
                        {
                            required: true,
                            message: 'Please input a description of TODO!',
                        },
                    ]}
                >
                    <TextArea
                        autoSize={{minRows: 3, maxRows: 5}}
                        placeholder={
                            TextObject.TodoList.CreateModal.Placeholder
                                .Description
                        }
                    />
                </Form.Item>
                <Form.Item name="priority" className="prioritySelect">
                    <Select className="prioritySelect">
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
                </Form.Item>
            </Form>
        </Modal>
    );
};
