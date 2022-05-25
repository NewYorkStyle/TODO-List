import {Typography} from 'antd';
import {BaseType} from 'antd/lib/typography/Base';
import * as React from 'react';
import {TFunction} from 'react-i18next';
import {EMarkType, EPriority} from '../Enums';
import {ITodo} from '../Models';

/**
 * Модель props на компонента TodoCard.
 *
 * @prop {TFunction} t Функция перевода.
 * @prop {ITodo} todo Задача.
 */
interface ITodoCardProps {
    t: TFunction;
    todo: ITodo;
}

export const TodoCard = ({t, todo: {priority, title}}: ITodoCardProps) => {
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
                return t('TodoList:List.PriorityMark.HIGH');
            case EPriority.MEDIUM:
                return t('TodoList:List.PriorityMark.MEDIUM');
            case EPriority.LOW:
            default:
                return t('TodoList:List.PriorityMark.LOW');
        }
    };

    return (
        <div>
            <Typography.Text type={getPriorityMark(priority)}>
                [{getPriorityText(priority)}]
            </Typography.Text>
            {title}
        </div>
    );
};
