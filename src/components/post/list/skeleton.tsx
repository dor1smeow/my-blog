import { Skeleton } from '@/components/shadcn/ui/skeleton';

import $styles from './style.module.css';

const postSkeletonKeys = Array.from({ length: 6 }, (_, index) => `post-skeleton-${index}`);

function SidebarSkeleton() {
    return (
        <div className="space-y-5" aria-hidden="true">
            <div className="rounded-[1.5rem] border border-black/8 bg-white/82 p-5 shadow-[0_16px_36px_rgba(15,23,42,0.07)] ring-1 ring-white/70 backdrop-blur-xl">
                <Skeleton className="h-4 w-20" />
                <div className="mt-4 space-y-2.5">
                    <Skeleton className="h-9 w-full rounded-xl" />
                    <Skeleton className="h-9 w-[88%] rounded-xl" />
                    <Skeleton className="h-9 w-[76%] rounded-xl" />
                </div>
            </div>

            <div className="rounded-[1.5rem] border border-black/8 bg-white/82 p-5 shadow-[0_16px_36px_rgba(15,23,42,0.07)] ring-1 ring-white/70 backdrop-blur-xl">
                <Skeleton className="h-4 w-16" />
                <div className="mt-4 flex flex-wrap gap-2">
                    <Skeleton className="h-7 w-16 rounded-full" />
                    <Skeleton className="h-7 w-20 rounded-full" />
                    <Skeleton className="h-7 w-14 rounded-full" />
                    <Skeleton className="h-7 w-24 rounded-full" />
                    <Skeleton className="h-7 w-[4.5rem] rounded-full" />
                </div>
            </div>
        </div>
    );
}

function PostCardSkeleton() {
    return (
        <article className={$styles.item} aria-hidden="true">
            <div className={$styles.content}>
                <div className={$styles.metaRow}>
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-4 w-20" />
                </div>

                <div className={$styles.header}>
                    <Skeleton className="h-7 w-[68%]" />
                </div>

                <div className="space-y-2.5">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[92%]" />
                    <Skeleton className="h-4 w-[70%]" />
                </div>

                <div className={$styles.footer}>
                    <div className={$styles.tags}>
                        <Skeleton className="h-6 w-14 rounded-full" />
                        <Skeleton className="h-6 w-20 rounded-full" />
                        <Skeleton className="h-6 w-16 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-16" />
                </div>
            </div>
        </article>
    );
}

export function BlogIndexSkeleton() {
    return (
        <section className={$styles.section}>
            <div className={$styles.blogIndex}>
                <div className={$styles.mobileSidebar}>
                    <SidebarSkeleton />
                </div>

                <div className={$styles.container}>
                    <div className={$styles.list}>
                        {postSkeletonKeys.map((key) => (
                            <PostCardSkeleton key={key} />
                        ))}
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-2" aria-hidden="true">
                        <Skeleton className="h-8 w-16 rounded-lg" />
                        <Skeleton className="h-8 w-10 rounded-lg" />
                        <Skeleton className="h-8 w-10 rounded-lg" />
                        <Skeleton className="h-8 w-16 rounded-lg" />
                    </div>
                </div>

                <div className={$styles.desktopSidebar}>
                    <SidebarSkeleton />
                </div>
            </div>
        </section>
    );
}
