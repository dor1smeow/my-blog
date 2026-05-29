import type { AdminOptionDto } from '@/api/admin';

import { getAdminPostOptionsFromApi } from '@/api/admin';
import { AdminPageTitle } from '@/components/admin/admin-page-title';
import { PostForm } from '@/components/admin/post-form';

export default async function AdminNewPostPage() {
    let categories: AdminOptionDto[] = [];
    let tags: AdminOptionDto[] = [];
    let optionsLoadError: string | null = null;

    try {
        const options = await getAdminPostOptionsFromApi();
        categories = options.categories;
        tags = options.tags;
    } catch (error) {
        optionsLoadError = error instanceof Error ? error.message : '分类和标签暂时不可用';
    }

    return (
        <div>
            <AdminPageTitle
                title="新建文章"
                description="填写文章内容与元信息，提交后保存到后台。"
            />

            <div className="rounded-xl border bg-white p-6 shadow-sm">
                {optionsLoadError ? (
                    <p className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">
                        {optionsLoadError}，页面仍可填写；分类和标签会先以空选项显示。
                    </p>
                ) : null}
                <PostForm mode="create" categories={categories} tags={tags} />
            </div>
        </div>
    );
}
