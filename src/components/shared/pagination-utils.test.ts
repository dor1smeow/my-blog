/* eslint-disable test/no-import-node-test */

import assert from 'node:assert/strict';
import test from 'node:test';

import { buildPaginationHref, getPaginationDisplayPages } from './pagination-utils';

test('buildPaginationHref omits page query for first page', () => {
    assert.equal(
        buildPaginationHref('/posts', 1, { category: 'react', tag: 'nextjs' }),
        '/posts?category=react&tag=nextjs',
    );
});

test('buildPaginationHref appends later pages and ignores empty values', () => {
    assert.equal(
        buildPaginationHref('/posts', 3, { category: 'react', tag: undefined }),
        '/posts?category=react&page=3',
    );
});

test('getPaginationDisplayPages returns all pages for short pagination', () => {
    assert.deepEqual(getPaginationDisplayPages(2, 5), [1, 2, 3, 4, 5]);
});

test('getPaginationDisplayPages keeps first, current neighbors and last page', () => {
    assert.deepEqual(getPaginationDisplayPages(5, 10), [1, 4, 5, 6, 10]);
});
