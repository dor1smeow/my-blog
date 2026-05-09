import { z } from "zod"

export const createPostSchema = z.object({
  title: z.string().min(1, "标题不能为空"),
  slug: z.string().min(1, "slug 不能为空"),
  summary: z.string().min(1, "摘要不能为空"),
  content: z.string().min(1, "内容不能为空"),
  cover: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  categoryId: z.string().optional(),
  tagIds: z.array(z.string()).default([])
})
export const updatePostSchema = createPostSchema.partial()