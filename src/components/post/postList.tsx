import PostCard from "@/components/post/postCard"
import { cn } from "@/lib/utils"
import type { Post } from "@/types/post"

type PostListProps = {
  posts: Post[]
  className?: string
}

export default function PostList({ posts, className }: PostListProps) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-2", className)}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
