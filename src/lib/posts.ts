import { PostStatus } from "@prisma/client"

import { posts as staticPosts } from "@/data/posts"
import { mapPost } from "@/lib/mappers"
import { prisma } from "@/lib/prisma"

import type { Post } from "@/types/post"

const postInclude = {
  category: true,
  tags: {
    include: {
      tag: true,
    },
  },
} as const

let isDatabaseAvailable: boolean | null = null
let hasLoggedFallback = false

function getStaticPosts(): Post[] {
  return [...staticPosts].sort(
    (left, right) =>
      new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime()
  )
}

function logFallback(error: unknown) {
  if (hasLoggedFallback) {
    return
  }

  hasLoggedFallback = true
  console.warn("Prisma is unavailable, falling back to local post data.", error)
}

async function tryDatabaseQuery<T>(
  query: () => Promise<T>
): Promise<{ ok: true; value: T } | { ok: false }> {
  if (isDatabaseAvailable === false) {
    return { ok: false }
  }

  try {
    const value = await query()
    isDatabaseAvailable = true
    return { ok: true, value }
  } catch (error) {
    isDatabaseAvailable = false
    logFallback(error)
    return { ok: false }
  }
}

export async function getPosts() {
  const result = await tryDatabaseQuery(() =>
    prisma.post.findMany({
      where: {
        status: PostStatus.PUBLISHED,
      },
      orderBy: {
        publishedAt: "desc",
      },
      include: postInclude,
    })
  )

  if (result.ok) {
    return result.value.map(mapPost)
  }

  return getStaticPosts()
}

export async function getPostBySlug(slug: string) {
  const result = await tryDatabaseQuery(() =>
    prisma.post.findUnique({
      where: {
        slug,
      },
      include: postInclude,
    })
  )

  if (result.ok && result.value) {
    return mapPost(result.value)
  }

  return getStaticPosts().find((post) => post.slug === slug) ?? null
}

export async function getFeaturedPosts(limit = 2) {
  return (await getPosts()).slice(0, limit)
}

export async function getAllTags() {
  return [...new Set((await getPosts()).flatMap((post) => post.tags))].sort(
    (left, right) => left.localeCompare(right, "zh-CN")
  )
}

export function formatPostDate(dateInput: string | Date) {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput)

  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function estimateReadingTime(content: string) {
  const plainText = content.replace(/<[^>]+>/g, " ")
  const words = plainText.trim().split(/\s+/).filter(Boolean).length

  return Math.max(1, Math.ceil(words / 200))
}
