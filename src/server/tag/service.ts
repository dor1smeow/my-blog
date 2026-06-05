import 'server-only';

import db from '@/lib/db/client';

import type { TagCreateData } from './type';

export async function getTags() {
    return db.tag
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

export async function createTag(data: TagCreateData) {
    const result = await db.tag.create({
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

export async function deleteTag(id: string) {
    const tag = await db.tag.findUnique({
        where: { id },
        select: {
            _count: {
                select: {
                    posts: true,
                },
            },
        },
    });

    if (!tag) {
        return null;
    }

    if (tag._count.posts > 0) {
        throw new Error('该标签下仍有关联文章，暂时不能删除');
    }

    return db.tag.delete({
        where: { id },
        select: {
            id: true,
            name: true,
            slug: true,
        },
    });
}
