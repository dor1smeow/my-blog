import { BlogIndexSkeleton } from '@/components/post/list/skeleton';
import { Skeleton } from '@/components/shadcn/ui/skeleton';

export default function PostsLoading() {
    return (
        <main>
            <div className="mx-auto w-full max-w-[88rem] px-5 py-16 md:px-8 xl:px-10">
                <div className="flex w-full min-w-0 flex-col">
                    <header className="max-w-2xl space-y-3">
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </header>

                    <BlogIndexSkeleton />
                </div>
            </div>
        </main>
    );
}
