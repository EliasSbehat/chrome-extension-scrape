(function () {
    'use strict';
    const submitBtn = document.getElementById('submit');

    submitBtn?.addEventListener('click', function handler(e) {
        document.getElementById('submit').disabled = true;
        document.getElementById('submit').innerText = "Proccessing...";
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            const message = { action: "scrap" };
            chrome.tabs.sendMessage(activeTab.id, message, function (response) {
                console.log('Received response:', response);
                if (response.data) {
                    document.getElementById('submit').disabled = false;
                    document.getElementById('submit').innerText = "Scrape";
                }
            });
        });
    })
})();

