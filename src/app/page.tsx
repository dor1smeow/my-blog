import type { Metadata } from 'next';

import Link from 'next/link';

import { HomeHeroCard } from '@/components/home/home-hero-card';
import Container from '@/components/layout/container';
import { LatestPosts } from '@/components/post/latest-posts';
import { Badge } from '@/components/shadcn/ui/badge';
import { Button } from '@/components/shadcn/ui/button';

export const metadata: Metadata = {
    title: '首页',
    description: '记录前端开发、组件设计和内容产品实现里的实践与复盘。',
};

export default async function Home() {
    return (
        <main>
            <Container className="py-12 md:py-16">
                <HomeHeroCard />

                <section className="mt-16 space-y-6">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
                                最新文章
                            </h2>
                            <p className="mt-2 text-sm text-muted-foreground">
                                最近更新的两篇文章，基本都来自这段时间做项目时的记录和复盘。
                            </p>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/posts">全部文章</Link>
                        </Button>
                    </div>

                    <LatestPosts />
                </section>

                <section className="mt-16 space-y-4">
                    <h2 className="text-xl font-semibold tracking-tight md:text-2xl">常写主题</h2>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Next.js</Badge>
                        <Badge variant="outline">React</Badge>
                        <Badge variant="outline">TypeScript</Badge>
                        <Badge variant="outline">组件设计</Badge>
                    </div>
                </section>
            </Container>
        </main>
    );
}
