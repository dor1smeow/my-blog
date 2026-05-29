import type { Context, Env } from 'hono';

import { Hono } from 'hono';
import { prettyJSON } from 'hono/pretty-json';

interface ErrorLike {
    message: string;
}

type ValidatorResult =
    | {
          success: true;
      }
    | {
          success: false;
          error: {
              format: () => unknown;
          };
      };

const hasMessage = (value: unknown): value is ErrorLike =>
    typeof value === 'object' &&
    value !== null &&
    'message' in value &&
    typeof value.message === 'string';
/**
 * 创建Hono应用
 */
export const createHonoApp = <E extends Env>() => {
    const app = new Hono<E>();
    app.use(prettyJSON());
    return app;
};

/**
 * 异常响应生成
 * @param title
 * @param error
 * @param code
 */
export const createErrorResult = (title: string, error?: unknown, code?: number) => {
    let message = title;
    if (error !== null && error !== undefined) {
        message =
            error instanceof Error || hasMessage(error)
                ? `${title}:${error.message}`
                : `${title}:${String(error)}`;
    }

    return {
        code,
        message,
    };
};

/**
 * 请求数据验证失败的默认响应
 * @param result
 * @param c
 */
export const defaultValidatorErrorHandler = (result: ValidatorResult, c: Context) => {
    if (!result.success) {
        return c.json(
            {
                ...createErrorResult('请求数据验证失败', 400),
                errors: result.error.format(),
            },
            400,
        );
    }
    return result;
};
