import type { Metadata } from 'next'
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/header";
import "@/app/globals.css";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
    title: "Lin's Blog",
    description: '分享技术、生活与成长',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="zh-CN" className={cn("font-sans", inter.variable)}>
            <body className="min-h-screen bg-background text-foreground">
                <Header />
                {children}
            </body>
        </html>
    )
}