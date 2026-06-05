import type { FC } from 'react';

import Link from 'next/link';

import type { PostItem } from '@/server/post/type';

import $styles from './style.module.css';

const dateFormatter = new Intl.DateTimeFormat('zh-CN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
});

const formatPublishedAt = (value?: string | null) => {
    if (!value) {
        return '未发布';
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return value;
    }
    return dateFormatter.format(date);
};

export const PostList: FC<{ items?: PostItem[] }> = ({ items = [] }) => {
    if (!items.length) {
        return (
            <div className="rounded-[1.5rem] border border-dashed border-black/10 bg-white/70 px-6 py-10 text-center text-sm text-muted-foreground">
                这个筛选条件下还没有文章，换个分类或标签看看。
            </div>
        );
    }

    return (
        <div className={$styles.list}>
            {items.map((item) => (
                <article className={$styles.item} key={item.id}>
                    <div className={$styles.content}>
                        <div className={$styles.metaRow}>
                            <span className={$styles.category}>
                                {item.category?.name ?? '未分类'}
                            </span>
                            <time className={$styles.date} dateTime={item.publishedAt ?? undefined}>
                                {formatPublishedAt(item.publishedAt)}
                            </time>
                        </div>

                        <header className={$styles.header}>
                            {item.slug ? (
                                <Link className={$styles.titleLink} href={`/posts/${item.slug}`}>
                                    <h2 className={$styles.title}>{item.title}</h2>
                                </Link>
                            ) : (
                                <h2 className={$styles.title}>{item.title}</h2>
                            )}
                        </header>

                        <p className={$styles.summary}>
                            {item.summary ?? '这篇文章还没补摘要，可以直接进入正文。'}
                        </p>

                        <footer className={$styles.footer}>
                            <div className={$styles.tags}>
                                {item.tags.slice(0, 3).map((tag) => (
                                    <span className={$styles.tag} key={tag}>
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {item.slug ? (
                                <Link className={$styles.readMore} href={`/posts/${item.slug}`}>
                                    阅读全文
                                </Link>
                            ) : null}
                        </footer>
                    </div>
                </article>
            ))}
        </div>
    );
};
