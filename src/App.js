import React from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Provider } from 'react-redux';
import store from './app/store';

import { AppFooter } from './app/views/shared';
import Main from './app/views/main';

import './app/assets/styles/app.scss';

function App() {
    return (
        <Provider store={store} >
            <div className="App">
                <Main />
                <AppFooter />
            </div>
            <ToastContainer />
        </Provider>
    );
}

export default App;
