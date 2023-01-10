import { secrets } from '../../../secrets.development';

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

chrome.runtime.onMessage.addListener(message => {
    console.log('onMessage request >>>>>>>>>>>>>', message)
    switch (message.eventName) {
        case 'openWebApp':
            let queryOptions = { url: message.myWebApp };
            let [tab] = chrome.tabs.query(queryOptions);
            console.log('tab', message.myWebApp, tab)
            if (!tab) {
                chrome.tabs.create({ url: message.myWebApp });
            }
            break;

        case 'find-question':
            const url = `${secrets.myWebApp}/${encodeURIComponent(message.subject.trim())}`;
            console.log('find-question url', url)
            chrome.tabs.create({ url });
            return Promise.resolve({ found: true });

        default:
            alert('unknown event:' + message.eventName)
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
            target: { tabId: tab.id },
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
    catch (err) {
        // Log exceptions
        console.log(`Problem with getting the ${key}`, err)
    }
}

var btnSyncHandlerInjected = false;

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (tab.status === "complete") {
        console.log(">>> completed", tab.url)
        if (tab.url.includes("/Support")) {
            if (!btnSyncHandlerInjected) {
                console.log('btnSyncHandlerInjected', btnSyncHandlerInjected)
                btnSyncHandlerInjected = true;
                await getWebAppLocalStorage();
            }
        }
        else if (tab.url.includes('https://mail.google.com/mail/')) {
            try {
               await chrome.scripting.executeScript({
                    target: { tabId },
                    files: ["scripts/chrome.js"]
                }, (args) => {
                    console.log('args......', ...args)
                });
            } catch (e) {
                console.error(e)
            }
        }
        else if (tab.url.includes('https://outlook.live.com/mail/')) {
            try {
                await chrome.scripting.executeScript({
                    target: { tabId },
                    files: ["scripts/edge.js"]
                }, (args) => {
                    console.log('args......', ...args)
                });
            } catch (e) {
                console.error(e)
            }
        }
    }
});

const debounce = (fn, delay) => {
    let timerId;
    return (...args) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => fn(...args), delay);
    }
};