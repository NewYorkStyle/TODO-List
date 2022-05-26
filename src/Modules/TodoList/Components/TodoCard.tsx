import {Typography} from 'antd';
import {BaseType} from 'antd/lib/typography/Base';
import * as React from 'react';
import {EMarkType, EPriority} from '../Enums';
import {ITodo} from '../Models';
import {TextObject} from '../Text';

/**
 * Модель props на компонента TodoCard.
 *
 * @prop {Function} onClick Обработчик клика.
 * @prop {ITodo} todo Задача.
 */
interface ITodoCardProps {
    onClick: (id: string) => void;
    todo: ITodo;
}

export const TodoCard = ({
    onClick,
    todo: {id, priority, title},
}: ITodoCardProps) => {
    /**
     * Обработчик клика.
     */
    const handleOnClick = () => {
        onClick(id);
    };

    /**
     * Получение маркера соответствующего приоритету задачи.
     *
     * @param {EPriority} priority Приоритет задачи.
     */
    const getPriorityMark = (priority: EPriority): BaseType => {
        switch (priority) {
            case EPriority.HIGH:
                return EMarkType.HIGH;
            case EPriority.MEDIUM:
                return EMarkType.MEDIUM;
            case EPriority.LOW:
            default:
                return EMarkType.LOW;
        }
    };

    /**
     * Получение текста соответствующего приоритету задачи.
     *
     * @param {EPriority} priority Приоритет задачи.
     */
    const getPriorityText = (priority: EPriority): string => {
        switch (priority) {
            case EPriority.HIGH:
                return TextObject.TodoList.List.PriorityMark.HIGH;
            case EPriority.MEDIUM:
                return TextObject.TodoList.List.PriorityMark.MEDIUM;
            case EPriority.LOW:
            default:
                return TextObject.TodoList.List.PriorityMark.LOW;
        }
    };

    return (
        <div className="todoCard" onClick={handleOnClick}>
            <Typography.Text type={getPriorityMark(priority)}>
                [{getPriorityText(priority)}]
            </Typography.Text>
            {title}
        </div>
    );
};
