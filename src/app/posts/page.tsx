import type { Metadata } from 'next';

import { Suspense } from 'react';

import { BlogIndexPage } from '@/components/post/list';
import { BlogIndexSkeleton } from '@/components/post/list/skeleton';

export const metadata: Metadata = {
    title: '文章',
    description: '按主题整理所有文章，集中查看最近的技术记录、项目复盘和实现过程。',
};

export const dynamic = 'force-dynamic';

interface PostsPageProps {
    searchParams: Promise<{
        category?: string | string[];
        tag?: string | string[];
        page?: string | string[];
    }>;
}

function getSingleSearchParam(value?: string | string[]) {
    return Array.isArray(value) ? value[0] : value;
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
    const { category, tag, page } = await searchParams;
    const currentCategory = getSingleSearchParam(category);
    const currentTag = getSingleSearchParam(tag);
    const pageParam = getSingleSearchParam(page);
    const currentPage =
        Number.isFinite(Number(pageParam)) && Number(pageParam) > 0 ? Number(pageParam) : 1;

    return (
        <main>
            <div className="mx-auto w-full max-w-[88rem] px-5 py-16 md:px-8 xl:px-10">
                <div className="flex w-full min-w-0 flex-col">
                    <header className="max-w-2xl space-y-3">
                        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">文章</h1>
                        <p className="text-[13px] leading-6 text-muted-foreground md:text-sm">
                            这里收录了我最近整理下来的文章，内容主要围绕前端工程、组件拆分、类型设计和内容平台开发。
                        </p>
                    </header>

                    <Suspense
                        key={`${currentCategory ?? 'all'}-${currentTag ?? 'all'}-${currentPage}`}
                        fallback={<BlogIndexSkeleton />}
                    >
                        <BlogIndexPage
                            currentCategory={currentCategory}
                            currentTag={currentTag}
                            currentPage={currentPage}
                        />
                    </Suspense>
                </div>
            </div>
        </main>
    );
}
