const { JSDOM } = require('jsdom');

function normalizeUrl(url) {
    const urlObj = new URL(url);
    // urlObj.pathname = urlObj.pathname.replace(/\/$/, '');
    if (urlObj.pathname.endsWith('/')) {
        urlObj.pathname = urlObj.pathname.slice(0, -1);
    }

    return `${urlObj.hostname}${urlObj.pathname}`;
}

function getUrlsFromHtml(htmlBody, baseUrl) {
    const dom = new JSDOM(htmlBody);
    const links = dom.window.document.querySelectorAll('a');

    const urls = Array.from(links).map(link => {
        if (link.href.startsWith('/')) {
            return `${baseUrl}${link.href}`;
        } else {
            try {
                const urlObj = new URL(link.href);
                return urlObj.href;
            } catch (err) {
                console.log(`error with absolute url: ${err.message}`);
            }
        }
    });
    return urls;
}

async function crawlPage(url) {
    console.log(`Crawling ${url}`);
    try {
        const resp = await fetch(url);
        if (resp.status >= 399) {
            console.log(`Error in fetch with status code ${resp.status} on ${url}`);
            return;
        }

        const contentType = resp.headers.get('content-type');
        if (!contentType || !contentType.includes('text/html')) {
            console.log(`Not HTML, skipping ${url}`);
            return;
        }

        const htmlBody = await resp.text();

        console.log(`Got ${htmlBody}`);
    } catch (err) {
        console.log(`Error fetching ${url}: ${err.message}`);
    }
}

module.exports = {
    normalizeUrl,
    getUrlsFromHtml,
    crawlPage
}