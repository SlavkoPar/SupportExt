import {secrets} from '../../../secrets.development';

console.log('This is the background page !');
console.log('Put the background scripts here.');


console.log('secrets.myWebApp:', secrets.myWebApp)

chrome.runtime.onInstalled.addListener((reason) => {
    if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
        console.log('reason', reason)
      chrome.tabs.create({
        url: `${secrets.myWebApp}`
      });
    }
  });

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    console.log('onMessage request >>>>>>>>>>>>>', request)
    switch (request.eventName) {
        case 'openWebApp':
            let queryOptions = { url: request.myWebApp }; // 'https://slavkopar.github.io/Support/*'
            let [tab] = await chrome.tabs.query(queryOptions);
            console.log('tab', request.myWebApp, tab)
            if (!tab) {
                chrome.tabs.create({url:request.myWebApp});
            }
            break;

        case 'find-issue':
            const url = /*request.myWebApp*/ `${secrets.myWebApp}/${encodeURIComponent(request.tekst.trim())}`;
            console.log('find-issue url', url)
            //if (!tab) {
                chrome.tabs.create({url});
            //}
            sendResponse({ found: true });
            return true;
            break;
    }
});

async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

function getStorage(key) {
    //const fromPageLocalStore = localStorage['${key}']
    //alert(fromPageLocalStore)
    // Store the result  
    // await chrome.storage.local.set({[key]:fromPageLocalStore[0]});
    //eval(fromPageLocalStore);
   let x = '{ pera: 1 }'
   x;

}
  

async function getWebAppLocalStorage() {
    const key = "SUPPORT_QUESTIONS"

    try {
        const tab = await getCurrentTab(); 

        // Execute script in the current tab
        const results = await chrome.scripting.executeScript({
            target: {tabId: tab.id}, 
            //func: getStorage,
            files: ["web-app-storage.js"]
        });
        console.log('results.length', results.length);
        
        for (let item of results) {
            console.log('item', item);
            if (item.result) {
                 if (item.result.q)
                    console.log('q:', JSON.parse(item.result.q))
                if (item.result.q)
                    console.log('a:', JSON.parse(item.result.a))
             }
        }
        // console.log('fromPageLocalStore', fromPageLocalStore)

        // if (fromPageLocalStore)
        //     console.log(JSON.parse(fromPageLocalStore))
        // else {
        //     console.log('jokkkkkkkkkkkkkkkkkkkkkk')
        // }        
    } 
    catch(err) {
        // Log exceptions
        console.log(`Problem with getting the ${key}`, err)
    }    
}

function injectedFunction() {
    const elem = document.querySelector("div.nH.V8djrc > div.nH > div.ha:not(.issue-finder-parent)")
    const description = document.querySelector('h2', elem);
    console.log('Description', description)
    if (!description) {
        return;
    }
    
    const span = document.createElement('span');
    span.innerHTML = '&nbsp;<i>Support</i>';

    const img = document.createElement('img');
    img.src = chrome.runtime.getURL('/images/Support.png');

    const a = document.createElement('a');
    a.appendChild(img);
    a.appendChild(span);
    a.classList.add('issue-finder')
    a.style.marginLeft = '20px';
    a.style.fontSize = '14px';

    a.addEventListener("click", (e) => {
        const tekst = elem.querySelector('h2').textContent;
        chrome.runtime.sendMessage( {
            eventName: 'find-issue',
            tekst
        }, (response) => {
            console.log('found issue: ', response);
          });
        e.stopPropagation();
    });


    elem.appendChild(a);
    elem.classList.add('issue-finder-parent');

    //document.body.style.backgroundColor = 'orange';
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (tab.status === "complete") {
        console.log(">>> completed", tab.url)
        if (tab.url.includes("https://slavkopar.github.io/Support")) {
            await getWebAppLocalStorage();
            return;
        }
        else if (tab.url.includes('https://mail.google.com/mail/')) {
            try {
                //aBrowser.tabs.insertCSS(tabId, {file: "integrations/style.css"});
                // const results = await chrome.scripting.executeScript({
                //     target: {tabId: tab.id}, 
                //     files: ["draw-button.js"]
                // });
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    function: injectedFunction
                  });

            } catch (e) {
                console.error(e)
            }
        }
    }
});


function debounce(timeout, callback) {
    let timeoutID = 0;
    return (event) => {
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => callback(event), timeout);
    };
}