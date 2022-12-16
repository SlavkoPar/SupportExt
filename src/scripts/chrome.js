var nTimes = 0;
function injectChrome() {
    const parent = document.querySelector("div.nH.V8djrc > div.nH > div.ha") //:not(.question-finder-parent)")
    console.log('parent', parent)
    console.log('nTimes', ++nTimes)
    if (nTimes > 30)
        return;

    if (!parent) {
        setTimeout(injectChrome, 500)
        return;
    }
    const subject = document.querySelector('h2', parent);
    console.log('subject', subject)
    if (!subject) {
        setTimeout(injectChrome, 500)
        return;
    }
    const span = document.createElement('span');
    span.innerHTML = '&nbsp;<i>Support</i>';

    const img = document.createElement('img');
    img.src = chrome.runtime.getURL('/images/Support.png');

    const a = document.createElement('a');
    a.appendChild(img);
    a.appendChild(span);
    a.classList.add('question-finder')
    a.style.marginLeft = '20px';
    a.style.fontSize = '14px';

    a.addEventListener("click", (e) => {
        const subject = parent.querySelector('h2').textContent;
        console.log({subject})
        const message = {
            eventName: 'find-question',
            subject
        }
        const response = chrome.runtime.sendMessage(message);
        console.log('Got an asynchronous response with the data from the service worker => ', response);
        e.stopPropagation();
    });

    parent.appendChild(a);
    parent.classList.add('question-finder-parent');
}

setTimeout(injectChrome, 1000);
