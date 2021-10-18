import React from 'react';
import { render } from 'react-dom';
import {secrets} from '../../../secrets.development';

import Popup from './Popup';
import './index.css';

chrome.runtime.sendMessage({
    eventName: 'openWebApp',
    myWebApp: secrets.myWebApp
});


render(<Popup />, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
