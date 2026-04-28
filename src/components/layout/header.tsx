import React from 'react';
import Link from 'next/link';
import {Button} from '@/components/ui/button';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="text-base font-semibold tracking-tight">
            Lin's Blog
          </Link>
          <nav className="hidden gap-6 text-sm text-muted-foreground md:flex">
            <Link href="/" className="transition-colors hover:text-foreground">
              首页
            </Link>
            <Link href="/archive" className="transition-colors hover:text-foreground">
              归档
            </Link>
            <Link href="/tags" className="transition-colors hover:text-foreground">
              标签
            </Link>
            <Link href="/about" className="transition-colors hover:text-foreground">
              关于
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="https://github.com">GitHub</Link>
            </Button>
          </div>
        </div>
      </header>
  );
};

export default Header;