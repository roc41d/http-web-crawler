const { sortPages } = require('./report');
const { test, expect, describe } = require('@jest/globals');

describe('sortPages', () => {
    test('Sort pages by occurrence', () => {
        const inputPages = {
            'https://somewebsite.com/': 2,
            'https://somewebsite.com/path': 1,
            'https://somewebsite.com/path/subpath': 3,
        };
        const actual = sortPages(inputPages);
        const expected = [
            ['https://somewebsite.com/path/subpath', 3],
            ['https://somewebsite.com/', 2],
            ['https://somewebsite.com/path', 1],
        ];

        expect(actual).toEqual(expected)

    });
});