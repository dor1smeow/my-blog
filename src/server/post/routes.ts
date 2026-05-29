import { describeRoute, validator } from 'hono-openapi';

import {
    getPostItemCreateRequestSchema,
    getPostItemUpdateRequestSchema,
    postDetailByIdRequestParamsSchema,
    postDetailBySlugRequestParamsSchema,
    postPaginateSchema,
    postSchema,
} from '@/server/post/schema';
import {
    createPost,
    deletePost,
    getPostBySlug,
    getPosts,
    isSlugUnique,
    updatePost,
} from '@/server/post/service';

import { createHonoApp } from '../common/app';
import { createErrorResult } from '../common/error';
import {
    create201SuccessResponse,
    createServerErrorResponse,
    createSuccessResponse,
    createValidatorErrorResponse,
} from '../common/response';

export const postTag = ['文章操作'];
export const postPath = '/posts';

const app = createHonoApp();
const createPostRequestSchema = getPostItemCreateRequestSchema(isSlugUnique());

export const postRoutes = app
    .get(
        '/',
        describeRoute({
            tags: postTag,
            summary: '文章分页查询',
            description: '按分页条件查询文章列表，可按状态、分类等条件过滤',
            responses: {
                ...createSuccessResponse(postPaginateSchema),
                ...createValidatorErrorResponse(),
                ...createServerErrorResponse('查询文章列表失败'),
            },
        }),
        async (c) => {
            try {
                const posts = await getPosts();
                return c.json({
                    success: true,
                    data: posts,
                });
            } catch (error) {
                return c.json(createErrorResult('查询文章列表失败', error), 500);
            }
        },
    )

    .get(
        '/:slug',
        describeRoute({
            tags: postTag,
            summary: '通过slug文章查询',
            description: '按slug查询文章, 可按状态、分类等条件过滤',
            responses: {
                ...createSuccessResponse(postSchema),
                ...createValidatorErrorResponse(),
                ...createServerErrorResponse('查询slug失败'),
            },
        }),
        validator('param', postDetailBySlugRequestParamsSchema),
        async (c) => {
            try {
                const { slug } = c.req.valid('param');
                const result = await getPostBySlug(slug);
                return c.json(result, 200);
            } catch (error) {
                return c.json(createErrorResult('查询slug失败', error), 500);
            }
        },
    )

    .post(
        '/',
        describeRoute({
            tags: postTag,
            summary: '创建文章',
            description: '创建新的文章',
            responses: {
                ...create201SuccessResponse(postSchema, '创建成功，返回新文章'),
                ...createValidatorErrorResponse(),
                ...createServerErrorResponse('创建文章失败'),
            },
        }),
        validator('json', createPostRequestSchema),
        async (c) => {
            try {
                const result = await createPost(c.req.valid('json'));
                return c.json(result, 201);
            } catch (error) {
                return c.json(createErrorResult('创建文章失败', error), 500);
            }
        },
    )

    .patch(
        '/:id',
        describeRoute({
            tags: postTag,
            summary: '更新文章',
            description: '更新文章内容',
            responses: {
                ...createSuccessResponse(postSchema, '更新成功，返回更新后文章'),
                ...createValidatorErrorResponse(),
                ...createServerErrorResponse('更新文章失败'),
            },
        }),
        validator('param', postDetailByIdRequestParamsSchema),

        async (c) => {
            try {
                const params = c.req.valid('param');
                const schema = getPostItemUpdateRequestSchema(isSlugUnique(params.id));
                const validated = await schema.safeParseAsync(await c.req.json());

                if (!validated.success) {
                    return c.json(createErrorResult('请求数据验证失败', validated.error), 400);
                }
                const result = await updatePost(params.id, validated.data);
                return c.json(result, 200);
            } catch (error) {
                return c.json(createErrorResult('更新文章失败', error), 500);
            }
        },
    )

    .delete(
        '/:id',
        describeRoute({
            tags: postTag,
            summary: '删除文章',
            description: '',
            responses: {
                ...createSuccessResponse(postSchema),
                ...createValidatorErrorResponse(),
                ...createServerErrorResponse(''),
            },
        }),
        validator('param', postDetailByIdRequestParamsSchema),
        async (c) => {
            try {
                const { id } = c.req.valid('param');
                const result = await deletePost(id);
                return c.json(result, 200);
            } catch (error) {
                return c.json(createErrorResult('删除文章失败', error), 500);
            }
        },
    );
