import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "关于",
  description: "这个博客主要写什么，为什么会以这种结构来组织内容。",
}

import Container from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site"

export default function AboutPage() {
  return (
    <main>
      <Container className="max-w-3xl py-20">
        <div className="mb-6">
          <h1 className="text-4xl font-bold tracking-tight">关于我</h1>
        </div>

        <p className="text-lg leading-8 text-muted-foreground mb-8">
          我是一个前端开发者，专注于现代前端技术、UI 系统设计和优秀的用户体验。
          这里是我分享技术理解、设计思考与个人项目的地方。
        </p>

        <div className="mb-8 flex items-center gap-3 text-sm text-muted-foreground">
          <span>2026-04-29</span>
          <span>·</span>
          <span>技术 & 设计 | 前端开发者 | 阅读时间：3分钟</span>
        </div>

        <div className="mb-8 rounded-2xl border border-white/20 bg-white/60 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
          <div className="p-6">
            <h2 className="text-2xl font-semibold tracking-tight mb-3">我是谁？</h2>
            <p className="mb-4">
              我是一个热爱前端开发和产品设计的自由开发者。
              每篇文章都试图用最小的设计表达最清晰的思考。
            </p>

            <h3 className="text-xl font-semibold tracking-tight mb-3">我的目标</h3>
            <p className="mb-4">
              通过技术分享和思考，建立一个更清晰、简洁、易于阅读的平台。
              技术不是炫耀，而是为了让世界变得更简单一点。
            </p>

            <h3 className="text-xl font-semibold tracking-tight mb-3">我在学什么？</h3>
            <p className="mb-4">
              最近我在研究 Next.js 16 的 App Router，以及如何在现代前端构建结构稳定、内容优先的网站。
            </p>

            <h3 className="text-xl font-semibold tracking-tight mb-3">联系方式</h3>
            <p>
              可以联系我：{siteConfig.email}
              <br />
              <Button variant="outline" asChild className="mt-2 rounded-full">
                <a href={`mailto:${siteConfig.email}`}>发送邮件</a>
              </Button>
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <Button asChild className="rounded-full px-6">
            <Link href="/posts">← 返回文章</Link>
          </Button>
        </div>
      </Container>
    </main>
  )
}
