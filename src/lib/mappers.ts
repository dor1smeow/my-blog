import type { Prisma } from "@prisma/client"

import type { Post } from "@/types/post"

const DEFAULT_COVER = "/covers/nextjs-16-layout.svg"

export type PostRecord = Prisma.PostGetPayload<{
  include: {
    category: true
    tags: {
      include: {
        tag: true
      }
    }
  }
}>

export function mapPost(post: PostRecord): Post {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    summary: post.summary,
    content: post.content,
    cover: post.cover ?? DEFAULT_COVER,
    publishedAt: (post.publishedAt ?? post.createdAt).toISOString(),
    tags: post.tags.map(({ tag }) => tag.name),
  }
}
