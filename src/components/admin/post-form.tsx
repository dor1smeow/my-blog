'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/shadcn/ui/button';

interface Option {
    id: string;
    name: string;
    slug: string;
}

interface PostFormValues {
    title: string;
    slug: string;
    summary: string;
    content: string;
    cover: string;
    status: 'DRAFT' | 'PUBLISHED';
    categoryId: string;
    tagIds: string[];
}

interface PostFormProps {
    mode: 'create' | 'edit';
    initialValues?: Partial<PostFormValues>;
    categories: Option[];
    tags: Option[];
    postId?: string;
}

type FieldErrors = Partial<Record<keyof PostFormValues, string>>;

const fieldClassName =
    'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400';

const labelClassName = 'font-medium text-gray-900';

const defaultValues: PostFormValues = {
    title: '',
    slug: '',
    summary: '',
    content: '',
    cover: '',
    status: 'DRAFT',
    categoryId: '',
    tagIds: [],
};

function slugify(value: string) {
    return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\u4E00-\u9FA5\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

export function PostForm({ mode, initialValues, categories, tags, postId }: PostFormProps) {
    const router = useRouter();
    const [values, setValues] = useState<PostFormValues>({
        ...defaultValues,
        ...initialValues,
        tagIds: initialValues?.tagIds ?? [],
    });
    const [errors, setErrors] = useState<FieldErrors>({});
    const [feedback, setFeedback] = useState<{
        type: 'success' | 'error';
        message: string;
    } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasTouchedSlug, setHasTouchedSlug] = useState(Boolean(initialValues?.slug));

    function updateField<Key extends keyof PostFormValues>(key: Key, value: PostFormValues[Key]) {
        setValues((current) => ({
            ...current,
            [key]: value,
        }));

        setErrors((current) => ({
            ...current,
            [key]: undefined,
        }));
    }

    function validateForm() {
        const nextErrors: FieldErrors = {};

        if (!values.title.trim()) {
            nextErrors.title = '请输入标题';
        }

        if (!values.slug.trim()) {
            nextErrors.slug = '请输入 slug';
        }

        if (!values.summary.trim()) {
            nextErrors.summary = '请输入摘要';
        }

        if (!values.content.trim()) {
            nextErrors.content = '请输入内容';
        }

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setFeedback(null);

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            if (mode === 'edit' && !postId) {
                throw new Error('缺少文章 ID，无法保存编辑内容');
            }

            const response = await fetch(
                mode === 'create' ? '/api/posts' : `/api/posts/${postId}`,
                {
                    method: mode === 'create' ? 'POST' : 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title: values.title.trim(),
                        slug: values.slug.trim(),
                        summary: values.summary.trim(),
                        content: values.content.trim(),
                        cover: values.cover.trim() || undefined,
                        status: values.status,
                        categoryId: values.categoryId || undefined,
                        tagIds: values.tagIds,
                    }),
                },
            );

            const payload = (await response.json()) as {
                message?: string;
                errors?: {
                    fieldErrors?: Record<string, string[] | undefined>;
                };
            };

            if (!response.ok) {
                const fieldErrors = payload.errors?.fieldErrors;

                if (fieldErrors) {
                    setErrors({
                        title: fieldErrors.title?.[0],
                        slug: fieldErrors.slug?.[0],
                        summary: fieldErrors.summary?.[0],
                        content: fieldErrors.content?.[0],
                        cover: fieldErrors.cover?.[0],
                        status: fieldErrors.status?.[0],
                        categoryId: fieldErrors.categoryId?.[0],
                        tagIds: fieldErrors.tagIds?.[0],
                    });
                }

                throw new Error(payload.message ?? '保存失败');
            }

            setFeedback({
                type: 'success',
                message: mode === 'create' ? '文章创建成功' : '文章保存成功',
            });

            if (mode === 'create') {
                router.push('/admin/posts');
            } else {
                router.refresh();
            }
        } catch (error) {
            setFeedback({
                type: 'error',
                message: error instanceof Error ? error.message : '保存失败',
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
                <label className="space-y-2 text-sm">
                    <span className={labelClassName}>标题</span>
                    <input
                        className={fieldClassName}
                        value={values.title}
                        onChange={(event) => {
                            const nextTitle = event.target.value;

                            setValues((current) => ({
                                ...current,
                                title: nextTitle,
                                slug: hasTouchedSlug ? current.slug : slugify(nextTitle),
                            }));

                            setErrors((current) => ({
                                ...current,
                                title: undefined,
                                slug: hasTouchedSlug ? current.slug : undefined,
                            }));
                        }}
                        placeholder="输入文章标题"
                    />
                    {errors.title ? <p className="text-xs text-red-600">{errors.title}</p> : null}
                </label>

                <label className="space-y-2 text-sm">
                    <span className={labelClassName}>Slug</span>
                    <input
                        className={fieldClassName}
                        value={values.slug}
                        onChange={(event) => {
                            setHasTouchedSlug(true);
                            updateField('slug', slugify(event.target.value));
                        }}
                        placeholder="post-slug"
                    />
                    {errors.slug ? <p className="text-xs text-red-600">{errors.slug}</p> : null}
                </label>
            </div>

            <label className="block space-y-2 text-sm">
                <span className={labelClassName}>摘要</span>
                <textarea
                    className={`min-h-24 ${fieldClassName}`}
                    value={values.summary}
                    onChange={(event) => updateField('summary', event.target.value)}
                    placeholder="输入文章摘要"
                />
                {errors.summary ? <p className="text-xs text-red-600">{errors.summary}</p> : null}
            </label>

            <label className="block space-y-2 text-sm">
                <span className={labelClassName}>内容</span>
                <textarea
                    className={`min-h-64 ${fieldClassName}`}
                    value={values.content}
                    onChange={(event) => updateField('content', event.target.value)}
                    placeholder="先把正文写完整，排版和细节可以后面再补"
                />
                {errors.content ? <p className="text-xs text-red-600">{errors.content}</p> : null}
            </label>

            <div className="grid gap-6 md:grid-cols-3">
                <label className="space-y-2 text-sm">
                    <span className={labelClassName}>封面</span>
                    <input
                        className={fieldClassName}
                        value={values.cover}
                        onChange={(event) => updateField('cover', event.target.value)}
                        placeholder="/covers/example.svg"
                    />
                </label>

                <label className="space-y-2 text-sm">
                    <span className={labelClassName}>状态</span>
                    <select
                        className={fieldClassName}
                        value={values.status}
                        onChange={(event) =>
                            updateField('status', event.target.value as PostFormValues['status'])
                        }
                    >
                        <option value="DRAFT">草稿</option>
                        <option value="PUBLISHED">已发布</option>
                    </select>
                </label>

                <label className="space-y-2 text-sm">
                    <span className={labelClassName}>分类</span>
                    <select
                        className={fieldClassName}
                        value={values.categoryId}
                        onChange={(event) => updateField('categoryId', event.target.value)}
                    >
                        <option value="">未分类</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {errors.categoryId ? (
                        <p className="text-xs text-red-600">{errors.categoryId}</p>
                    ) : null}
                </label>
            </div>

            <fieldset className="space-y-3">
                <legend className="text-sm font-medium text-gray-900">标签</legend>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {tags.map((tag) => {
                        const checked = values.tagIds.includes(tag.id);

                        return (
                            <label
                                key={tag.id}
                                className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white/70 px-3 py-2 text-sm text-gray-800"
                            >
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={(event) => {
                                        updateField(
                                            'tagIds',
                                            event.target.checked
                                                ? [...values.tagIds, tag.id]
                                                : values.tagIds.filter((tagId) => tagId !== tag.id),
                                        );
                                    }}
                                />
                                <span>{tag.name}</span>
                            </label>
                        );
                    })}
                </div>
                {errors.tagIds ? <p className="text-xs text-red-600">{errors.tagIds}</p> : null}
            </fieldset>

            {feedback ? (
                <p
                    className={
                        feedback.type === 'success'
                            ? 'text-sm text-green-600'
                            : 'text-sm text-red-600'
                    }
                >
                    {feedback.message}
                </p>
            ) : null}

            <div className="flex gap-3">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting
                        ? mode === 'create'
                            ? '创建中...'
                            : '保存中...'
                        : mode === 'create'
                          ? '创建文章'
                          : '保存文章'}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push('/admin/posts')}
                    disabled={isSubmitting}
                >
                    取消
                </Button>
            </div>
        </form>
    );
}
