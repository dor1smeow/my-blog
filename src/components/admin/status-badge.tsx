import { Badge } from '@/components/shadcn/ui/badge';

interface StatusBadgeProps {
    status: 'DRAFT' | 'PUBLISHED';
}

const statusConfig = {
    DRAFT: {
        label: '草稿',
        className: 'bg-slate-100 text-slate-700 hover:bg-slate-100',
    },
    PUBLISHED: {
        label: '已发布',
        className: 'bg-green-100 text-green-700 hover:bg-green-100',
    },
} satisfies Record<
    StatusBadgeProps['status'],
    {
        label: string;
        className: string;
    }
>;

export function StatusBadge({ status }: StatusBadgeProps) {
    const config = statusConfig[status];

    return <Badge className={config.className}>{config.label}</Badge>;
}
