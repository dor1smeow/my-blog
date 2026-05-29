import type { Env } from 'hono';

import { Hono } from 'hono';
import { prettyJSON } from 'hono/pretty-json';
/**
 * 创建Hono应用
 */
//createHonoApp:<E extends Env>() => Hono<E>() =() => {}
export const createHonoApp = <E extends Env>() => {
    const app = new Hono<E>();
    app.use(prettyJSON());
    return app;
};
