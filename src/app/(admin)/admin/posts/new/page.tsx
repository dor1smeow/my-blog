import { publicCategoryApi } from '@/api/public-category';
import { publicTagApi } from '@/api/public-tag';
import { AdminPageTitle } from '@/components/admin/admin-page-title';
import { PostForm } from '@/components/admin/post-form';

export default async function AdminNewPostPage() {
    const [categories, tags] = await Promise.all([publicCategoryApi.list(), publicTagApi.list()]);

    return (
        <div>
            <AdminPageTitle
                title="新建文章"
                description="写一篇新文章，发布前也可以先把摘要、分类和标签整理好。"
            />

            <div className="rounded-xl border border-black/6 bg-white/88 p-6 shadow-sm">
                <PostForm mode="create" categories={categories} tags={tags} />
            </div>
        </div>
    );
}
