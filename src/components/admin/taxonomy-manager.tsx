'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/shadcn/ui/button';

interface TaxonomyManagerProps {
    description: string;
    emptyText: string;
    resourcePath: 'categories' | 'tags';
    title: string;
    items: Array<{
        id: string;
        name: string;
        slug: string;
        postCount: number;
    }>;
}

function slugify(value: string) {
    return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\u4E00-\u9FA5\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

export function TaxonomyManager({
    description,
    emptyText,
    items,
    resourcePath,
    title,
}: TaxonomyManagerProps) {
    const router = useRouter();
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [hasTouchedSlug, setHasTouchedSlug] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setFeedback(null);
        setIsSubmitting(true);

        try {
            const response = await fetch(`/api/${resourcePath}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name.trim(),
                    slug: slug.trim(),
                }),
            });

            const payload = (await response.json()) as { message?: string };

            if (!response.ok) {
                throw new Error(payload.message ?? `创建${title}失败`);
            }

            setName('');
            setSlug('');
            setHasTouchedSlug(false);
            setFeedback(`${title}创建成功`);
            router.refresh();
        } catch (error) {
            setFeedback(error instanceof Error ? error.message : `创建${title}失败`);
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleDelete(id: string, itemTitle: string, postCount: number) {
        if (postCount > 0) {
            setFeedback(`“${itemTitle}”仍有关联文章，先处理相关文章里的引用再删除`);
            return;
        }

        setFeedback(null);
        setDeletingId(id);

        try {
            const response = await fetch(`/api/${resourcePath}/${id}`, {
                method: 'DELETE',
            });

            const payload = (await response.json()) as { message?: string };
            if (!response.ok) {
                throw new Error(payload.message ?? `删除${title}失败`);
            }

            setFeedback(`${title}删除成功`);
            router.refresh();
        } catch (error) {
            setFeedback(error instanceof Error ? error.message : `删除${title}失败`);
        } finally {
            setDeletingId(null);
        }
    }

    return (
        <div className="space-y-6">
            <section className="rounded-xl border border-black/6 bg-white/88 p-6 shadow-sm">
                <h2 className="text-base font-semibold text-gray-900">新建{title}</h2>
                <p className="mt-2 text-sm leading-6 text-gray-600">{description}</p>

                <form
                    onSubmit={handleCreate}
                    className="mt-5 grid gap-4 md:grid-cols-[1fr_1fr_auto]"
                >
                    <label className="space-y-2 text-sm">
                        <span className="font-medium text-gray-900">名称</span>
                        <input
                            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400"
                            value={name}
                            onChange={(event) => {
                                const nextName = event.target.value;
                                setName(nextName);
                                if (!hasTouchedSlug) {
                                    setSlug(slugify(nextName));
                                }
                            }}
                            placeholder={`输入${title}名称`}
                        />
                    </label>

                    <label className="space-y-2 text-sm">
                        <span className="font-medium text-gray-900">Slug</span>
                        <input
                            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400"
                            value={slug}
                            onChange={(event) => {
                                setHasTouchedSlug(true);
                                setSlug(slugify(event.target.value));
                            }}
                            placeholder={`${resourcePath.slice(0, -1)}-slug`}
                        />
                    </label>

                    <div className="flex items-end">
                        <Button
                            type="submit"
                            disabled={isSubmitting || !name.trim() || !slug.trim()}
                        >
                            {isSubmitting ? '保存中...' : `创建${title}`}
                        </Button>
                    </div>
                </form>

                {feedback ? <p className="mt-4 text-sm text-gray-600">{feedback}</p> : null}
            </section>

            <section className="rounded-xl border border-black/6 bg-white/88 p-6 shadow-sm">
                <h2 className="text-base font-semibold text-gray-900">{title}列表</h2>

                <div className="mt-4 space-y-3">
                    {items.length ? (
                        items.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white/72 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div className="min-w-0">
                                    <p className="font-medium text-gray-900">{item.name}</p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        slug: <span className="font-mono">{item.slug}</span>
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        关联文章 {item.postCount} 篇
                                    </p>
                                </div>

                                <Button
                                    type="button"
                                    variant="outline"
                                    disabled={deletingId === item.id || item.postCount > 0}
                                    onClick={() => handleDelete(item.id, item.name, item.postCount)}
                                >
                                    {deletingId === item.id ? '删除中...' : '删除'}
                                </Button>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-600">{emptyText}</p>
                    )}
                </div>
            </section>
        </div>
    );
}
