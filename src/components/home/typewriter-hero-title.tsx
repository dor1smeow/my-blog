'use client';

import { useEffect, useState } from 'react';

interface TypewriterHeroTitleProps {
    text: string;
    className?: string;
}

export function TypewriterHeroTitle({ text, className }: TypewriterHeroTitleProps) {
    const [visibleText, setVisibleText] = useState('');

    useEffect(() => {
        let currentIndex = 0;
        const timer = window.setInterval(() => {
            currentIndex += 1;
            setVisibleText(text.slice(0, currentIndex));

            if (currentIndex >= text.length) {
                window.clearInterval(timer);
            }
        }, 65);

        return () => window.clearInterval(timer);
    }, [text]);

    return (
        <h1 className={className} aria-label={text}>
            <span aria-hidden="true">{visibleText}</span>
            <span
                aria-hidden="true"
                className="ml-1 inline-block h-[1em] w-[0.08em] animate-pulse rounded-full bg-foreground align-[-0.08em]"
            />
        </h1>
    );
}
