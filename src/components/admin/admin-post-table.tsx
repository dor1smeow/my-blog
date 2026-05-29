'use client';
import { ActionButtons } from '@/components/admin/action-buttons';
import { StatusBadge } from '@/components/admin/status-badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/shadcn/ui/table';

export interface AdminPostTableProps {
    posts: Array<{
        id: string;
        title: string;
        slug: string;
        summary: string;
        publishedAt?: Date;
        status: 'DRAFT' | 'PUBLISHED';
        createdAt: Date;
        categoryId: string | null;
        category: {
            id: string;
            name: string;
        } | null;
        tags: Array<{
            id: string;
            name: string;
        }>;
    }>;
}

export function AdminPostTable({ posts }: AdminPostTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>标题</TableHead>
                    <TableHead>分类</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>发布日期</TableHead>
                    <TableHead>操作</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {posts.map((post) => (
                    <TableRow key={post.id}>
                        <TableCell className="font-medium">{post.title}</TableCell>
                        <TableCell>{post.category?.name ?? '未分类'}</TableCell>
                        <TableCell>
                            <StatusBadge status={post.status} />
                        </TableCell>
                        <TableCell>
                            {post.publishedAt ? post.publishedAt.toDateString() : '未发布'}
                        </TableCell>
                        <TableCell>
                            <ActionButtons post={post} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
