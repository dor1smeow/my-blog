'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import { Button } from '@/components/shadcn/ui/button';

interface ActionButtonsProps {
    post: {
        id: string;
        title: string;
        status: 'DRAFT' | 'PUBLISHED';
    };
}

interface Feedback {
    type: 'success' | 'error';
    message: string;
}

async function handleApiResponse(response: Response, fallbackMessage: string) {
    if (response.ok) {
        return;
    }

    let message = fallbackMessage;

    try {
        const payload = (await response.json()) as { message?: string };
        message = payload.message ?? fallbackMessage;
    } catch {
        message = fallbackMessage;
    }

    throw new Error(message);
}

export function ActionButtons({ post }: ActionButtonsProps) {
    const router = useRouter();
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const [isPending, startTransition] = useTransition();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isTogglingStatus, setIsTogglingStatus] = useState(false);

    const isBusy = isPending || isDeleting || isTogglingStatus;

    async function refreshList() {
        startTransition(() => {
            router.refresh();
        });
    }

    async function handleDelete() {
        const confirmed = window.confirm(`确定删除《${post.title}》吗？此操作不可恢复。`);

        if (!confirmed) {
            return;
        }

        setFeedback(null);
        setIsDeleting(true);

        try {
            const response = await fetch(`/api/posts/${post.id}`, {
                method: 'DELETE',
            });

            await handleApiResponse(response, '删除失败');
            setFeedback({
                type: 'success',
                message: '删除成功',
            });
            await refreshList();
        } catch (error) {
            setFeedback({
                type: 'error',
                message: error instanceof Error ? error.message : '删除失败',
            });
        } finally {
            setIsDeleting(false);
        }
    }

    async function handleToggleStatus() {
        const nextAction = post.status === 'PUBLISHED' ? '下线' : '发布';
        const confirmed = window.confirm(`确定要${nextAction}《${post.title}》吗？`);

        if (!confirmed) {
            return;
        }

        setFeedback(null);
        setIsTogglingStatus(true);

        try {
            const actionPath = post.status === 'PUBLISHED' ? 'unpublish' : 'publish';
            const response = await fetch(`/api/posts/${post.id}/${actionPath}`, {
                method: 'PATCH',
            });

            await handleApiResponse(response, `${nextAction}失败`);
            setFeedback({
                type: 'success',
                message: `${nextAction}成功`,
            });
            await refreshList();
        } catch (error) {
            setFeedback({
                type: 'error',
                message: error instanceof Error ? error.message : `${nextAction}失败`,
            });
        } finally {
            setIsTogglingStatus(false);
        }
    }

    return (
        <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push(`/admin/posts/${post.id}/edit`)}
                    disabled={isBusy}
                >
                    编辑
                </Button>
                <Button variant="ghost" size="sm" onClick={handleDelete} disabled={isBusy}>
                    {isDeleting ? '删除中...' : '删除'}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleToggleStatus} disabled={isBusy}>
                    {isTogglingStatus
                        ? post.status === 'PUBLISHED'
                            ? '下线中...'
                            : '发布中...'
                        : post.status === 'PUBLISHED'
                          ? '下线'
                          : '发布'}
                </Button>
            </div>

            {feedback ? (
                <p
                    className={
                        feedback.type === 'success'
                            ? 'text-xs text-green-600'
                            : 'text-xs text-red-600'
                    }
                >
                    {feedback.message}
                </p>
            ) : null}
        </div>
    );
}
