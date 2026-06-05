export function AdminHeader() {
    return (
        <header className="border-b border-black/6 bg-white/88 backdrop-blur dark:border-white/8 dark:bg-zinc-950/88">
            <div className="flex h-16 items-center justify-between px-6">
                <div>
                    <p className="text-sm text-gray-500 dark:text-zinc-400">后台管理系统</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-white/8 dark:text-zinc-200">
                        Admin
                    </div>
                </div>
            </div>
        </header>
    );
}
