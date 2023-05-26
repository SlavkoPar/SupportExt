import React, { useState } from 'react';
import { secrets } from '../../../secrets.development';
import logo from '../../assets/img/support-128.png';
import './Options.css';


const Options = ({ title }) => {

  const url1 = secrets.myWebApp;
  const [url, setUrl] = useState(url1);
  chrome.storage.local.set({ 'url': url })

  const [url2, setUrl2] = useState('http://localhost:3000')
  chrome.storage.local.get(['url2'], function (result) {
    if (result.url2) {
      setUrl2(result.url2)
    }
  });
  const url2Change = (e) => {
    setUrl2(e.target.value)
    chrome.storage.local.set({ 'url2': e.target.value }, function () {
    });
  }

  const [radioValue, setRadioValue] = useState('1')
  chrome.storage.local.get(['radioValue'], function (result) {
    if (result.radioValue) {
      setRadioValue(result.radioValue);
      if (result.radioValue === '1') {
        setUrl(url1)
        chrome.storage.local.set({ 'url': url1 })
      }
      else {
        setUrl(url2)
        chrome.storage.local.set({ 'url': url2 })
      }
    }
  });
  const radioChange = (e) => {
    chrome.storage.local.set({ 'radioValue': e.target.value }, function () {
      setRadioValue(e.target.value);
      if (e.target.value === '1') {
        setUrl(url1)
        chrome.storage.local.set({ 'url': url1 })
      }
      else {
        setUrl(url2);
        chrome.storage.local.set({ 'url': url2 })
      }
    });
  }


  const [forwardEmail, setForwardEmail] = useState(true);
  chrome.storage.local.get(['forwardEmail'], function (result) {
    if (result.forwardEmail !== undefined) {
      setForwardEmail(result.forwardEmail)
    }
  });
  const forwardEmailChange = (e) => {
    setForwardEmail(e.target.checked)
    chrome.storage.local.set({ 'forwardEmail': e.target.checked }, function () {
    });
  }


  //return <div className="OptionsContainer">{title.toUpperCase()} PAGE</div>;
  return (
    <div className="OptionsContainer">
      {title.toUpperCase()}
      <br />
      <img src={logo} className="App-logo" alt="logo" />
      <br />

      <fieldset>
        <legend>Please select Hosting of your Web App</legend>
        <div>
          <form name="myForm">
            <fieldset className="inner">
              <legend>Shared Hosting</legend>
              <label>Cloud, SHA encryption, Workspaces isolated</label>
              <div>
                <label>
                  <input type="radio" name='myRadios' value='1' onChange={radioChange} checked={radioValue === '1'} />
                </label>
                <input type="text" value={url1} className='' readOnly placeholder='url' title='Enter url'></input>
              </div>
            </fieldset>
            <fieldset className="inner">
              <legend>Self Hosting</legend>
              <label>When you provide your own Hosting</label>
              <div>
                <label>
                  <input type="radio" name='myRadios' value='2' onChange={radioChange} checked={radioValue === '2'} />
                </label>
                <input type="text" value={url2} className='' onChange={url2Change} placeholder='url' title='Enter url'></input>
              </div>
            </fieldset>
          </form>
        </div>
      </fieldset>
      <br />

      <fieldset>
        <legend>Fields that will be forwarded to the Web App</legend>
        <div>
          <form name="myForm2">
            <table width="100%">
              <tbody>
                <tr>
                  <td>
                    <label>Subject
                      <input type="checkbox" value='1' checked={true} disabled />
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Email <span>(Used only to send Answer to client)</span>
                      <input type="checkbox" onChange={forwardEmailChange} checked={forwardEmail} />
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </fieldset>
      <br />
      <a
        className="App-link"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open Web App
      </a>
    </div>
  )
};

export default Options;
