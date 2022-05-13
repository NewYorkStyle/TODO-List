import {Typography} from 'antd';
import {BaseType} from 'antd/lib/typography/Base';
import * as React from 'react';
import {EMarkType, EPriority} from '../Enums';
import {ITodo} from '../Models';

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
    todo: {priority: priority, title, id},
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

    return (
        <div onClick={handleOnClick}>
            <Typography.Text type={getPriorityMark(priority)}>
                [{priority}]
            </Typography.Text>
            {title}
        </div>
    );
};
