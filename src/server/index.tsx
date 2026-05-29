import { swaggerUI } from '@hono/swagger-ui';
import { Scalar } from '@scalar/hono-api-reference';
import { openAPIRouteHandler } from 'hono-openapi';
import { prettyJSON } from 'hono/pretty-json';


import { createHonoApp } from './common/app';
import { postRoutes } from './post/routes';

const app = createHonoApp().basePath('api');
app.use(prettyJSON());
app.get('/', (c) => c.text('Dor1smeow API'));
app.notFound((c) => c.json({ message: 'Not Found', ok: false }, 404));
const routes = app.route('/posts', postRoutes);
app.get(
    '/data',
    openAPIRouteHandler(app, {
        documentation: {
            info: {
                version: 'v1',
                title: 'Dor1smeow API',
                description: 'Dor1smeow的后端API',
            },
        },
    }),
);

app.get('/swagger', swaggerUI({ url: '/api/data' }));

app.get(
    '/docs',
    Scalar({
        theme: 'saturn',
        url: '/api/data',
    }),
);
export type AppType = typeof routes;
export default app;
