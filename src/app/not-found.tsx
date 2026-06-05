import Link from 'next/link';

import { Button } from '@/components/shadcn/ui/button';

export default function NotFoundPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
            <p className="text-sm text-muted-foreground">404</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">页面不存在</h1>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
                你访问的内容可能已被删除，或者链接地址不正确。
            </p>
            <Button asChild className="mt-6 rounded-full">
                <Link href="/">返回首页</Link>
            </Button>
        </main>
    );
}
