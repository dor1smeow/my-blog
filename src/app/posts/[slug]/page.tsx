import type { Metadata } from 'next';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { publicPostApi } from '@/api/public-post';
import Container from '@/components/layout/container';
import { PostDetailSkeleton } from '@/components/post/detail-skeleton';
import { PostBreadcrumb } from '@/components/post/post-breadcrumb';
import { Badge } from '@/components/shadcn/ui/badge';
import { Button } from '@/components/shadcn/ui/button';
import { Separator } from '@/components/shadcn/ui/separator';
import { estimateReadingTime, formatPostDate } from '@/lib/post-utils';
import { siteConfig } from '@/lib/site';

interface PostDetailPageProps {
    params: Promise<{
        slug: string;
    }>;
}

async function getPublishedPost(slug: string) {
    const post = await publicPostApi.detailBySlug(slug);

    if (!post || post.status !== 'PUBLISHED') {
        return null;
    }

    return post;
}

function formatContent(content: string) {
    return content
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);
}

export async function generateMetadata({ params }: PostDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPublishedPost(slug);

    if (!post) {
        return {
            title: '文章不存在',
        };
    }

    return {
        title: post.title,
        description: post.summary ?? siteConfig.description,
    };
}

async function PostDetailContent({ slug }: { slug: string }) {
    const post = await getPublishedPost(slug);

    if (!post) {
        notFound();
    }

    const paragraphs = formatContent(post.content);
    const publishedLabel = post.publishedAt ? formatPostDate(post.publishedAt) : '未发布';
    const readingTime = estimateReadingTime(post.content);

    return (
        <article className="mx-auto max-w-3xl space-y-8">
            <PostBreadcrumb currentLabel={post.title} />

            <header className="space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                    {post.category ? (
                        <Badge variant="outline" className="rounded-full px-3">
                            {post.category.name}
                        </Badge>
                    ) : null}
                    <span className="text-sm text-muted-foreground">{publishedLabel}</span>
                    <span className="text-sm text-muted-foreground">阅读约 {readingTime} 分钟</span>
                </div>

                <div className="space-y-3">
                    <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                        {post.title}
                    </h1>
                    <p className="text-base leading-7 text-muted-foreground md:text-[1.0625rem]">
                        {post.summary ?? '这篇文章没有单独摘要，下面直接进入正文。'}
                    </p>
                </div>

                {post.tags.length ? (
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="rounded-full">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                ) : null}
            </header>

            <Separator />

            <div className="space-y-5 text-[15px] leading-8 text-foreground md:text-base">
                {paragraphs.map((paragraph) => (
                    <p key={`${post.id}-${paragraph.slice(0, 24)}-${paragraph.length}`}>
                        {paragraph}
                    </p>
                ))}
            </div>

            <footer className="flex flex-wrap items-center gap-3 pt-2">
                <Button asChild variant="outline">
                    <Link href="/posts">返回文章列表</Link>
                </Button>
            </footer>
        </article>
    );
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
    const { slug } = await params;

    return (
        <main>
            <Container className="py-16">
                <Suspense key={slug} fallback={<PostDetailSkeleton />}>
                    <PostDetailContent slug={slug} />
                </Suspense>
            </Container>
        </main>
    );
}
