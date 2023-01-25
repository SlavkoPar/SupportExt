function createLink() {
    const parent = document.querySelector("div.nH.V8djrc > div.nH > div.ha")
    // console.log('============================= parent:', parent)
    // tabs.onUpdated with status: "complete" happens a few times
    // ListView rather than DetailView

    if (!parent || parent.classList.contains('question-finder'))
        return;

    const subject = parent.querySelector('h2');
    // console.log('subject', subject)
    
    const span = document.createElement('span');
    span.innerHTML = '<i>Support</i>';

    const img = document.createElement('img');
    img.src = chrome.runtime.getURL('/images/support.ico');

    const a = document.createElement('a');
    a.appendChild(img);
    a.appendChild(span);
    a.classList.add('question-finder')
    a.style.marginLeft = '20px';
    a.style.fontSize = '14px';

    a.addEventListener("click", (e) => {
        const subject = parent.querySelector('h2').textContent;
        // console.log({subject})
        const message = {
            eventName: 'find-question',
            subject
        }
        const response = chrome.runtime.sendMessage(message);
        // console.log('Got an asynchronous response with the data from the service worker => ', response);
        e.stopPropagation();
    });

    parent.classList.add('question-finder');
    parent.appendChild(a);
}

setTimeout(createLink, 1000);
