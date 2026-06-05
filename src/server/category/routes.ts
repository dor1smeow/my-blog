import { describeRoute, validator } from 'hono-openapi';

import {
    categoryCreateRequestSchema,
    categoryDetailByIdRequestParamsSchema,
    categoryListSchema,
    categorySchema,
} from '@/server/category/schema';
import { createCategory, deleteCategory, getCategories } from '@/server/category/service';

import { createHonoApp } from '../common/app';
import { createErrorResult } from '../common/error';
import {
    create201SuccessResponse,
    createNotFoundErrorResponse,
    createServerErrorResponse,
    createSuccessResponse,
    createValidatorErrorResponse,
} from '../common/response';

export const categoryTag = ['分类操作'];
export const categoryPath = '/categories';
export type CategoryApiType = typeof categoryRoutes;

const app = createHonoApp();

export const categoryRoutes = app
    .get(
        '/',
        describeRoute({
            tags: categoryTag,
            summary: '查询全部分类',
            description: '从数据库中查询全部文章分类列表',
            responses: {
                ...createSuccessResponse(categoryListSchema),
                ...createServerErrorResponse('查询分类列表失败'),
            },
        }),
        async (c) => {
            try {
                const categories = await getCategories();
                return c.json({
                    success: true,
                    data: categories,
                });
            } catch (error) {
                return c.json(createErrorResult('查询分类列表失败', error), 500);
            }
        },
    )
    .post(
        '/',
        describeRoute({
            tags: categoryTag,
            summary: '创建分类',
            description: '创建新的文章分类',
            responses: {
                ...create201SuccessResponse(categorySchema, '创建成功'),
                ...createValidatorErrorResponse(),
                ...createServerErrorResponse('创建分类失败'),
            },
        }),
        validator('json', categoryCreateRequestSchema),
        async (c) => {
            try {
                const result = await createCategory(c.req.valid('json'));
                return c.json(result, 201);
            } catch (error) {
                return c.json(createErrorResult('创建分类失败', error), 500);
            }
        },
    )
    .delete(
        '/:id',
        describeRoute({
            tags: categoryTag,
            summary: '删除分类',
            description: '按 ID 删除分类',
            responses: {
                ...createSuccessResponse(categorySchema),
                ...createValidatorErrorResponse(),
                ...createNotFoundErrorResponse('分类不存在'),
                ...createServerErrorResponse('删除分类失败'),
            },
        }),
        validator('param', categoryDetailByIdRequestParamsSchema),
        async (c) => {
            try {
                const { id } = c.req.valid('param');
                const result = await deleteCategory(id);

                if (!result) {
                    return c.json(createErrorResult('分类不存在'), 404);
                }

                return c.json({ ...result, postCount: 0 }, 200);
            } catch (error) {
                return c.json(createErrorResult('删除分类失败', error), 500);
            }
        },
    );
