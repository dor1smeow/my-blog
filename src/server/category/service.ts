import 'server-only';

import db from '@/lib/db/client';

import type { CategoryCreateData } from './type';

/**
 * 获取全部分类
 */
export async function getCategories() {
    return db.category
        .findMany({
            orderBy: {
                name: 'asc',
            },
            select: {
                id: true,
                name: true,
                slug: true,
                _count: {
                    select: {
                        posts: true,
                    },
                },
            },
        })
        .then((items) =>
            items.map((item) => ({
                id: item.id,
                name: item.name,
                slug: item.slug,
                postCount: item._count.posts,
            })),
        );
}

export async function createCategory(data: CategoryCreateData) {
    const result = await db.category.create({
        data,
        select: {
            id: true,
            name: true,
            slug: true,
            _count: {
                select: {
                    posts: true,
                },
            },
        },
    });

    return {
        id: result.id,
        name: result.name,
        slug: result.slug,
        postCount: result._count.posts,
    };
}

export async function deleteCategory(id: string) {
    const category = await db.category.findUnique({
        where: { id },
        select: {
            _count: {
                select: {
                    posts: true,
                },
            },
        },
    });

    if (!category) {
        return null;
    }

    if (category._count.posts > 0) {
        throw new Error('该分类下仍有关联文章，暂时不能删除');
    }

    return db.category.delete({
        where: { id },
        select: {
            id: true,
            name: true,
            slug: true,
        },
    });
}
