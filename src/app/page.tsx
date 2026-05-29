import type { Metadata } from 'next';

import Link from 'next/link';

import Container from '@/components/layout/container';
import PostList from '@/components/post/postList';
import { Badge } from '@/components/shadcn/ui/badge';
import { Button } from '@/components/shadcn/ui/button';


export const metadata: Metadata = {
    title: '首页',
    description: '这里记录前端开发、设计系统与内容型网站构建的实践。',
};

export default async function Home() {
    

    return (
        <main>
            <Container className="py-16 md:py-20">
                <section className="max-w-3xl space-y-6">
                    <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                        Personal notes on frontend systems
                    </p>
                    <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                        用更清晰的结构写内容，也用更清晰的结构维护网站。
                    </h1>
                    <p className="text-lg leading-8 text-muted-foreground">
                        这里主要记录 Next.js、TypeScript、设计系统和内容型产品的实现细节，
                        重点不是堆功能，而是让页面结构和代码结构同时保持干净。
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Button asChild>
                            <Link href="/posts">查看全部文章</Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/about">关于我</Link>
                        </Button>
                    </div>
                </section>

                <section className="mt-16 space-y-6">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-semibold tracking-tight">最新文章</h2>
                            <p className="mt-2 text-sm text-muted-foreground">
                                最近完成的几篇整理，都是围绕博客结构、类型边界和组件复用。
                            </p>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/posts">全部文章</Link>
                        </Button>
                    </div>
                    
                </section>

                <section className="mt-16 space-y-4">
                    <h2 className="text-2xl font-semibold tracking-tight">常写主题</h2>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Next.js</Badge>
                    </div>
                </section>
            </Container>
        </main>
    );
}
