import Link from "next/link"

import Footer from '@/components/layout/footer';
import Container from '@/components/layout/container';
import PostCard from '@/components/post/postCard';

export default function Home() {
  return (
    <div>
      <Container>
        <main>
          {/* 页头 - hero 区域 */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-4">欢迎来到我的博客</h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto">
              我分享关于技术、生活、成长的内容，希望能为你带来一些启发。
            </p>
          </section>

          {/* 最新文章列表 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">最新文章</h2>
            <PostCard />
          </section>

          {/* 查看更多文章按钮 */}
          <section className="text-center mt-8">
            <Link
              href="/posts"
              className="inline-flex bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              查看更多文章 <span aria-hidden="true">→</span>
            </Link>
          </section>

          {/* 标签区域 - 静态内容 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">标签</h2>
            <div className="flex space-x-2">
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded">React</span>
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded">TypeScript</span>
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded">Next.js</span>
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded">编程</span>
            </div>
          </section>

          {/* 今日成果 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">今日成果</h2>
            <div className="p-4 bg-gray-50 rounded">
              <p>今天完成了《React+Tailwind 基础页面设计》教程，并实现了响应式导航栏和页脚组件。</p>
            </div>
          </section>
        </main>
      </Container>
      <Footer />
    </div>
  );
}
