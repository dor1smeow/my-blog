import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient, PostStatus } from "@prisma/client"

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error("DATABASE_URL is not set")
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
})

async function main() {
  const frontend = await prisma.category.upsert({
    where: { slug: "frontend" },
    update: {},
    create: {
      name: "前端",
      slug: "frontend"
    }
  })

  const nextTag = await prisma.tag.upsert({
    where: { slug: "nextjs" },
    update: {},
    create: {
      name: "Next.js",
      slug: "nextjs"
    }
  })

  const tsTag = await prisma.tag.upsert({
    where: { slug: "typescript" },
    update: {},
    create: {
      name: "TypeScript",
      slug: "typescript"
    }
  })

  await prisma.post.upsert({
    where: { slug: "build-blog-with-nextjs" },
    update: {},
    create: {
      title: "使用 Next.js 搭建个人博客的开始",
      slug: "build-blog-with-nextjs",
      summary: "记录我从零开始使用 Next.js 搭建个人博客的过程与思考。",
      content: "这是第一篇文章内容。",
      status: PostStatus.PUBLISHED,
      publishedAt: new Date(),
      categoryId: frontend.id,
      tags: {
        create: [
          { tagId: nextTag.id },
          { tagId: tsTag.id }
        ]
      }
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
