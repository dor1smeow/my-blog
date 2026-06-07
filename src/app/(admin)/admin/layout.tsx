import type { ReactNode } from 'react';

import { AdminHeader } from '@/components/admin/admin-header';
import { AdminSidebar } from '@/components/admin/admin-sidebar';

export const dynamic = 'force-dynamic';

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-stone-100/70 text-gray-900">
            <div className="flex min-h-screen">
                <AdminSidebar />

                <div className="flex min-w-0 flex-1 flex-col">
                    <AdminHeader />

                    <main className="flex-1 p-6">
                        <div className="mx-auto w-full max-w-6xl">{children}</div>
                    </main>
                </div>
            </div>
        </div>
    );
}
