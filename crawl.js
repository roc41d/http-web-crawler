
function normalizeUrl(url) {
    const urlObj = new URL(url);
    // remove trailing slash
    // urlObj.pathname = urlObj.pathname.replace(/\/$/, '');
    if (urlObj.pathname.endsWith('/')) {
        urlObj.pathname = urlObj.pathname.slice(0, -1);
    }

    return `${urlObj.hostname}${urlObj.pathname}`;
}

module.exports = {
    normalizeUrl
}