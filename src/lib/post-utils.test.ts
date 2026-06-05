/* eslint-disable test/no-import-node-test */

import assert from 'node:assert/strict';
import test from 'node:test';

import { estimateReadingTime, formatPostDate } from './post-utils';

test('formatPostDate formats date input for zh-CN output', () => {
    assert.equal(formatPostDate('2026-06-05T00:00:00.000Z'), '2026年6月5日');
});

test('estimateReadingTime strips html and returns at least one minute', () => {
    assert.equal(estimateReadingTime('<p>Hello world</p>'), 1);
});

test('estimateReadingTime counts long content into multiple minutes', () => {
    const content = Array.from({ length: 401 }).fill('word').join(' ');
    assert.equal(estimateReadingTime(content), 3);
});
