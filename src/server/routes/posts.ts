import { Hono } from "hono"
import { prisma } from "@/lib/prisma"
import { createPostSchema, updatePostSchema } from "@/server/schemas/post"
const postsRouter = new Hono()

postsRouter.get("/", async (c) => {
  const posts = await prisma.post.findMany({
    where: {
      status: "PUBLISHED"
    },
    orderBy: {
      publishedAt: "desc"
    },
    include: {
      category: true,
      tags: {
        include: {
          tag: true
        }
      }
    }
  })

  return c.json({
    success: true,
    data: posts
  })
})

postsRouter.get("/:slug", async (c) => {
  const slug = c.req.param("slug")
  const post = await prisma.post.findFirst({
    where: {
      slug,
      status: "PUBLISHED"
    },
    include: {
      category: true,
      tags: {
        include: {
          tag: true
        }
      }
    }
  })
  if (!post) {
    return c.json(
      {
        success: false,
        message: "文章不存在"
      },
      404
    )
  }
  return c.json({
    success: true,
    data: post
  })
})

postsRouter.post("/", async (c) => {
  const body = await c.req.json()
  const parsed = createPostSchema.safeParse(body)
  if (!parsed.success) {
    return c.json(
      {
        success: false,
        message: "参数校验失败",
        errors: parsed.error.flatten()
      },
      400
    )
  }
  const data = parsed.data
  const post = await prisma.post.create({
    data: {
      title: data.title,
      slug: data.slug,
      summary: data.summary,
      content: data.content,
      cover: data.cover,
      status: data.status,
      publishedAt: data.status === "PUBLISHED" ? new Date() : null,
      categoryId: data.categoryId,
      tags: {
        create: data.tagIds.map((tagId) => ({
          tagId
        }))
      }
    },
    include: {
      category: true,
      tags: {
        include: { tag: true }
      }
    }
  })
  return c.json(
    {
      success: true,
      data: post
    },
    201
  )
})

postsRouter.patch("/:id", async (c) => {
  const id = c.req.param("id")
  const body = await c.req.json()
  const parsed = updatePostSchema.safeParse(body)

  if (!parsed.success) {
    return c.json(
      {
        success: false,
        message: "参数校验失败",
        errors: parsed.error.flatten()
      },
      400
    )
  }

  const data = parsed.data

  const existing = await prisma.post.findUnique({
    where: { id }
  })

  if (!existing) {
    return c.json(
      {
        success: false,
        message: "文章不存在"
      },
      404
    )
  }

  const post = await prisma.post.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug,
      summary: data.summary,
      content: data.content,
      cover: data.cover,
      status: data.status,
      publishedAt:
        data.status === "PUBLISHED" && !existing.publishedAt
          ? new Date()
          : existing.publishedAt
    }
  })

  if (data.tagIds) {
    await prisma.postTag.deleteMany({
      where: { postId: id }
    })

    await prisma.postTag.createMany({
      data: data.tagIds.map((tagId) => ({
        postId: id,
        tagId
      }))
    })
  }

  return c.json({
    success: true,
    data: post
  })
})

postsRouter.delete("/:id", async (c) => {
  const id = c.req.param("id")

  const existing = await prisma.post.findUnique({
    where: { id }
  })

  if (!existing) {
    return c.json(
      {
        success: false,
        message: "文章不存在"
      },
      404
    )
  }

  await prisma.post.delete({
    where: { id }
  })

  return c.json({
    success: true,
    message: "删除成功"
  })
})

postsRouter.patch("/:id/publish", async (c) => {
  const id = c.req.param("id")

  const existing = await prisma.post.findUnique({
    where: { id }
  })

  if (!existing) {
    return c.json({ success: false, message: "文章不存在" }, 404)
  }

  const post = await prisma.post.update({
    where: { id },
    data: {
      status: "PUBLISHED",
      publishedAt: existing.publishedAt ?? new Date()
    }
  })

  return c.json({
    success: true,
    data: post
  })
})

postsRouter.patch("/:id/unpublish", async (c) => {
  const id = c.req.param("id")

  const existing = await prisma.post.findUnique({
    where: { id }
  })

  if (!existing) {
    return c.json({ success: false, message: "文章不存在" }, 404)
  }

  const post = await prisma.post.update({
    where: { id },
    data: {
      status: "DRAFT"
    }
  })

  return c.json({
    success: true,
    data: post
  })
})


export default postsRouter