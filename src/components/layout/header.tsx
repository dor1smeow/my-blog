import Link from 'next/link';

import Container from '@/components/layout/container';
import { Button } from '@/components/shadcn/ui/button';
import { siteConfig } from '@/lib/site';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
            <Container className="flex h-16 items-center justify-between">
                <Link href="/" className="text-base font-semibold tracking-tight">
                    {siteConfig.name}
                </Link>
                <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
                    {siteConfig.navigation.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="transition-colors hover:text-foreground"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <Button variant="ghost" size="sm" asChild>
                    <a href={siteConfig.github} target="_blank" rel="noreferrer">
                        GitHub
                    </a>
                </Button>
            </Container>
        </header>
    );
}
