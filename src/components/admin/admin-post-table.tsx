'use client';

import type { PostPaginationMeta } from '@/server/post/type';

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
import { PaginationNav } from '@/components/shared/pagination';

export interface AdminPostTableProps {
    posts: Array<{
        id: string;
        title: string;
        publishedAt?: Date;
        status: 'DRAFT' | 'PUBLISHED';
        category: {
            id: string;
            name: string;
        } | null;
    }>;
    meta: PostPaginationMeta;
}

export function AdminPostTable({ posts, meta }: AdminPostTableProps) {
    return (
        <div className="space-y-4">
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
                    {posts.length ? (
                        posts.map((post) => (
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
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={5}
                                className="py-10 text-center text-muted-foreground"
                            >
                                还没有文章，先去写第一篇吧。
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <div className="flex flex-col gap-3 border-t border-black/6 pt-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                <p>共 {meta.total} 篇文章</p>
                <PaginationNav
                    pathname="/admin/posts"
                    page={meta.page}
                    totalPages={meta.totalPages}
                    hasPrev={meta.hasPrev}
                    hasNext={meta.hasNext}
                />
            </div>
        </div>
    );
}
