import type { FC } from 'react';

import Link from 'next/link';

import { cn } from '@/lib/utils';

interface CategoryItem {
    id: string;
    name: string;
    slug: string;
}

interface CategoryListComponentProps {
    active?: string;
    items: CategoryItem[];
}

export const CategoryListComponent: FC<CategoryListComponentProps> = ({ items, active }) => {
    return (
        <ul className="space-y-2">
            {items.map((item) => (
                <li key={item.id}>
                    <Link
                        href={`/posts?category=${item.slug}`}
                        className={cn(
                            'inline-flex w-full items-center rounded-lg border border-transparent px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-black/8 hover:bg-black/[0.03] hover:text-foreground',
                            active === item.slug &&
                                'border-amber-300/50 bg-amber-50 text-foreground',
                        )}
                    >
                        {item.name}
                    </Link>
                </li>
            ))}
        </ul>
    );
};
