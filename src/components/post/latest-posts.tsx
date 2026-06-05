import Link from 'next/link';

import { publicPostApi } from '@/api/public-post';
import { Badge } from '@/components/shadcn/ui/badge';
import { formatPostDate } from '@/lib/post-utils';

export async function LatestPosts() {
    const result = await publicPostApi.list({
        page: 1,
        pageSize: 2,
    });

    if (!result.data.length) {
        return (
            <div className="rounded-2xl border border-dashed border-black/10 bg-white/70 px-6 py-10 text-center text-sm text-muted-foreground">
                最近还没有更新文章。
            </div>
        );
    }

    return (
        <div className="grid gap-4 lg:grid-cols-2">
            {result.data.map((post) => (
                <article
                    key={post.id}
                    className="rounded-[1.5rem] border border-black/8 bg-white/85 p-5 shadow-[0_16px_36px_rgba(15,23,42,0.07)] ring-1 ring-white/70 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1"
                >
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        {post.category ? (
                            <Badge variant="outline" className="rounded-full px-3">
                                {post.category.name}
                            </Badge>
                        ) : null}
                        {post.publishedAt ? (
                            <time dateTime={post.publishedAt}>
                                {formatPostDate(post.publishedAt)}
                            </time>
                        ) : null}
                    </div>

                    <div className="mt-4 space-y-3">
                        {post.slug ? (
                            <Link href={`/posts/${post.slug}`} className="block">
                                <h3 className="text-lg font-semibold tracking-tight transition-colors hover:text-black md:text-xl">
                                    {post.title}
                                </h3>
                            </Link>
                        ) : (
                            <h3 className="text-lg font-semibold tracking-tight md:text-xl">
                                {post.title}
                            </h3>
                        )}

                        <p className="text-sm leading-7 text-muted-foreground">
                            {post.summary ?? '这篇文章还没补摘要，可以直接进入正文。'}
                        </p>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-black/8 pt-4">
                        <div className="flex flex-wrap gap-2">
                            {post.tags.slice(0, 2).map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full bg-stone-900/6 px-3 py-1 text-xs text-stone-700"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {post.slug ? (
                            <Link
                                href={`/posts/${post.slug}`}
                                className="text-sm font-medium text-foreground transition-colors hover:text-black"
                            >
                                阅读全文
                            </Link>
                        ) : null}
                    </div>
                </article>
            ))}
        </div>
    );
}
