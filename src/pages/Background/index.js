import { secrets } from '../../../secrets.development';

chrome.runtime.onInstalled.addListener((reason) => {
    if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.tabs.create({
            url: `${secrets.myWebApp}`
        });
    }
});

// TODO next phase
// const reactPost = () => {
//      // Simple PUT request with a JSON body using fetch
//      const requestOptions = {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ title: 'React PUT Request Example' })
//     };
//     fetch('https://support-knowledge.onrender.com/save-question', requestOptions)
//         .then(response => response.json())
//         .then(data => console.log({ postId: data.id }));
// }

chrome.runtime.onMessage.addListener(message => {
    // console.log('onMessage request >>>>>>>>>>>>>', message)
    switch (message.eventName) {
        case 'openWebApp':
            let queryOptions = { url: message.myWebApp };
            let [tab] = chrome.tabs.query(queryOptions);
            // console.log('tab', message.myWebApp, tab)
            if (!tab) {
                chrome.tabs.create({ url: message.myWebApp });
            }
            break;

        case 'find-question':
            const url = `${secrets.myWebApp}/${message.source}/${encodeURIComponent(message.subject.trim())}/${encodeURIComponent(message.email.trim())}`;
            // console.log('find-question url', url)
            chrome.tabs.create({ url });
            return Promise.resolve({ found: true });

        default:
            alert('unknown event:' + message.eventName)
            break;
    }
});


chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (tab.status === "complete") {
        // console.log(">>> completed", tab.url)
        if (tab.url.includes("/Support")) {
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

