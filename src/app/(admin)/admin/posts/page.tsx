'use server';

import { getAdminPosts } from '@/app/(admin)/admin/posts/server';
import { AdminPageTitle } from '@/components/admin/admin-page-title';
import { AdminPostTable } from '@/components/admin/admin-post-table';

export default async function AdminPostsPage() {
    const posts = await getAdminPosts();

    return (
        <div>
            <AdminPageTitle
                title="文章列表"
                description="管理所有文章，包括草稿、已发布和已下线内容。"
            />

            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <AdminPostTable posts={posts} />
            </div>
        </div>
    );
}
