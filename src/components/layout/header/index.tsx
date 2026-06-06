'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';

import $styles from './style.module.css';

const ENTER_SCROLLED_Y = 48;
const EXIT_SCROLLED_Y = 16;

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const isScrolledRef = useRef(isScrolled);

    useEffect(() => {
        let frameId = 0;

        const syncScrollState = () => {
            frameId = 0;

            const nextScrolled = isScrolledRef.current
                ? window.scrollY > EXIT_SCROLLED_Y
                : window.scrollY > ENTER_SCROLLED_Y;

            if (nextScrolled === isScrolledRef.current) {
                return;
            }

            isScrolledRef.current = nextScrolled;
            setIsScrolled(nextScrolled);
        };

        const onScroll = () => {
            if (frameId !== 0) {
                return;
            }

            frameId = window.requestAnimationFrame(syncScrollState);
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            if (frameId !== 0) {
                window.cancelAnimationFrame(frameId);
            }

            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    return (
        <header
            className={cn($styles.header, isScrolled ? $styles.headerScrolled : $styles.headerTop)}
        >
            <div
                className={cn($styles.shell, isScrolled ? $styles.shellScrolled : $styles.shellTop)}
            >
                <div className={$styles.brand}>
                    <Link href="/" className={$styles.brandLink}>
                        <span className={$styles.brandMark} />
                        <span className={$styles.brandText}>{siteConfig.name}</span>
                    </Link>
                </div>

                <nav className={$styles.nav}>
                    {siteConfig.navigation.map((item) => (
                        <Link key={item.href} href={item.href} className={$styles.navLink}>
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className={$styles.actions}>
                    <a
                        className={$styles.githubLink}
                        href={siteConfig.github}
                        target="_blank"
                        rel="noreferrer"
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </header>
    );
};
