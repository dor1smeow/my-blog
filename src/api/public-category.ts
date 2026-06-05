import type { CategoryItem, CategoryListResponse } from '@/server/category/type';

import { requestApi } from '@/lib/hono';

async function parseCategoryListResponse(response: Response) {
    if (!response.ok) {
        throw new Error(`获取分类列表失败: ${response.status}`);
    }

    const payload = (await response.json()) as CategoryListResponse;
    return payload.data;
}

export const publicCategoryApi = {
    list: async (): Promise<CategoryItem[]> => {
        const response = await requestApi('/api/categories');
        return parseCategoryListResponse(response);
    },
};
