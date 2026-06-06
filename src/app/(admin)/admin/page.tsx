import Link from 'next/link';

import { AdminPageTitle } from '@/components/admin/admin-page-title';

const cards = [
    {
        title: '文章管理',
        description: '撰写、编辑并调整文章发布状态',
        href: '/admin/posts',
    },
    {
        title: '分类管理',
        description: '整理栏目结构，保持文章归档清晰',
        href: '/admin/categories',
    },
    {
        title: '标签管理',
        description: '维护检索标签，方便跨主题聚合',
        href: '/admin/tags',
    },
];

export default function AdminHomePage() {
    return (
        <div>
            <AdminPageTitle
                title="内容后台"
                description="统一处理文章、分类和标签，保持前台内容和后台数据一致。"
            />

            <section className="mb-8 rounded-xl border border-black/6 bg-white/88 p-6 shadow-sm">
                <h2 className="text-lg font-medium text-gray-900">内容概览</h2>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                    这里主要处理文章发布、分类整理和标签维护。后台的改动会直接影响前台列表、筛选和详情页展示，所以我把常用操作都集中在这里。
                </p>
            </section>

            <section>
                <h2 className="mb-4 text-lg font-medium text-gray-900">模块入口</h2>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {cards.map((card) => (
                        <Link
                            key={card.href}
                            href={card.href}
                            className="rounded-xl border border-black/6 bg-white/88 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
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
