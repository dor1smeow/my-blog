import Link from 'next/link';

import { AdminPageTitle } from '@/components/admin/admin-page-title';

const cards = [
    {
        title: '文章管理',
        description: '创建、编辑、发布和删除文章',
        href: '/admin/posts',
    },
    {
        title: '分类管理',
        description: '维护文章分类结构',
        href: '/admin/categories',
    },
    {
        title: '标签管理',
        description: '维护文章标签',
        href: '/admin/tags',
    },
];

export default function AdminHomePage() {
    return (
        <div>
            <AdminPageTitle
                title="仪表盘"
                description="欢迎来到博客后台，这里将逐步完成内容管理能力。"
            />

            <section className="mb-8 rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="text-lg font-medium text-gray-900">欢迎回来</h2>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                    你已经完成了 API 阶段的基础建设，现在进入后台管理界面开发阶段。
                    接下来你会逐步实现文章列表、创建文章、编辑文章、分类管理和标签管理。
                </p>
            </section>

            <section>
                <h2 className="mb-4 text-lg font-medium text-gray-900">模块入口</h2>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {cards.map((card) => (
                        <Link
                            key={card.href}
                            href={card.href}
                            className="rounded-xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                            <h3 className="text-base font-semibold text-gray-900">{card.title}</h3>
                            <p className="mt-2 text-sm text-gray-600">{card.description}</p>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
