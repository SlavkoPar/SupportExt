x = {
    q: localStorage.getItem('SUPPORT_CATEGORIES'),
    a: localStorage.getItem('SUPPORT_TOP')
}

x;

setTimeout(() => {
    btnSync = document.getElementById('btnSync');
    console.log('Href', location.href)

    btnSync.addEventListener("click", (e) => {
        const syncAction = JSON.parse(localStorage.getItem('syncAction'));
        console.log('>>> syncAction <<<', syncAction);
        chrome.storage.sync.set({syncAction}, function() {
            console.log('syncAction is set to ', syncAction);
          });
        e.stopPropagation();
        e.preventDefault();
    }, false);

}, 2000);

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      console.log(
        `Storage key "${key}" in namespace "${namespace}" changed.`,
        `Old value was:`, oldValue, "new value is:", newValue
      );
      // alert('Zaki');
      var message = {/* whatever */};
      var event = new CustomEvent("PassToBackground", {detail: newValue});
      window.dispatchEvent(event);
    }
  });