(function () {
    'use strict';
    const submitBtn = document.getElementById('submit');
    submitBtn?.addEventListener('click', function handler(e) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            const message = { action: "scrap" };
            chrome.tabs.sendMessage(activeTab.id, message);
        });
    })
})();

