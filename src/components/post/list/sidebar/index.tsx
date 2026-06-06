import Link from 'next/link';

import { Badge } from '@/components/shadcn/ui/badge';
import { cn } from '@/lib/utils';

import $styles from './style.module.css';

interface BlogSidebarProps {
    className?: string;
    currentCategory?: string;
    currentTag?: string;
    categories: Array<{
        name: string;
        slug: string;
    }>;
    tags: Array<{
        id: string;
        name: string;
        slug: string;
    }>;
    showAbout?: boolean;
}

function buildPostsFilterHref(filters: { category?: string; tag?: string }) {
    const searchParams = new URLSearchParams();

    if (filters.category) {
        searchParams.set('category', filters.category);
    }

    if (filters.tag) {
        searchParams.set('tag', filters.tag);
    }

    const query = searchParams.toString();
    return query ? `/posts?${query}` : '/posts';
}

export const BlogSidebar = ({
    categories,
    currentCategory,
    currentTag,
    tags,
    className,
    showAbout = true,
}: BlogSidebarProps) => {
    return (
        <aside className={cn($styles.sidebar, className)}>
            <div className="space-y-6 lg:sticky lg:top-16">
                {showAbout ? (
                    <div className="rounded-xl border border-black/6 bg-white/88 p-6 shadow-sm">
                        <h2 className="mb-4 text-base font-semibold tracking-tight md:text-lg">
                            关于本站
                        </h2>
                        <p className="text-sm leading-6 text-muted-foreground">
                            这里主要记录我在做前端项目时的实现过程、取舍和复盘。
                            <br />
                            内容会持续围绕 React、Next.js、TypeScript 和界面系统更新。
                        </p>
                    </div>
                ) : null}

                <div className="rounded-xl border border-black/6 bg-white/88 p-6 shadow-sm">
                    <h2 className="mb-4 text-base font-semibold tracking-tight md:text-lg">分类</h2>
                    <ul className={$styles.categoryList}>
                        <li>
                            <Link
                                href={buildPostsFilterHref({ tag: currentTag })}
                                aria-current={!currentCategory ? 'page' : undefined}
                                className={cn(
                                    $styles.categoryLink,
                                    !currentCategory && $styles.categoryLinkActive,
                                )}
                            >
                                全部
                            </Link>
                        </li>
                        {categories.map((category) => (
                            <li key={category.slug}>
                                <Link
                                    href={buildPostsFilterHref({
                                        category: category.slug,
                                        tag: currentTag,
                                    })}
                                    aria-current={
                                        currentCategory === category.slug ? 'page' : undefined
                                    }
                                    className={cn(
                                        $styles.categoryLink,
                                        currentCategory === category.slug &&
                                            $styles.categoryLinkActive,
                                    )}
                                >
                                    {category.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="rounded-xl border border-black/6 bg-white/88 p-6 shadow-sm">
                    <h2 className="mb-4 text-base font-semibold tracking-tight md:text-lg">
                        标签云
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        <Badge asChild variant={!currentTag ? 'secondary' : 'outline'}>
                            <Link href={buildPostsFilterHref({ category: currentCategory })}>
                                全部标签
                            </Link>
                        </Badge>
                        {tags.map((tag) => (
                            <Badge
                                key={tag.id}
                                asChild
                                variant={currentTag === tag.slug ? 'secondary' : 'outline'}
                            >
                                <Link
                                    href={buildPostsFilterHref({
                                        category: currentCategory,
                                        tag: tag.slug,
                                    })}
                                >
                                    {tag.name}
                                </Link>
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
};
