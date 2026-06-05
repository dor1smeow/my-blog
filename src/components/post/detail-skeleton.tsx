import { Skeleton } from '@/components/shadcn/ui/skeleton';

export function PostDetailSkeleton() {
    return (
        <article className="mx-auto max-w-3xl space-y-8" aria-hidden="true">
            <div className="flex flex-wrap items-center gap-2">
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-40" />
            </div>

            <header className="space-y-5">
                <div className="flex flex-wrap items-center gap-2.5">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-28" />
                </div>

                <div className="space-y-3">
                    <Skeleton className="h-10 w-[78%]" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-[86%]" />
                </div>

                <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-14 rounded-full" />
                </div>
            </header>

            <Skeleton className="h-px w-full rounded-none" />

            <div className="space-y-4">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-[95%]" />
                <Skeleton className="h-5 w-[88%]" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-[84%]" />
                <Skeleton className="h-5 w-[92%]" />
                <Skeleton className="h-5 w-[76%]" />
            </div>

            <div className="pt-2">
                <Skeleton className="h-9 w-28 rounded-lg" />
            </div>
        </article>
    );
}
