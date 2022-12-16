var grandPaSelector = "div.LBktY";
var selector2 = "div.LiYQG";

// :not(.question-finder-parent)

function callBack(mutations) {
    console.log('---------------------------------------------------->>>')
    console.log('==========>>>', { mutations })
    injectEdge();
}

var nTimes = 0;
function injectEdge() {
    console.log('=========================================')
    console.log(`injectEdge(${++nTimes})`)

    const grandPaContainer = document.querySelector(grandPaSelector);
    console.log(grandPaContainer ? "IMA grandPaContainer" : "NEMA grandPaContainer")
    if (!grandPaContainer) {
        // ListView rather than DetailView
        return
    }

    const parentSelector = "div.UXx3I" //:not(.question-finder-parent)";
    const parent = document.querySelector(parentSelector, grandPaContainer)  // :not(.question-finder-parent)
    //const parentSelector = "div.full.RCfNE.allowTextSelection" //:not(.question-finder-parent)";
    //const parent = document.querySelector(parentSelector, grandPaContainer)  // :not(.question-finder-parent)

    //const elem = document.querySelector("div.iPBfK.jmmB7.NUbju:not(.question-finder-parent)")
    
    //const container = document.querySelector("div.iPBfK.jmmB7.NUbju")
    //const container = document.querySelector("div.full.RCfNE.allowTextSelection:not(.question-finder-parent)")  
    //const selector = "div.full.RCfNE.allowTextSelection:not(.question-finder-parent)";
    /*
    const selector = "div.full.RCfNE.allowTextSelection:not(.question-finder-parent)";
    const container = document.querySelector(selector)  // :not(.question-finder-parent)
    */
    console.log(parent ? "IMA PARENT" : "NEMA PARENT")
    if (!parent) {
        setTimeout(injectEdge, 1000)
        return
    }

    //const elem = document.querySelector("a.question-finder", container)

    console.log('IMA KONTEJNER TRAZI PARENT')
    const subject = document.querySelector('span.full.UAxMv', parent);
    if (!subject) {
        setTimeout(injectEdge, 1000)
        return
    }
    console.log('subject', subject);
    console.log('parent', parent)

    let alreadyAdded = parent.classList.contains('question-finder-parent');
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
        const subject = document.querySelector('span.full.UAxMv', parent).textContent;
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

    console.log('createdLink  grandPaContainer:', grandPaContainer)
    parent.classList.add('question-finder-parent');


    const mutationObserver = new MutationObserver(callBack);

    mutationObserver.observe(document.querySelector(grandPaSelector), {
        childList: true,
        subtree: true
    });

    // mutationObserver.observe(document.querySelector(selector2), {
    //     childList: true,
    //     subtree: true
    // });
}

setTimeout(injectEdge, 5000);
