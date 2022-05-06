import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import TodoList from './Modules/TodoList/Pages/TodoList';
import store from './Store';
import 'antd/dist/antd.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const element = (
    <Provider store={store}>
        <Router>
            <Routes>
                <Route path="/" element={<TodoList />} />
            </Routes>
        </Router>
    </Provider>
);
root.render(element);
