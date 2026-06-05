import { z } from 'zod';

const tagShape = {
    id: z.string().meta({ description: '标签ID' }),
    name: z.string().meta({ description: '标签名称' }),
    slug: z.string().meta({ description: '标签 slug' }),
    postCount: z.number().int().min(0).meta({ description: '关联文章数量' }),
};

const createTagSchema = () => z.object(tagShape).strict();

export const tagSchema = createTagSchema().meta({
    id: 'Tag',
    description: '标签详情数据',
});

export const tagListSchema = z
    .object({
        success: z.literal(true).meta({ description: '请求是否成功' }),
        data: z.array(createTagSchema()).meta({ description: '标签列表' }),
    })
    .strict()
    .meta({ id: 'TagListResponse', description: '标签列表响应数据' });

export const tagCreateRequestSchema = z
    .object({
        name: z.string().trim().min(1, '标签名称不能为空').max(50, '标签名称不能超过 50 个字符'),
        slug: z
            .string()
            .trim()
            .min(1, '标签 slug 不能为空')
            .max(80, '标签 slug 不能超过 80 个字符'),
    })
    .strict()
    .meta({ id: 'CreateTagRequest', description: '创建标签请求数据' });

export const tagDetailByIdRequestParamsSchema = z
    .object({
        id: z.string().meta({ description: '标签ID' }),
    })
    .strict()
    .meta({ description: '标签ID请求参数' });
