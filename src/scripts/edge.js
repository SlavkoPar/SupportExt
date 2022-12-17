
function callBack(mutations) {
    console.log('---------------------------------------------------->>>')
    console.log('==========>>>', { mutations })
    createLink();
}

var parentSelector = "div.UXx3I";

function createLink() {
    console.log('=========================================')

    const parent = document.querySelector(parentSelector);
    console.log(parent ? "IMA parent" : "NEMA parent")
    if (!parent || parent.classList.contains('question-finder'))
        // ListView rather than DetailView
        return

    const subject = parent.querySelector('span.full.UAxMv');
    if (!subject)
        return
    console.log('subject', subject);

    let alreadyAdded = parent.classList.contains('question-finder');
    alreadyAdded = parent.querySelector('div.xyz.vmaKW.kyCyq');
    if (alreadyAdded) {
        console.log('Already added')
        return
    }

    const div = document.createElement('div');
    div.classList.add('xyz', 'vmaKW', 'kyCyq');

    const img = document.createElement('img');
    img.src = chrome.runtime.getURL('/images/Support.png');

    const span = document.createElement('span');
    span.innerHTML = '<i>Support</i>';

    const a = document.createElement('a');
    a.appendChild(img);
    a.appendChild(span);
    a.classList.add('question-finder')
    a.style.marginLeft = '5px';
    a.style.fontSize = '14px';

    a.addEventListener("click", (e) => {
        const subject = parent.querySelector('span.full.UAxMv').textContent;
        console.log('subject click', subject)

        const message = {
            eventName: 'find-question',
            subject
        }
        const response = chrome.runtime.sendMessage(message);
        console.log('found question: ', response);
        e.stopPropagation();
    });

    div.appendChild(a);
    parent.appendChild(div);
    console.log('DODAO TRECI DIV')

    parent.classList.add('question-finder');

    const mutationObserver = new MutationObserver(callBack);

    mutationObserver.observe(document.querySelector('div.HOVUa'), {
        childList: true,
        subtree: true
    });
}

setTimeout(createLink, 2000);
