import type { Metadata } from 'next';

import { ArrowLeft, CalendarDays, Clock } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Badge } from '@/components/shadcn/ui/badge';
import { Button } from '@/components/shadcn/ui/button';
import { Separator } from '@/components/shadcn/ui/separator';
import { estimateReadingTime, formatPostDate } from '@/lib/post-utils';
import { getPostBySlug, getPosts } from '@/lib/posts';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    return (await getPosts()).map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: '文章不存在',
            description: '你访问的文章不存在或已被删除。',
        };
    }

    return {
        title: post.title,
        description: post.summary,
    };
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) return notFound();

    const readingTime = estimateReadingTime(post.content);

    return (
        <main className="max-w-2xl mx-auto px-6 py-10">
            <header className="mb-8">
                <div className="mb-5 flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                            {tag}
                        </Badge>
                    ))}
                </div>

                <h1 className="mb-3 text-3xl font-bold leading-snug tracking-tight text-foreground">
                    {post.title}
                </h1>

                <p className="mb-5 text-base leading-relaxed text-muted-foreground">
                    {post.summary}
                </p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                        <CalendarDays className="size-3.5" />
                        <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Clock className="size-3.5" />约 {readingTime} 分钟阅读
                    </span>
                </div>
            </header>

            <Separator className="mb-8" />

            <article className="prose">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>

            <div className="mt-14">
                <Separator className="mb-8" />
                <div className="mb-8 flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                            {tag}
                        </Badge>
                    ))}
                </div>
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/posts">
                        <ArrowLeft className="size-4" />
                        返回所有文章
                    </Link>
                </Button>
            </div>
        </main>
    );
}
