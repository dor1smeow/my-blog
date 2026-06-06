import type { ReactNode } from 'react';

interface AdminPageTitleProps {
    title: string;
    description?: string;
    action?: ReactNode;
}

export function AdminPageTitle({ title, description, action }: AdminPageTitleProps) {
    return (
        <div className="mb-6 flex flex-col gap-4 border-b border-black/6 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
                {description ? <p className="mt-1 text-sm text-gray-500">{description}</p> : null}
            </div>

            {action ? <div>{action}</div> : null}
        </div>
    );
}
