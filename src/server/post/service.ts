import 'server-only';
import type { Prisma } from '@prisma/client';

import { isNil } from 'lodash';

import db from '@/lib/db/client';

import type {
    PostCreateInputData,
    PostItem,
    PostListQuery,
    PostPaginationMeta,
    PostUpdateInputData,
} from './type';

const postDetailInclude = {
    category: true,
    tags: true,
} as const;

const formatPost = <
    T extends {
        category: { id: string; name: string; slug: string } | null;
        tags: Array<{ name: string }>;
        publishedAt?: Date | string | null;
    },
>(
    post: T,
) => ({
    ...post,
    publishedAt:
        post.publishedAt instanceof Date ? post.publishedAt.toISOString() : post.publishedAt,
    category: post.category,
    tags: post.tags.map((tag) => tag.name),
});

/**
 * 获取文章分页列表
 */
function buildPostListWhere(query: PostListQuery): Prisma.PostWhereInput {
    return {
        ...(query.category
            ? {
                  category: {
                      slug: query.category,
                  },
              }
            : {}),
        ...(query.tag
            ? {
                  tags: {
                      some: {
                          slug: query.tag,
                      },
                  },
              }
            : {}),
        ...(query.status
            ? {
                  status: query.status,
              }
            : query.scope === 'public'
              ? {
                    status: 'PUBLISHED',
                }
              : {}),
    };
}

export async function getPosts(query: PostListQuery): Promise<{
    items: PostItem[];
    meta: PostPaginationMeta;
}> {
    const where = buildPostListWhere(query);
    const total = await db.post.count({ where });
    const totalPages = Math.max(1, Math.ceil(total / query.pageSize));
    const currentPage = Math.min(query.page, totalPages);
    const skip = (currentPage - 1) * query.pageSize;

    const result = await db.post.findMany({
        where,
        include: postDetailInclude,
        orderBy: {
            createdAt: 'desc',
        },
        skip,
        take: query.pageSize,
    });

    return {
        items: result.map(formatPost),
        meta: {
            page: currentPage,
            pageSize: query.pageSize,
            total,
            totalPages,
            hasPrev: currentPage > 1,
            hasNext: currentPage < totalPages,
        },
    };
}

/**
 * 通过ID验证slug的唯一性
 * @param id
 */
export const isSlugUnique = (id?: string) => async (val?: string | null) => {
    if (isNil(val) || !val.length) return true;
    const post = await getPostBySlug(val);
    if (isNil(post) || post.id === id) return true;
    return false;
};

/**
 * 通过 slug 获取已发布文章
 * @param slug 文章 slug
 */
export async function getPostBySlug(slug: string) {
    const result = await db.post.findFirst({
        include: postDetailInclude,
        where: {
            slug,
        },
    });
    return result ? formatPost(result) : null;
}

/**
 * 创建文章
 * @param data 文章数据
 */

export async function createPost(data: PostCreateInputData) {
    const { categoryId, tagIds = [], ...rest } = data;
    const result = await db.post.create({
        include: postDetailInclude,
        data: {
            ...rest,
            ...(categoryId
                ? {
                      category: {
                          connect: { id: categoryId },
                      },
                  }
                : {}),
            ...(tagIds.length
                ? {
                      tags: {
                          connect: tagIds.map((id) => ({ id })),
                      },
                  }
                : {}),
        },
    });
    return formatPost(result);
}

/**
 * 通过ID查询文章详情
 * @param id 文章ID
 */
export async function getPostById(id: string) {
    const result = await db.post.findFirst({
        include: postDetailInclude,
        where: {
            id,
        },
    });
    return result ? formatPost(result) : null;
}

/**
 * 通过ID更新文章
 * @param data
 * @param id
 */
export async function updatePost(id: string, data: PostUpdateInputData) {
    const { categoryId, tagIds = [], ...rest } = data;
    const result = await db.post.update({
        include: postDetailInclude,
        where: {
            id,
        },
        data: {
            ...rest,
            category: categoryId ? { connect: { id: categoryId } } : { disconnect: true },
            tags: {
                set: [],
                ...(tagIds.length
                    ? {
                          connect: tagIds.map((tagId) => ({ id: tagId })),
                      }
                    : {}),
            },
        },
    });
    return formatPost(result);
}

/**
 * 通过ID删除文章
 */
export async function deletePost(id: string) {
    const post = await getPostById(id);
    if (!isNil(post)) {
        const result = await db.post.delete({
            include: postDetailInclude,
            where: {
                id,
            },
        });
        return formatPost(result);
    }
    return null;
}
