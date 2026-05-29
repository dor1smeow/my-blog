import 'server-only';

import { getAdminPostsFromApi } from '@/api/admin';

export const getAdminPosts = async () => {
    try {
        const posts = await getAdminPostsFromApi();

        return posts.map((post) => ({
            ...post,
            publishedAt: post.publishedAt ? new Date(post.publishedAt) : undefined,
            createdAt: new Date(post.createdAt),
        }));
    } catch (err) {
        console.error('获取后台文章列表失败:', err);
        return [];
    }
};
