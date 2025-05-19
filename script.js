// script.js
// Placeholder for browser mockup interactivity
// You can add tab switching, group toggling, etc. here

const API_KEY = 'AIzaSyC2ThDz5-KVi7wBFeXPR6EC-xWNBCEDfPA';
const CX = 'c18f3250b0b5c45f0';

function searchGoogle(query) {
    fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.querySelector('.search-results');
            resultsContainer.innerHTML = '';
            if (data.items) {
                data.items.forEach(item => {
                    const div = document.createElement('div');
                    div.className = 'search-result';
                    div.innerHTML = `<a href="${item.link}" target="_blank">${item.title}</a><p>${item.snippet}</p>`;
                    resultsContainer.appendChild(div);
                });
            } else {
                resultsContainer.innerHTML = '<p>No results found.</p>';
            }
        });
}

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

    // On page load, embed Google Custom Search by default
    embedSite('https://cse.google.com/cse?cx=c18f3250b0b5c45f0');

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

    // Address bar search (Google Custom Search)
    const addressInput = document.querySelector('.address-bar input');
    addressInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            let query = this.value.trim();
            if (query) {
                searchGoogle(query);
            }
        }
    });
}); 