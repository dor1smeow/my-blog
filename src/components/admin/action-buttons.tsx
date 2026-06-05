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

type PendingAction = null | 'delete' | 'toggle-status';

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
    const [pendingAction, setPendingAction] = useState<PendingAction>(null);

    const isBusy = isPending || isDeleting || isTogglingStatus;
    const nextStatusAction = post.status === 'PUBLISHED' ? '下线' : '发布';

    async function refreshList() {
        startTransition(() => {
            router.refresh();
        });
    }

    async function handleDelete() {
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
            setPendingAction(null);
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
        setFeedback(null);
        setIsTogglingStatus(true);

        try {
            const actionPath = post.status === 'PUBLISHED' ? 'unpublish' : 'publish';
            const response = await fetch(`/api/posts/${post.id}/${actionPath}`, {
                method: 'PATCH',
            });

            await handleApiResponse(response, `${nextStatusAction}失败`);
            setFeedback({
                type: 'success',
                message: `${nextStatusAction}成功`,
            });
            setPendingAction(null);
            await refreshList();
        } catch (error) {
            setFeedback({
                type: 'error',
                message: error instanceof Error ? error.message : `${nextStatusAction}失败`,
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
                    disabled={isBusy || pendingAction !== null}
                >
                    编辑
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setPendingAction('delete')}
                    disabled={isBusy || pendingAction !== null}
                >
                    {isDeleting ? '删除中...' : '删除'}
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setPendingAction('toggle-status')}
                    disabled={isBusy || pendingAction !== null}
                >
                    {isTogglingStatus
                        ? post.status === 'PUBLISHED'
                            ? '下线中...'
                            : '发布中...'
                        : post.status === 'PUBLISHED'
                          ? '下线'
                          : '发布'}
                </Button>
            </div>

            {pendingAction ? (
                <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
                    <p>
                        {pendingAction === 'delete'
                            ? `确认删除《${post.title}》吗？此操作不可恢复。`
                            : `确认要${nextStatusAction}《${post.title}》吗？`}
                    </p>
                    <div className="mt-2 flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={pendingAction === 'delete' ? handleDelete : handleToggleStatus}
                            disabled={isBusy}
                        >
                            确认
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setPendingAction(null)}
                            disabled={isBusy}
                        >
                            取消
                        </Button>
                    </div>
                </div>
            ) : null}

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
