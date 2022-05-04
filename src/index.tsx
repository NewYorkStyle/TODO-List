import * as React from 'react';
import {Provider} from 'react-redux';
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import Main from './Modules/Main/Pages/Main';
import store from './Store';
import * as ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
const element = (
    <Provider store={store}>
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />
            </Routes>
        </Router>
    </Provider>
);
root.render(element);
