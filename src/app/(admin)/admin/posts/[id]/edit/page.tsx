import type { AdminOptionDto } from '@/api/admin';

import { getAdminPostByIdFromApi, getAdminPostOptionsFromApi } from '@/api/admin';
import { AdminPageTitle } from '@/components/admin/admin-page-title';
import { PostForm } from '@/components/admin/post-form';

interface AdminEditPostPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function AdminEditPostPage({ params }: AdminEditPostPageProps) {
    const { id } = await params;

    let categories: AdminOptionDto[] = [];
    let tags: AdminOptionDto[] = [];
    let optionsLoadError: string | null = null;
    let post: Awaited<ReturnType<typeof getAdminPostByIdFromApi>> | null = null;
    let postLoadError: string | null = null;

    try {
        const options = await getAdminPostOptionsFromApi();
        categories = options.categories;
        tags = options.tags;
    } catch (error) {
        optionsLoadError = error instanceof Error ? error.message : '分类和标签暂时不可用';
    }

    try {
        post = await getAdminPostByIdFromApi(id);
    } catch (error) {
        postLoadError = error instanceof Error ? error.message : '文章详情暂时不可用';
    }

    return (
        <div>
            <AdminPageTitle
                title="编辑文章"
                description="修改文章内容与元信息，保存后会更新后台数据。"
            />

            {postLoadError || !post ? (
                <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 shadow-sm">
                    {postLoadError ?? '文章详情暂时不可用'}
                </div>
            ) : (
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    {optionsLoadError ? (
                        <p className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">
                            {optionsLoadError}，页面仍可编辑；分类和标签会先以当前可用选项显示。
                        </p>
                    ) : null}

                    <PostForm
                        mode="edit"
                        postId={post.id}
                        categories={categories}
                        tags={tags}
                        initialValues={{
                            title: post.title,
                            slug: post.slug,
                            summary: post.summary,
                            content: post.content,
                            cover: post.cover ?? '',
                            status: post.status,
                            categoryId: post.categoryId ?? '',
                            tagIds: post.tags.map((tag) => tag.id),
                        }}
                    />
                </div>
            )}
        </div>
    );
}
