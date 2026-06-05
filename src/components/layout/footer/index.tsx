import Link from 'next/link';

import Container from '@/components/layout/container';
import { siteConfig } from '@/lib/site';

const currentYear = new Date().getFullYear();

export default function Footer() {
    return (
        <footer className="border-t bg-muted/30">
            <Container>
                <div className="flex flex-col gap-3 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
                    <p>
                        © {currentYear} {siteConfig.name}. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <Link href="/about" className="transition-colors hover:text-foreground">
                            关于我
                        </Link>
                        <a
                            href={`mailto:${siteConfig.email}`}
                            className="transition-colors hover:text-foreground"
                        >
                            {siteConfig.email}
                        </a>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
