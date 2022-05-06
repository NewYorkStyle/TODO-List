import {Typography} from 'antd';
import {BaseType} from 'antd/lib/typography/Base';
import * as React from 'react';
import {EMarkType, EPriority} from '../Enums';
import {ITodo} from '../Models';

/**
 * Модель props на компонента TodoCard.
 */
export interface ITodoCardProps {
    onClick: (id: string) => void;
    todo: ITodo;
}

export const TodoCard = ({
    onClick,
    todo: {priotiry, title, id},
}: ITodoCardProps) => {
    const handleOnClick = () => {
        onClick(id);
    };

    const priorityMark = (priotiry: EPriority): BaseType => {
        switch (priotiry) {
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
            <Typography.Text type={priorityMark(priotiry)}>
                [{priotiry}]
            </Typography.Text>
            {title}
        </div>
    );
};
