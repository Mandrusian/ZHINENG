// script.js
// Placeholder for browser mockup interactivity
// You can add tab switching, group toggling, etc. here

document.addEventListener('DOMContentLoaded', () => {
    // Tab selection and current marker
    function setActiveTab(tab) {
        document.querySelectorAll('.tab, .new-tab, .empty-tab').forEach(t => {
            t.classList.remove('active');
            const current = t.querySelector('.current');
            if (current) current.remove();
        });
        tab.classList.add('active');
        // Add (Current) marker if not present
        if (!tab.querySelector('.current')) {
            const marker = document.createElement('span');
            marker.className = 'current';
            marker.textContent = ' (Current)';
            // Place after tab title
            if (tab.classList.contains('new-tab')) {
                tab.querySelector('span:not(.plus)').appendChild(marker);
            } else {
                tab.appendChild(marker);
            }
        }
        // Load the tab's URL if it has one
        const url = tab.getAttribute('data-url');
        if (url) {
            embedSite(url);
        }
    }

    document.querySelectorAll('.tab, .new-tab, .empty-tab').forEach(tab => {
        tab.addEventListener('click', function(e) {
            setActiveTab(this);
        });
    });

    // Tab group sliding animation
    document.querySelectorAll('.tab-group-header').forEach(header => {
        header.addEventListener('click', function() {
            const tabList = this.parentElement.querySelector('.tab-list');
            if (!tabList) return;
            if (tabList.style.maxHeight && tabList.style.maxHeight !== '0px') {
                tabList.style.maxHeight = '0px';
            } else {
                tabList.style.maxHeight = tabList.scrollHeight + 'px';
            }
        });
        // Set initial maxHeight for animation
        const tabList = header.parentElement.querySelector('.tab-list');
        if (tabList) {
            tabList.style.overflow = 'hidden';
            tabList.style.transition = 'max-height 0.4s cubic-bezier(.4,2,.6,1)';
            tabList.style.maxHeight = tabList.scrollHeight + 'px';
        }
    });

    // Embed Google or search results
    function embedSite(url) {
        const contentArea = document.querySelector('.content-area');
        contentArea.innerHTML = `<iframe src="${url}" class="browser-iframe"></iframe>`;
    }

    // On page load, embed Ecosia by default
    embedSite('https://www.ecosia.org');

    // Suggestion click
    document.querySelectorAll('.suggestion').forEach(suggestion => {
        suggestion.addEventListener('click', function() {
            let url = '';
            switch (true) {
                case this.classList.contains('google'):
                    url = 'https://www.google.com';
                    break;
                case this.classList.contains('youtube'):
                    url = 'https://www.youtube.com';
                    break;
                case this.classList.contains('bing'):
                    url = 'https://www.bing.com';
                    break;
                case this.classList.contains('github'):
                    url = 'https://github.com';
                    break;
                case this.classList.contains('oppo'):
                    url = 'https://www.oppo.com';
                    break;
            }
            embedSite(url);
        });
    });

    // Address bar search
    const addressInput = document.querySelector('.address-bar input');
    addressInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            let query = this.value.trim();
            if (query) {
                // If it's a URL, go directly; otherwise, search Google
                let url = '';
                if (/^https?:\/\//.test(query)) {
                    url = query;
                } else if (/\./.test(query) && !query.includes(' ')) {
                    url = 'https://' + query;
                } else {
                    url = 'https://www.google.com/search?q=' + encodeURIComponent(query);
                }
                embedSite(url);
            }
        }
    });
}); 