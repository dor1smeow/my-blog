import { z } from 'zod';

const categoryShape = {
    id: z.string().meta({ description: '分类ID' }),
    name: z.string().meta({ description: '分类名称' }),
    slug: z.string().meta({ description: '分类slug' }),
    postCount: z.number().int().min(0).meta({ description: '关联文章数量' }),
};

const createCategorySchema = () => z.object(categoryShape).strict();

/**
 * 单个分类对外返回的数据结构
 */
export const categorySchema = createCategorySchema().meta({
    id: 'Category',
    description: '分类详情数据',
});

/**
 * 分类列表响应数据结构
 */
export const categoryListSchema = z
    .object({
        success: z.literal(true).meta({ description: '请求是否成功' }),
        data: z.array(createCategorySchema()).meta({ description: '分类列表' }),
    })
    .strict()
    .meta({ id: 'CategoryListResponse', description: '分类列表响应数据' });

export const categoryCreateRequestSchema = z
    .object({
        name: z.string().trim().min(1, '分类名称不能为空').max(50, '分类名称不能超过 50 个字符'),
        slug: z
            .string()
            .trim()
            .min(1, '分类 slug 不能为空')
            .max(80, '分类 slug 不能超过 80 个字符'),
    })
    .strict()
    .meta({ id: 'CreateCategoryRequest', description: '创建分类请求数据' });

export const categoryDetailByIdRequestParamsSchema = z
    .object({
        id: z.string().meta({ description: '分类ID' }),
    })
    .strict()
    .meta({ description: '分类ID请求参数' });
