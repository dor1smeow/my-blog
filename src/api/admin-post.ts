import type { PostCreateData, PostItem, PostPaginate, PostUpdateData } from '@/server/post/type';

import { postClient } from '@/api/post-client';
import { fetchApi } from '@/lib/hono';

interface AdminPostListParams {
    page?: number;
    pageSize?: number;
    status?: 'DRAFT' | 'PUBLISHED';
}

async function parsePostListResponse(response: Response) {
    if (!response.ok) {
        throw new Error(`获取后台文章列表失败: ${response.status}`);
    }

    return (await response.json()) as PostPaginate;
}

async function parsePostDetailResponse(response: Response) {
    if (!response.ok) {
        throw new Error(`获取文章详情失败: ${response.status}`);
    }

    return (await response.json()) as PostItem | null;
}

async function parseMutationResponse(response: Response) {
    if (!response.ok) {
        throw new Error(`文章操作失败: ${response.status}`);
    }

    return (await response.json()) as PostItem | null;
}

export const adminPostApi = {
    list: async (params: AdminPostListParams = {}) => {
        const response = await fetchApi(postClient, (c) =>
            c.index.$get({
                query: {
                    scope: 'admin',
                    ...(params.page ? { page: String(params.page) } : {}),
                    ...(params.pageSize ? { pageSize: String(params.pageSize) } : {}),
                    ...(params.status ? { status: params.status } : {}),
                },
            }),
        );
        return parsePostListResponse(response);
    },

    detailById: async (id: string) => {
        const response = await fetchApi(postClient, (c) => c.byId[':id'].$get({ param: { id } }));
        return parsePostDetailResponse(response);
    },

    detailBySlug: async (slug: string) => {
        const response = await fetchApi(postClient, (c) =>
            c.bySlug[':slug'].$get({ param: { slug } }),
        );
        return parsePostDetailResponse(response);
    },

    create: async (data: PostCreateData) => {
        const response = await fetchApi(postClient, (c) => c.index.$post({ json: data }));
        return parseMutationResponse(response);
    },

    update: async (id: string, data: PostUpdateData) => {
        const response = await fetchApi(postClient, (c) =>
            c[':id'].$patch({ param: { id }, json: data }),
        );
        return parseMutationResponse(response);
    },

    delete: async (id: string) => {
        const response = await fetchApi(postClient, (c) => c[':id'].$delete({ param: { id } }));
        return parseMutationResponse(response);
    },
};
