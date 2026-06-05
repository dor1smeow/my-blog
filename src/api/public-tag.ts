import type { TagItem, TagListResponse } from '@/server/tag/type';

import { requestApi } from '@/lib/hono';

async function parseTagListResponse(response: Response) {
    if (!response.ok) {
        throw new Error(`获取标签列表失败: ${response.status}`);
    }

    const payload = (await response.json()) as TagListResponse;
    return payload.data;
}

export const publicTagApi = {
    list: async (): Promise<TagItem[]> => {
        const response = await requestApi('/api/tags');
        return parseTagListResponse(response);
    },
};
