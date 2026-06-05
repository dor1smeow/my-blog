'use client';

import type { FC, PropsWithChildren, ReactNode } from 'react';

import $styles from './style.module.css';

interface SidebarWidgetProps extends PropsWithChildren {
    title: ReactNode;
}

export const SidebarWidget: FC<SidebarWidgetProps> = ({ title, children }) => {
    return (
        <section className={$styles.widget}>
            <div className={$styles.title}>{title}</div>
            <div className={$styles.content}>{children}</div>
        </section>
    );
};
