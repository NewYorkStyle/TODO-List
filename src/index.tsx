import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import TodoList from './Modules/TodoList/Pages/TodoList';
import 'antd/dist/antd.css';
import './Styles/TodoList.css';
import TodoStore from './Mobx/store';
import {Provider} from 'mobx-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
const element = (
    <Provider todoStore={new TodoStore()}>
        <Router>
            <Routes>
                <Route path="/" element={<TodoList />} />
            </Routes>
        </Router>
    </Provider>
);
root.render(element);
