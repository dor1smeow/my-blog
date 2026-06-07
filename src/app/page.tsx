import type { Metadata } from 'next';

import Link from 'next/link';

import { TypewriterHeroTitle } from '@/components/home/typewriter-hero-title';
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
                <section className="relative overflow-hidden rounded-[2rem] border border-white/40 bg-white/72 px-6 py-10 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl md:px-10 md:py-14">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
                    <div className="absolute -left-10 top-10 h-32 w-32 animate-pulse rounded-full bg-amber-200/40 blur-3xl" />
                    <div className="absolute right-0 top-0 h-40 w-40 animate-pulse rounded-full bg-orange-200/35 blur-3xl [animation-delay:0.8s]" />
                    <div className="absolute -bottom-12 right-12 h-36 w-36 animate-pulse rounded-full bg-sky-200/30 blur-3xl [animation-delay:1.6s]" />

                    <div className="relative max-w-3xl space-y-6">
                        <p className="animate-in fade-in slide-in-from-bottom-3 text-sm uppercase tracking-[0.28em] text-muted-foreground duration-500">
                            Doris&apos;s notes on frontend work
                        </p>
                        <TypewriterHeroTitle
                            text="从此地开始，打造属于自己的成长型内容博客。
                                    React/ Typescript / Node.js  "
                            className="text-2xl font-semibold leading-relaxed tracking-tight text-foreground md:text-4xl"
                        />
                        <p className="animate-in fade-in slide-in-from-bottom-5 text-base leading-7 text-muted-foreground duration-700 md:max-w-2xl md:text-[1.0625rem]">
                            这里主要记录 React、Next.js、TypeScript、组件设计和内容平台开发。
                            很多东西不是一开始就会，我只是把每次踩坑、返工和慢慢想通的过程留了下来。
                        </p>

                        <div className="animate-in fade-in slide-in-from-bottom-6 flex flex-wrap gap-2 duration-700">
                            <Badge variant="outline" className="rounded-full bg-white/70 px-3 py-1">
                                Next.js 16
                            </Badge>
                            <Badge variant="outline" className="rounded-full bg-white/70 px-3 py-1">
                                Content Platform
                            </Badge>
                            <Badge variant="outline" className="rounded-full bg-white/70 px-3 py-1">
                                Frontend Craft
                            </Badge>
                        </div>

                        <div className="animate-in fade-in slide-in-from-bottom-7 flex flex-wrap gap-3 duration-700">
                            <Button asChild className="transition-transform hover:-translate-y-0.5">
                                <Link href="/posts">查看全部文章</Link>
                            </Button>
                            <Button
                                variant="outline"
                                asChild
                                className="border-white/60 bg-white/70 transition-transform hover:-translate-y-0.5"
                            >
                                <Link href="/resume">简历页面</Link>
                            </Button>
                            <Button
                                variant="outline"
                                asChild
                                className="border-white/60 bg-white/70 transition-transform hover:-translate-y-0.5"
                            >
                                <Link href="/about">关于我</Link>
                            </Button>
                        </div>
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
