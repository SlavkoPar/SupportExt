import React from 'react';
import { secrets } from '../../../secrets.development';

import logo from '../../assets/img/support-128.png';
import './Popup.css';

const Popup = () => {

  let url = secrets.myWebApp;
  chrome.storage.local.get(['url'], function (result) {
    if (result.url) {
      url = result.url;
    }
    else {
      chrome.storage.local.set({ 'url': url })
    }
  });

  const openOptions = () => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('options.html'));
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <br/>
        <button id="go-to-options" onClick={() => openOptions()}>Go to options</button>

        <a
          className="App-link"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Web App
        </a>

      </header>
    </div>
  );
};

export default Popup;
