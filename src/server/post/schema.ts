import 'server-only';
import { isNil } from 'lodash';
import { z } from 'zod';

const postShape = {
    id: z.string().meta({ description: '文章ID' }),
    title: z.string().meta({ description: '文章标题' }),
    slug: z.string().nullable().optional().meta({ description: '文章slug' }),
    summary: z.string().nullable().optional().meta({ description: '文章摘要' }),
    content: z.string().meta({ description: '文章内容' }),
    cover: z.string().nullable().optional().meta({ description: '文章缩略图' }),
    publishedAt: z.string().meta({ description: '文章发表时间' }),
    category: z
        .object({
            id: z.string().meta({ description: '分类ID' }),
            name: z.string().meta({ description: '分类名称' }),
            slug: z.string().meta({ description: '分类slug' }),
        })
        .nullable()
        .meta({ description: '文章分类' }),
    tags: z.array(z.string()).meta({ description: '关联标签列表' }),
    status: z.string().meta({ description: '是否发布' }),
};

const createPostItemSchema = () => z.object(postShape).strict();

/**
 * 单篇文章对外返回的数据结构
 * 用于约束接口返回的文章详情格式
 */
export const postSchema = createPostItemSchema().meta({
    id: 'Post',
    description: '文章详情数据',
});

/**
 * 文章列表响应数据结构
 */
export const postPaginateSchema = z
    .object({
        success: z.literal(true).meta({ description: '请求是否成功' }),
        data: z.array(createPostItemSchema()).meta({ description: '文章列表' }),
    })
    .strict()
    .meta({ id: 'PostListResponse', description: '文章列表响应数据' });

/**
 * 文章操作(更新文章)时的请求数据结构
 * @param slugUniqueValidator Slug唯一性验证结构生成器
 */
export const getPostItemUpdateRequestSchema = (
    slugUniqueValidator?: (val?: string | null) => Promise<boolean>,
) => {
    let slug = z
        .string()
        .max(250, {
            message: 'slug 长度不能超过 250 字符',
        })
        .optional()
        .meta({ description: '文章 slug, URL 中使用，必须唯一' });
    if (!isNil(slugUniqueValidator)) {
        slug = slug.refine(slugUniqueValidator, {
            message: 'slug 已存在，请更换后重试',
        });
    }
    return z
        .object({
            title: z
                .string()
                .min(1, {
                    message: '标题不能为空',
                })
                .max(200, {
                    message: '标题不得超过200个字符',
                })
                .meta({ description: '文章标题' }),
            slug,
            summary: z
                .string()
                .max(300, {
                    message: '摘要不得超过300个字符',
                })
                .optional()
                .meta({ description: '文章摘要' }),
            content: z.string().min(1, '内容不能为空').meta({ description: '文章内容' }),
            cover: z.string().optional().meta({ description: '文章缩略图' }),
            status: z.enum(['DRAFT', 'PUBLISHED']).default('DRAFT'),
            categoryId: z.string().optional().meta({ description: '文章分类ID' }),
            tagIds: z.array(z.string()).default([]).meta({ description: '文章标签ID列表' }),
        })
        .strict()
        .meta({ id: 'UpdatePostRequest', description: '更新文章的请求数据' });
};

/**
 * 文章操作(创建文章)时的请求数据结构
 * @param slugUniqueValidator Slug唯一性验证结构生成器
 */
export const getPostItemCreateRequestSchema = (
    slugUniqueValidator?: (val?: string | null) => Promise<boolean>,
) => {
    let slug = z
        .string()
        .max(250, {
            message: 'slug 长度不能超过 250 字符',
        })
        .meta({ description: '文章 slug, URL 中使用，必须唯一' });
    if (!isNil(slugUniqueValidator)) {
        slug = slug.refine(slugUniqueValidator, {
            message: 'slug 已存在，请更换后重试',
        });
    }
    return z
        .object({
            title: z
                .string()
                .min(1, {
                    message: '标题不能为空',
                })
                .max(200, {
                    message: '标题不得超过200个字符',
                })
                .meta({ description: '文章标题' }),
            slug,
            summary: z
                .string()
                .max(300, {
                    message: '摘要不得超过300个字符',
                })
                .optional()
                .meta({ description: '文章摘要' }),
            content: z.string().min(1, '内容不能为空').meta({ description: '文章内容' }),
            cover: z.string().optional().meta({ description: '文章缩略图' }),
            status: z.enum(['DRAFT', 'PUBLISHED']).default('DRAFT'),
            categoryId: z.string().optional().meta({ description: '文章分类ID' }),
            tagIds: z.array(z.string()).default([]).meta({ description: '文章标签ID列表' }),
        })
        .strict()
        .meta({ id: 'CreatePostRequest', description: '创建文章的请求数据' });
};

/**
 * 通过slug查询文章详情的请求数据结构
 */
export const postDetailBySlugRequestParamsSchema = z
    .object({
        slug: z.string(),
    })
    .meta({ description: '文章slug' });

/**
 * 通过ID查询文章详情的请求数据结构
 */
export const postDetailByIdRequestParamsSchema = z.object({
    id: z.string().meta({ description: '文章ID' }),
});
