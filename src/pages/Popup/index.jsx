import React from 'react';
import { render } from 'react-dom';
import {secrets} from '../../../secrets.development';

import Popup from './Popup';
import './index.css';

chrome.storage.local.get(['url'], function (result) {
    chrome.runtime.sendMessage({
        eventName: 'openWebApp',
        myWebApp: (result.url ? result.url : secrets.myWebApp) + '/supporter'
    });
  });

render(<Popup />, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
