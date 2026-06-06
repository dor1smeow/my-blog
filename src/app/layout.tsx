import type { Metadata } from 'next';

import '@/app/styles/index.css';
import Footer from '@/components/layout/footer/index';
import { Header } from '@/components/layout/header/index';
import { siteConfig } from '@/lib/site';

import $styles from './layout.module.css';

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
        <html lang="zh-CN" className="font-sans">
            <body className="min-h-screen bg-background text-foreground antialiased">
                <div className={$styles.layout}>
                    <Header />
                    {children}
                    <Footer />
                </div>
            </body>
        </html>
    );
}
