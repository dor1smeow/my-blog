import { describeRoute, validator } from 'hono-openapi';

import {
    tagCreateRequestSchema,
    tagDetailByIdRequestParamsSchema,
    tagListSchema,
    tagSchema,
} from '@/server/tag/schema';
import { createTag, deleteTag, getTags } from '@/server/tag/service';

import { createHonoApp } from '../common/app';
import { createErrorResult } from '../common/error';
import {
    create201SuccessResponse,
    createNotFoundErrorResponse,
    createServerErrorResponse,
    createSuccessResponse,
    createValidatorErrorResponse,
} from '../common/response';

export const tagTag = ['标签操作'];
export const tagPath = '/tags';
export type TagApiType = typeof tagRoutes;

const app = createHonoApp();

export const tagRoutes = app
    .get(
        '/',
        describeRoute({
            tags: tagTag,
            summary: '查询全部标签',
            description: '从数据库中查询全部文章标签列表',
            responses: {
                ...createSuccessResponse(tagListSchema),
                ...createServerErrorResponse('查询标签列表失败'),
            },
        }),
        async (c) => {
            try {
                const tags = await getTags();
                return c.json({
                    success: true,
                    data: tags,
                });
            } catch (error) {
                return c.json(createErrorResult('查询标签列表失败', error), 500);
            }
        },
    )
    .post(
        '/',
        describeRoute({
            tags: tagTag,
            summary: '创建标签',
            description: '创建新的文章标签',
            responses: {
                ...create201SuccessResponse(tagSchema, '创建成功'),
                ...createValidatorErrorResponse(),
                ...createServerErrorResponse('创建标签失败'),
            },
        }),
        validator('json', tagCreateRequestSchema),
        async (c) => {
            try {
                const result = await createTag(c.req.valid('json'));
                return c.json(result, 201);
            } catch (error) {
                return c.json(createErrorResult('创建标签失败', error), 500);
            }
        },
    )
    .delete(
        '/:id',
        describeRoute({
            tags: tagTag,
            summary: '删除标签',
            description: '按 ID 删除标签',
            responses: {
                ...createSuccessResponse(tagSchema),
                ...createValidatorErrorResponse(),
                ...createNotFoundErrorResponse('标签不存在'),
                ...createServerErrorResponse('删除标签失败'),
            },
        }),
        validator('param', tagDetailByIdRequestParamsSchema),
        async (c) => {
            try {
                const { id } = c.req.valid('param');
                const result = await deleteTag(id);

                if (!result) {
                    return c.json(createErrorResult('标签不存在'), 404);
                }

                return c.json({ ...result, postCount: 0 }, 200);
            } catch (error) {
                return c.json(createErrorResult('删除标签失败', error), 500);
            }
        },
    );
