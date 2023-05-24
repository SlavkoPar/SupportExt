import React, { useState } from 'react';
import logo from '../assets/img/support-128.png';
import './Popup.css';

const CommonSettings = () => {

  const url1 = 'https://support-knowledge.onrender.com';
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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <fieldset style={{ width: "100%", border: '1px solid silver', borderRadius: '5px' }}>
          <legend>Please select Hosting of your Web App</legend>
          <div>
            <form name="myForm" style={{ width: '100%' }}>
              <table border="1" width="100%">
                <tbody>
                  <tr>
                    <td>
                      <label style={{color: 'darkgray' }}>Cloud, SHA encryption, Workspaces isolated</label>
                      <div>
                        <input type="radio" name='myRadios' value='1' onChange={radioChange} checked={radioValue === '1'} />
                        <input value={url1} className='' style={{ width: '90%', borderRadius: '1px' }} readOnly></input>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>Self Hosted, when you want your own Hosting</label>
                      <div>
                        <input type="radio" name='myRadios' value='2' onChange={radioChange} checked={radioValue === '2'} />
                        <input value={url2} className='' style={{ width: '90%', borderRadius: '1px' }} onChange={url2Change}></input>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </fieldset>

        <fieldset style={{ width: "100%", border: '1px solid silver', borderRadius: '5px' }}>
          <legend>Fields that will be forwarded to the Web App</legend>
          <div>
            <form name="myForm2" style={{ width: '100%' }}>
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
                      <label>Email <span style={{color: 'darkgray' }}>(Used only to send Answer to client email)</span>
                        <input type="checkbox" onChange={forwardEmailChange} checked={forwardEmail} />
                      </label>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </fieldset>
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

export default CommonSettings;
