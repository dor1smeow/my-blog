import type { Metadata } from 'next';

import Script from 'next/script';

import '@/app/styles/index.css';
import Footer from '@/components/layout/footer/index';
import { Header } from '@/components/layout/header/index';
import { siteConfig } from '@/lib/site';

import $styles from './layout.module.css';

const themeScript = `
(() => {
    const storageKey = 'doris-theme';
    const storedTheme = window.localStorage.getItem(storageKey);
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = storedTheme === 'dark' || storedTheme === 'light'
        ? storedTheme
        : (systemDark ? 'dark' : 'light');

    document.documentElement.classList.toggle('dark', theme === 'dark');
})();
`;

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
        default: siteConfig.title,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh-CN" className="font-sans" suppressHydrationWarning>
            <body className="min-h-screen bg-background text-foreground antialiased">
                <Script id="theme-script" strategy="beforeInteractive">
                    {themeScript}
                </Script>
                <div className={$styles.layout}>
                    <Header />
                    {children}
                    <Footer />
                </div>
            </body>
        </html>
    );
}
