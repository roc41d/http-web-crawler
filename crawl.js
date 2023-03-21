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
/**
 * 
 * @param {*} baseUrl starting url/ site home page
 * @param {*} currentUrl page we are currently crawling
 * @param {*} pages keeps track of all pages we have crawled
 * @returns 
 */
async function crawlPage(baseUrl, currentUrl, pages) {
    // check if currentUrl is in same domain as baseUrl
    const baseUrlObj = new URL(baseUrl);
    const currentUrlObj = new URL(currentUrl);
    if (baseUrlObj.hostname !== currentUrlObj.hostname) {
        // console.log(`Skipping ${currentUrl} because it is not in the same domain as ${baseUrl}`);
        return pages;
    }

    // check if currentUrl has already been crawled
    const normalizedCurrentUrl = normalizeUrl(currentUrl);
    if (pages[normalizedCurrentUrl] > 0) {
        // console.log(`Skipping ${currentUrl} because it has already been crawled`);
        pages[normalizedCurrentUrl]++;
        return pages;
    }

    pages[normalizedCurrentUrl] = 1;

    console.log(`Crawling ${currentUrl}`);

    try {
        const resp = await fetch(currentUrl);
        if (resp.status >= 399) {
            console.log(`Error in fetch with status code ${resp.status} on ${currentUrl}`);
            return pages;
        }

        const contentType = resp.headers.get('content-type');
        if (!contentType || !contentType.includes('text/html')) {
            console.log(`Not HTML, skipping ${currentUrl}`);
            return pages;
        }

        const htmlBody = await resp.text();
        const nextUrls = getUrlsFromHtml(htmlBody, baseUrl);
        for (const nextUrl of nextUrls) {
            pages = await crawlPage(baseUrl, nextUrl, pages);
        }

    } catch (err) {
        console.log(`Error fetching ${currentUrl}: ${err.message}`);
    }

    return pages;
}

module.exports = {
    normalizeUrl,
    getUrlsFromHtml,
    crawlPage
}