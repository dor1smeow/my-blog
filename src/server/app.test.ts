/* eslint-disable test/no-import-node-test */

import assert from 'node:assert/strict';
import test from 'node:test';

async function getApp() {
    process.env.DATABASE_URL ??= 'postgresql://postgres:postgres@127.0.0.1:5432/my_blog';
    const loaded = await import('./index');
    const app = 'request' in loaded.default ? loaded.default : loaded.default.default;
    return app;
}

test('GET /api returns api root text', async () => {
    const app = await getApp();
    const response = await app.request('/api');

    assert.equal(response.status, 200);
    assert.equal(await response.text(), 'Dor1smeow API');
});

test('GET /api/posts?page=0 returns validator error before querying data', async () => {
    const app = await getApp();
    const response = await app.request('/api/posts?page=0');
    const payload = (await response.json()) as {
        data?: {
            page?: string;
        };
        error?: Array<{
            path?: string[];
        }>;
        success?: boolean;
    };

    assert.equal(response.status, 400);
    assert.equal(payload.success, false);
    assert.equal(payload.data?.page, '0');
    assert.equal(payload.error?.[0]?.path?.[0], 'page');
});

test('POST /api/posts rejects invalid payload', async () => {
    const app = await getApp();
    const response = await app.request('/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: '',
            slug: '',
            summary: 'invalid payload',
            content: '',
            status: 'DRAFT',
            tagIds: [],
        }),
    });
    const payload = (await response.json()) as {
        data?: {
            title?: string;
            content?: string;
        };
        error?: Array<{
            path?: string[];
        }>;
        success?: boolean;
    };

    assert.equal(response.status, 400);
    assert.equal(payload.success, false);
    assert.equal(payload.data?.title, '');
    assert.equal(payload.data?.content, '');
    assert.ok(payload.error?.some((item) => item.path?.[0] === 'title'));
    assert.ok(payload.error?.some((item) => item.path?.[0] === 'content'));
});

test('GET /api/not-exists returns not found payload', async () => {
    const app = await getApp();
    const response = await app.request('/api/not-exists');
    const payload = (await response.json()) as {
        message?: string;
        ok?: boolean;
    };

    assert.equal(response.status, 404);
    assert.equal(payload.message, 'Not Found');
    assert.equal(payload.ok, false);
});
