import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CalendarDays, Clock } from 'lucide-react';
import { posts } from '@/data/posts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);

  if (!post) return notFound();

  const readingTime = estimateReadingTime(post.content);

  return (
    <main className="max-w-2xl mx-auto px-6 py-10">
        {/* 文章头部 */}
        <header className="mb-8">
          {/* 标签 */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>

          {/* 标题 */}
          <h1 className="text-3xl font-bold tracking-tight text-foreground leading-snug mb-3">
            {post.title}
          </h1>

          {/* 摘要 */}
          {post.summary && (
            <p className="text-muted-foreground text-base leading-relaxed mb-5">
              {post.summary}
            </p>
          )}

          {/* 元信息 */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-3.5" />
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" />
              约 {readingTime} 分钟阅读
            </span>
          </div>
        </header>

        <Separator className="mb-8" />

        {/* 正文 */}
        <article className="prose">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        {/* 文章尾部 */}
        <div className="mt-14">
          <Separator className="mb-8" />
          <div className="flex flex-wrap gap-1.5 mb-8">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
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
