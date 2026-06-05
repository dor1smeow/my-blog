'use client';

import Link from 'next/link';

import { Button, buttonVariants } from '@/components/shadcn/ui/button';
import { cn } from '@/lib/utils';

import { buildPaginationHref, getPaginationDisplayPages } from './pagination-utils';

interface PaginationNavProps {
    pathname: string;
    page: number;
    totalPages: number;
    hasPrev: boolean;
    hasNext: boolean;
    query?: Record<string, string | number | undefined>;
    className?: string;
}

export function PaginationNav({
    pathname,
    page,
    totalPages,
    hasPrev,
    hasNext,
    query,
    className,
}: PaginationNavProps) {
    if (totalPages <= 1) {
        return null;
    }

    const pages = getPaginationDisplayPages(page, totalPages);

    return (
        <nav className={cn('flex flex-wrap items-center gap-2', className)} aria-label="分页导航">
            <Button variant="outline" size="sm" asChild={hasPrev} disabled={!hasPrev}>
                {hasPrev ? (
                    <Link href={buildPaginationHref(pathname, page - 1, query)}>上一页</Link>
                ) : (
                    <span>上一页</span>
                )}
            </Button>

            {pages.map((item, index) => {
                const previous = pages[index - 1];
                const shouldShowGap = previous !== undefined && item - previous > 1;

                return (
                    <div key={item} className="flex items-center gap-2">
                        {shouldShowGap ? (
                            <span className="px-1 text-muted-foreground">...</span>
                        ) : null}
                        {item === page ? (
                            <span
                                aria-current="page"
                                className={cn(
                                    buttonVariants({ variant: 'default', size: 'sm' }),
                                    'pointer-events-none',
                                )}
                            >
                                {item}
                            </span>
                        ) : (
                            <Link
                                href={buildPaginationHref(pathname, item, query)}
                                className={buttonVariants({ variant: 'outline', size: 'sm' })}
                            >
                                {item}
                            </Link>
                        )}
                    </div>
                );
            })}

            <Button variant="outline" size="sm" asChild={hasNext} disabled={!hasNext}>
                {hasNext ? (
                    <Link href={buildPaginationHref(pathname, page + 1, query)}>下一页</Link>
                ) : (
                    <span>下一页</span>
                )}
            </Button>
        </nav>
    );
}
