import Link from 'next/link';

const navItems = [
    {
        title: '仪表盘',
        href: '/admin',
    },
    {
        title: '文章管理',
        href: '/admin/posts',
    },
    {
        title: '分类管理',
        href: '/admin/categories',
    },
    {
        title: '标签管理',
        href: '/admin/tags',
    },
];

export function AdminSidebar() {
    return (
        <aside className="hidden w-64 shrink-0 border-r border-black/6 bg-white/88 backdrop-blur md:block">
            <div className="border-b border-black/6 px-6 py-5">
                <Link href="/admin" className="text-lg font-semibold text-gray-900">
                    Blog Admin
                </Link>
            </div>

            <nav className="space-y-1 p-4">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100 hover:text-gray-900"
                    >
                        {item.title}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
