import type { Metadata } from 'next';

import Link from 'next/link';

import Container from '@/components/layout/container';
import { Button } from '@/components/shadcn/ui/button';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
    title: '关于',
    description: '关于这个站点、我正在关注的问题，以及为什么会持续写这些内容。',
};

export default function AboutPage() {
    return (
        <main>
            <Container className="max-w-3xl py-20">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold tracking-tight md:text-4xl">关于我</h1>
                </div>

                <p className="mb-8 text-base leading-7 text-muted-foreground md:text-[1.0625rem]">
                    我主要关注前端工程、界面实现和内容产品开发里的具体问题。
                    这里的文章大多来自我自己做项目时留下来的记录、复盘和整理。
                </p>

                <div className="mb-8 flex items-center gap-3 text-sm text-muted-foreground">
                    <span>更新于 2026-04-29</span>
                    <span>·</span>
                    <span>前端工程 / 内容平台 / 阅读时间：3 分钟</span>
                </div>

                <div className="mb-8 rounded-2xl border border-white/20 bg-white/60 shadow-sm backdrop-blur-xl">
                    <div className="p-6">
                        <h2 className="mb-3 text-xl font-semibold tracking-tight md:text-2xl">
                            我在做什么？
                        </h2>
                        <p className="mb-4">
                            我主要在做前端开发，也会把不少精力放在组件系统、后台管理和内容型网站的结构设计上。
                            这些内容看起来分散，但本质上都在回答同一个问题：怎样把复杂度留在系统内部，把清晰感留给用户。
                        </p>

                        <h3 className="mb-3 text-lg font-semibold tracking-tight md:text-xl">
                            我为什么写这些？
                        </h3>
                        <p className="mb-4">
                            很多项目真正难的地方，不是某个 API 会不会写，
                            而是页面、交互、数据和代码结构能不能一起保持清楚。
                            我写这些文章，是想把自己踩过的坑、做过的取舍和最后留下来的方案整理出来，
                            给未来的自己，也给同样在做这些事的人。
                        </p>

                        <h3 className="mb-3 text-lg font-semibold tracking-tight md:text-xl">
                            最近在关注什么？
                        </h3>
                        <p className="mb-4">
                            这段时间我主要在继续打磨这个站点，也在反复琢磨 App Router、
                            类型边界、后台表单和内容管理这类更贴近真实业务的问题。
                        </p>

                        <h3 className="mb-3 text-lg font-semibold tracking-tight md:text-xl">
                            联系方式
                        </h3>
                        <p>
                            如果你也在做类似方向的内容，欢迎来 GitHub 看看这个项目，
                            或者直接交流想法。
                            <br />
                        </p>
                        <div className="mt-3 flex flex-wrap gap-3">
                            <Button variant="outline" asChild className="rounded-full">
                                <a href={siteConfig.github} target="_blank" rel="noreferrer">
                                    GitHub
                                </a>
                            </Button>
                            <Button variant="outline" asChild className="rounded-full">
                                <Link href="/posts">看文章</Link>
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <Button asChild className="rounded-full px-6">
                        <Link href="/posts">返回文章</Link>
                    </Button>
                </div>
            </Container>
        </main>
    );
}
