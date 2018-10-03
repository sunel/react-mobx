import React from 'react';
import { render } from 'react-dom';
import './index.css';
import Root from 'containers/Root';
import configureStore from './store/configureStore'
import registerServiceWorker from './registerServiceWorker';
import rootSaga from './sagas';
import App from './App';

const store = configureStore(window.__INITIAL_STATE__);
store.runSaga(rootSaga);

const mount = (store) => (
    <Root store={store} >
        <App />
    </Root>
);

render(mount(store), document.getElementById('root'));
registerServiceWorker();
