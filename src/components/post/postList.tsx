import type { Post } from '@/server/post/type';

import PostCard from '@/components/post/postCard';
import { cn } from '@/lib/utils';

interface PostListProps {
    posts: Post[];
    className?: string;
}

export default function PostList({ posts, className }: PostListProps) {
    return (
        <div className={cn('grid gap-6 md:grid-cols-2', className)}>
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
}
