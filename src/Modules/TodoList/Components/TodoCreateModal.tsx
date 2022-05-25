import {Form, Input, Modal, Select, Space} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import * as React from 'react';
import {TFunction} from 'react-i18next';
import {EPriority, EStatus} from '../Enums';
import {ITodo} from '../Models';

/**
 * Модель props на компонента TodoCreateModal.
 *
 * @prop {Function} onClose Обработчик закрытия модального окна.
 * @prop {Function} onSave Обработчик создания/сохранения.
 * @prop {TFunction} t Функция перевода.
 * @prop {ITodo} todo Задача.
 */
interface ITodoCreateModalProps {
    onClose: () => void;
    onSave: (todo: ITodo) => void;
    t: TFunction;
    todo?: ITodo;
}

export const TodoCreateModal = ({
    onClose,
    onSave,
    t,
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
     *
     * @param {EPriority} value Значение селекта.
     */
    const handlePriorityChange = (value: EPriority) => {
        setNewTodo({
            ...newTodo,
            priority: value,
        });
    };

    /**
     * Обработчик создания/сохранения
     */
    const handleSave = () => {
        onSave(newTodo);
    };

    /**
     * Получение заголовка модального окна.
     */
    const getTitle = (): string => {
        return todo
            ? t('TodoList:CreateModal.Title.Edit')
            : t('TodoList:CreateModal.Title.Create');
    };

    const [form] = Form.useForm();

    return (
        <Modal
            cancelText={t('TodoList:CreateModal.Buttons.Cancel')}
            okText={t('TodoList:CreateModal.Buttons.Ok')}
            onCancel={onClose}
            onOk={() => {
                form.validateFields()
                    .then(() => {
                        form.resetFields();
                        handleSave();
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
            title={getTitle()}
            visible
        >
            <Form form={form} layout="vertical" name="createTodoFOrm">
                <Form.Item
                    name="title"
                    label={t('TodoList:CreateModal.Label.Title')}
                    rules={[
                        {
                            required: true,
                            message: t('TodoList:CreateModal.Validation.Title'),
                        },
                    ]}
                >
                    <Input
                        onChange={handleTitleChange}
                        placeholder={t(
                            'TodoList:CreateModal.Placeholder.Title'
                        )}
                        value={newTodo.title}
                    />
                </Form.Item>
                <Form.Item
                    name="description"
                    label={t('TodoList:CreateModal.Label.Description')}
                    rules={[
                        {
                            required: true,
                            message: t(
                                'TodoList:CreateModal.Validation.Description'
                            ),
                        },
                    ]}
                >
                    <TextArea
                        autoSize={{minRows: 3, maxRows: 5}}
                        onChange={handleDescriptionChange}
                        placeholder={t(
                            'TodoList:CreateModal.Placeholder.Description'
                        )}
                        value={newTodo.description}
                    />
                </Form.Item>
                <Select
                    className="prioritySelect"
                    defaultValue={EPriority.LOW}
                    onChange={handlePriorityChange}
                    value={newTodo.priority}
                >
                    <Select.Option value={EPriority.LOW}>
                        {t('TodoList:CreateModal.Priority.LOW')}
                    </Select.Option>
                    <Select.Option value={EPriority.MEDIUM}>
                        {t('TodoList:CreateModal.Priority.MEDIUM')}
                    </Select.Option>
                    <Select.Option value={EPriority.HIGH}>
                        {t('TodoList:CreateModal.Priority.HIGH')}
                    </Select.Option>
                </Select>
            </Form>
        </Modal>
    );
};
