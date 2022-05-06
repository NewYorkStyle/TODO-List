import {List} from 'antd';
import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {IAsyncData, IStore} from '../../../Core/Models';
import {ITodoListActions, TodoListActions} from '../Actions/TodoListActions';
import {ITodo} from '../Models';
import {TodoListServices} from '../Services/TodoListServices';
import {TextObject} from '../Text';
import {TodoCard} from '../Components/TodoCard';
import {TodoModal} from '../Components/TodoModal';

/**
 * Модель props на компонента TodoList.
 */
export interface ITodoListProps {
    actions?: ITodoListActions;
    asyncData?: IAsyncData<ITodo>;
    asyncDataList?: IAsyncData<ITodo[]>;
}

export const TodoList = ({
    actions,
    asyncDataList,
    asyncData,
}: ITodoListProps) => {
    const [showModal, setShowModal] = React.useState(false);

    const handleCardOnClick = (id: string): void => {
        actions.getDataByID(id);
        setShowModal(true);
    };

    const handleModalClose = (): void => {
        setShowModal(false);
    };

    React.useEffect(() => {
        actions.getData();
    }, []);

    return (
        <React.Fragment>
            {asyncDataList?.data ? (
                <List
                    header={<div>{TextObject.TodoList.List.TODO}</div>}
                    bordered
                    dataSource={asyncDataList?.data}
                    renderItem={(item) => (
                        <List.Item>
                            <TodoCard onClick={handleCardOnClick} todo={item} />
                        </List.Item>
                    )}
                />
            ) : null}
            {showModal && asyncData?.data ? (
                <TodoModal onClose={handleModalClose} todo={asyncData.data} />
            ) : null}
        </React.Fragment>
    );
};

const mapStateToProps = (store: IStore) => ({
    asyncData: store.todoListReducer.asyncData,
    asyncDataList: store.todoListReducer.asyncDataList,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: new TodoListActions(dispatch, new TodoListServices()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
