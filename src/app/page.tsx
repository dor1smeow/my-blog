import type { Metadata } from 'next';

import Link from 'next/link';

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
            <Container className="py-16 md:py-20">
                <section className="max-w-3xl space-y-6">
                    <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                        Doris&apos;s notes on frontend work
                    </p>
                    <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                        把项目里真正遇到的问题、做过的取舍，认真写下来。
                    </h1>
                    <p className="text-base leading-7 text-muted-foreground md:text-[1.0625rem]">
                        这里主要记录 React、Next.js、TypeScript、组件设计和内容平台开发。
                        很多文章都来自这个站点本身的迭代，也来自日常项目里反复会碰到的问题。
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Button asChild>
                            <Link href="/posts">查看全部文章</Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/resume">简历页面</Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/about">关于我</Link>
                        </Button>
                    </div>
                </section>

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
