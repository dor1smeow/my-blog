import type { Post } from "@/types/post"

export const posts: Post[] = [
  {
    id: "1",
    title: "我的第一篇博客",
    slug: "my-first-post",
    summary: "这是我的第一篇博客摘要",
    content: "这是文章正文内容。",
    cover: "/covers/1.jpg",
    publishedAt: "2025-01-01",
    tags: ["Next.js", "React"]
  },
  {
    id: "2",
    title: "学习 TypeScript 的感受",
    slug: "learn-typescript",
    summary: "TypeScript 能让代码更稳定",
    content: "这里是 TypeScript 文章正文。",
    cover: "/covers/2.jpg",
    publishedAt: "2025-01-02",
    tags: ["TypeScript"]
  }
]


