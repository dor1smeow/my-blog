import type { Metadata } from 'next';

import Link from 'next/link';

import Container from '@/components/layout/container';
import { Badge } from '@/components/shadcn/ui/badge';
import { Button } from '@/components/shadcn/ui/button';

export const metadata: Metadata = {
    title: '简历',
    description: '个人简历页，包含就读大学信息和博客项目简介。',
};

export default function ResumePage() {
    return (
        <main>
            <Container className="max-w-4xl py-16 md:py-20">
                <section className="space-y-6">
                    <div className="space-y-3">
                        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                            Resume
                        </p>
                        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                            个人简历
                        </h1>
                        <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-[1.0625rem]">
                            这个页面用来集中展示学习背景和项目经历，方便在投递、面试或项目介绍时快速说明自己的方向和代表作品。
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Next.js 16</Badge>
                        <Badge variant="outline">Hono</Badge>
                        <Badge variant="outline">Prisma</Badge>
                        <Badge variant="outline">PostgreSQL</Badge>
                    </div>
                </section>

                <section className="mt-10 rounded-2xl border border-white/20 bg-white/60 p-6 shadow-sm backdrop-blur-xl md:p-8">
                    <h2 className="text-xl font-semibold tracking-tight md:text-2xl">教育经历</h2>
                    <div className="mt-6 space-y-3">
                        <p className="text-lg font-medium">就读大学：“双一流”高校南京师范大学</p>
                    </div>
                </section>

                <section className="mt-8 rounded-2xl border border-white/20 bg-white/60 p-6 shadow-sm backdrop-blur-xl md:p-8">
                    <h2 className="text-xl font-semibold tracking-tight md:text-2xl">项目简介</h2>
                    <div className="mt-6 space-y-4 leading-7 text-foreground/90">
                        <p>
                            这是一个基于 Next.js App Router、Hono、Prisma 和 PostgreSQL
                            实现的博客内容平台，包含前台文章展示和后台内容管理两条主链路。
                        </p>
                        <p>
                            前台部分支持首页展示、文章列表、文章详情、分类筛选和标签筛选；
                            后台部分支持文章创建、编辑、发布、下线，以及分类和标签管理。
                        </p>
                        <p>
                            这个项目的重点不只是把页面做出来，而是把页面层、组件层、API 层、
                            服务层和数据库层的职责拆清楚，形成一条真实可维护的开发链路。
                        </p>
                    </div>
                </section>

                <section className="mt-8 rounded-2xl border border-white/20 bg-white/60 p-6 shadow-sm backdrop-blur-xl md:p-8">
                    <h2 className="text-xl font-semibold tracking-tight md:text-2xl">技术亮点</h2>
                    <ul className="mt-6 space-y-3 text-sm leading-6 text-muted-foreground md:text-base">
                        <li>
                            使用 Next.js App Router 组织页面结构，并结合 Server Component
                            处理页面级数据。
                        </li>
                        <li>
                            通过 Hono 统一承接 API 路由，配合 Zod 校验输入输出，保证接口边界更清晰。
                        </li>
                        <li>
                            使用 Prisma
                            管理数据库访问和数据关系，支持文章、分类、标签之间的关联维护。
                        </li>
                        <li>
                            后台功能覆盖创建、编辑、发布和筛选等常见内容管理场景，主链路已经形成闭环。
                        </li>
                    </ul>
                </section>

                <div className="mt-10 flex flex-wrap gap-3">
                    <Button asChild>
                        <Link href="/posts">查看文章</Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/about">关于我</Link>
                    </Button>
                </div>
            </Container>
        </main>
    );
}
