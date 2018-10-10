import { render } from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { run } from '@react-module/app';
import AppModule from 'modules/App'

render(
    run(AppModule, process.env.NODE_ENV === 'production'), 
    document.getElementById('root')
);
registerServiceWorker();
