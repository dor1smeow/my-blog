import type { PostItem, PostPaginate } from '@/server/post/type';

import { requestApi } from '@/lib/hono';

interface PublicPostListParams {
    page?: number;
    pageSize?: number;
    category?: string;
    tag?: string;
}

function buildPostListPath(params: PublicPostListParams = {}) {
    const searchParams = new URLSearchParams({
        scope: 'public',
    });

    if (params.page) {
        searchParams.set('page', String(params.page));
    }

    if (params.pageSize) {
        searchParams.set('pageSize', String(params.pageSize));
    }

    if (params.category) {
        searchParams.set('category', params.category);
    }

    if (params.tag) {
        searchParams.set('tag', params.tag);
    }

    return `/api/posts?${searchParams.toString()}`;
}

async function parsePostListResponse(response: Response) {
    if (!response.ok) {
        throw new Error(`获取文章列表失败: ${response.status}`);
    }

    return (await response.json()) as PostPaginate;
}

async function parsePostDetailResponse(response: Response) {
    if (!response.ok) {
        throw new Error(`获取文章详情失败: ${response.status}`);
    }

    return (await response.json()) as PostItem | null;
}

export const publicPostApi = {
    list: async (params?: PublicPostListParams) => {
        const response = await requestApi(buildPostListPath(params));
        return parsePostListResponse(response);
    },

    detailBySlug: async (slug: string) => {
        const response = await requestApi(`/api/posts/bySlug/${encodeURIComponent(slug)}`);
        return parsePostDetailResponse(response);
    },
};
