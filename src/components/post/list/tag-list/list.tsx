import type { FC } from 'react';

import Link from 'next/link';

import { cn } from '@/lib/utils';

interface TagItem {
    id: string;
    text: string;
}

interface TagListComponentProps {
    active?: string;
    items: TagItem[];
}

export const TagListComponent: FC<TagListComponentProps> = ({ items, active }) => {
    return (
        <div className="flex flex-wrap gap-2">
            {items.map((item) => (
                <Link
                    key={item.id}
                    href={`?tag=${encodeURIComponent(item.text)}`}
                    className={cn(
                        'rounded border px-2 py-1 text-sm text-muted-foreground transition-colors',
                        active === item.text && 'border-foreground text-foreground',
                    )}
                >
                    {item.text}
                </Link>
            ))}
        </div>
    );
};
