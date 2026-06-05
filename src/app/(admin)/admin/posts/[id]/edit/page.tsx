import { notFound } from 'next/navigation';

import { adminPostApi } from '@/api/admin-post';
import { publicCategoryApi } from '@/api/public-category';
import { publicTagApi } from '@/api/public-tag';
import { AdminPageTitle } from '@/components/admin/admin-page-title';
import { PostForm } from '@/components/admin/post-form';

interface AdminEditPostPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function AdminEditPostPage({ params }: AdminEditPostPageProps) {
    const { id } = await params;
    const [post, categories, tags] = await Promise.all([
        adminPostApi.detailById(id),
        publicCategoryApi.list(),
        publicTagApi.list(),
    ]);

    if (!post) {
        notFound();
    }

    const tagIdMap = new Map(tags.map((tag) => [tag.name, tag.id]));

    return (
        <div>
            <AdminPageTitle
                title="编辑文章"
                description="调整标题、摘要、正文和归档信息，保存后会同步影响前台展示。"
            />

            <div className="rounded-xl border border-black/6 bg-white/88 p-6 shadow-sm dark:border-white/8 dark:bg-zinc-950/70">
                <PostForm
                    mode="edit"
                    postId={post.id}
                    categories={categories}
                    tags={tags}
                    initialValues={{
                        title: post.title,
                        slug: post.slug ?? '',
                        summary: post.summary ?? '',
                        content: post.content,
                        cover: post.cover ?? '',
                        status: post.status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT',
                        categoryId: post.category?.id ?? '',
                        tagIds: post.tags
                            .map((tagName) => tagIdMap.get(tagName))
                            .filter((tagId): tagId is string => Boolean(tagId)),
                    }}
                />
            </div>
        </div>
    );
}
