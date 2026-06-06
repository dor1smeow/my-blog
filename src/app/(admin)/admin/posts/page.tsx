'use server';

import Link from 'next/link';

import { adminPostApi } from '@/api/admin-post';
import { AdminPageTitle } from '@/components/admin/admin-page-title';
import { AdminPostTable } from '@/components/admin/admin-post-table';
import { Button } from '@/components/shadcn/ui/button';

interface AdminPostsPageProps {
    searchParams: Promise<{
        page?: string | string[];
    }>;
}

function getSingleSearchParam(value?: string | string[]) {
    return Array.isArray(value) ? value[0] : value;
}

export default async function AdminPostsPage({ searchParams }: AdminPostsPageProps) {
    const { page } = await searchParams;
    const pageParam = getSingleSearchParam(page);
    const currentPage =
        Number.isFinite(Number(pageParam)) && Number(pageParam) > 0 ? Number(pageParam) : 1;
    const posts = await adminPostApi.list({
        page: currentPage,
        pageSize: 6,
    });

    return (
        <div>
            <AdminPageTitle
                title="文章管理"
                description="集中处理文章草稿、发布状态以及分类标签关联。"
                action={
                    <Button asChild>
                        <Link href="/admin/posts/new">新增文章</Link>
                    </Button>
                }
            />

            <div className="rounded-xl border border-black/6 bg-white/88 p-6 shadow-sm">
                <AdminPostTable
                    posts={posts.data.map((post) => ({
                        id: post.id,
                        title: post.title,
                        status: post.status as 'DRAFT' | 'PUBLISHED',
                        publishedAt: post.publishedAt ? new Date(post.publishedAt) : undefined,
                        category: post.category
                            ? {
                                  id: post.category.id,
                                  name: post.category.name,
                              }
                            : null,
                    }))}
                    meta={posts.meta}
                />
            </div>
        </div>
    );
}
