const { normalizeUrl, getUrlsFromHtml } = require('./crawl');
const { test, expect, describe } = require('@jest/globals');

describe('normalizeUrl', () => {
    test('Strip protocol', () => {
        const input = 'https://somewebsite.com/path';
        const actual = normalizeUrl(input);
        const expected = 'somewebsite.com/path';
    
        expect(actual).toBe(expected)
    });
    
    test('Strip trailing slash', () => {
        const input = 'https://somewebsite.com/path/';
        const actual = normalizeUrl(input);
        const expected = 'somewebsite.com/path';
    
        expect(actual).toBe(expected)
    });
    
    test('Strip capitals', () => {
        const input = 'https://BLOG.somewebsite.com/path';
        const actual = normalizeUrl(input);
        const expected = 'blog.somewebsite.com/path';
    
        expect(actual).toBe(expected)
    });
    
    test('Strip http', () => {
        const input = 'https://somewebsite.com/path';
        const actual = normalizeUrl(input);
        const expected = 'somewebsite.com/path';
    
        expect(actual).toBe(expected)
    });
});

describe('getUrlsFromHtml', () => {
    test('Absolute urls', () => {
        const inputHtmlBody = `
            <html>
                <body>
                    <a href="https://somewebsite.com/">Link</a>
                </body>
            </html>
        `;
        const inputBaseUrl = 'https://somewebsite.com';
        const actual = getUrlsFromHtml(inputHtmlBody, inputBaseUrl);
        const expected = ["https://somewebsite.com/"];
    
        expect(actual).toEqual(expected)
    });

    test('Relative urls', () => {
        const inputHtmlBody = `
            <html>
                <body>
                    <a href="/path/">Link</a>
                </body>
            </html>
        `;
        const inputBaseUrl = 'https://somewebsite.com';
        const actual = getUrlsFromHtml(inputHtmlBody, inputBaseUrl);
        const expected = ["https://somewebsite.com/path/"];
    
        expect(actual).toEqual(expected)
    });

    test('All urls', () => {
        const inputHtmlBody = `
            <html>
                <body>
                    <a href="/path1/">Link</a>
                    <a href="https://somewebsite.com/path2/">Link 2</a>
                </body>
            </html>
        `;
        const inputBaseUrl = 'https://somewebsite.com';
        const actual = getUrlsFromHtml(inputHtmlBody, inputBaseUrl);
        const expected = ["https://somewebsite.com/path1/", "https://somewebsite.com/path2/"];
    
        expect(actual).toEqual(expected)
    });

    test('Invalid url', () => {
        const inputHtmlBody = `
            <html>
                <body>
                    <a href="invalid">Invalid url</a>
                </body>
            </html>
        `;
        const inputBaseUrl = 'https://somewebsite.com';
        const actual = getUrlsFromHtml(inputHtmlBody, inputBaseUrl);
        const expected = [];
    
        expect(actual).toEqual(expected)
    });
});