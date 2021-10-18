import React, { useEffect } from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';
import {secrets} from '../../../secrets.development';

const Popup = () => {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/pages/Popup/Popup.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href={secrets.myWebApp}
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
