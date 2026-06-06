/* eslint-disable test/no-import-node-test */

import assert from 'node:assert/strict';
import test from 'node:test';

async function getApp() {
    process.env.DATABASE_URL ??= 'postgresql://postgres:postgres@127.0.0.1:5432/my_blog';
    const loaded = await import('./index');
    const app = 'request' in loaded.default ? loaded.default : loaded.default.default;
    return app;
}

async function parseJsonResponse<T>(response: Response) {
    return (await response.json()) as T;
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
    const payload = await parseJsonResponse<{
        data?: {
            page?: string;
        };
        error?: Array<{
            path?: string[];
        }>;
        success?: boolean;
    }>(response);

    assert.equal(response.status, 400);
    assert.equal(payload.success, false);
    assert.equal(payload.data?.page, '0');
    assert.equal(payload.error?.[0]?.path?.[0], 'page');
});

test('POST /api/posts rejects missing required fields before any persistence logic runs', async () => {
    const app = await getApp();
    const response = await app.request('/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
    });
    const payload = await parseJsonResponse<{
        data?: Record<string, unknown>;
        error?: Array<{
            path?: string[];
        }>;
        success?: boolean;
    }>(response);

    assert.equal(response.status, 400);
    assert.equal(payload.success, false);
    assert.deepEqual(payload.data, {});
    assert.ok(payload.error?.some((item) => item.path?.[0] === 'title'));
    assert.ok(payload.error?.some((item) => item.path?.[0] === 'slug'));
    assert.ok(payload.error?.some((item) => item.path?.[0] === 'content'));
});

test('GET /api/not-exists returns not found payload', async () => {
    const app = await getApp();
    const response = await app.request('/api/not-exists');
    const payload = await parseJsonResponse<{
        message?: string;
        ok?: boolean;
    }>(response);

    assert.equal(response.status, 404);
    assert.equal(payload.message, 'Not Found');
    assert.equal(payload.ok, false);
});
