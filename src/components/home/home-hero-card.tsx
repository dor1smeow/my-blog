import Link from 'next/link';

import { Badge } from '@/components/shadcn/ui/badge';
import { Button } from '@/components/shadcn/ui/button';

import { TypewriterHeroTitle } from './typewriter-hero-title';

const heroTags = ['Next.js 16', 'Content Platform', 'Frontend Craft'] as const;

const heroActions = [
    { href: '/posts', label: '查看全部文章', variant: 'default' as const },
    { href: '/resume', label: '简历页面', variant: 'outline' as const },
    { href: '/about', label: '关于我', variant: 'outline' as const },
] as const;

export function HomeHeroCard() {
    return (
        <section className="relative overflow-hidden rounded-[2rem] border border-white/40 bg-white/72 px-6 py-10 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl md:px-10 md:py-14">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
            <div className="absolute -left-10 top-10 h-32 w-32 animate-pulse rounded-full bg-amber-200/40 blur-3xl" />
            <div className="absolute right-0 top-0 h-40 w-40 animate-pulse rounded-full bg-orange-200/35 blur-3xl [animation-delay:0.8s]" />
            <div className="absolute -bottom-12 right-12 h-36 w-36 animate-pulse rounded-full bg-sky-200/30 blur-3xl [animation-delay:1.6s]" />

            <div className="relative max-w-3xl space-y-6">
                <p className="animate-in fade-in slide-in-from-bottom-3 text-sm uppercase tracking-[0.28em] text-muted-foreground duration-500">
                    Doris&apos;s notes on frontend work
                </p>

                <TypewriterHeroTitle
                    text="从这里开始，认真做一个会跟着自己一起成长的内容博客。"
                    className="text-2xl font-semibold leading-relaxed tracking-tight text-foreground md:text-4xl"
                />

                <p className="animate-in fade-in slide-in-from-bottom-5 text-base leading-7 text-muted-foreground duration-700 md:max-w-2xl md:text-[1.0625rem]">
                    这里主要记录 React、Next.js、TypeScript、组件设计和内容平台开发。
                    很多东西不是一开始就会，我只是把每次踩坑、返工和慢慢想通的过程留了下来。
                </p>

                <div className="animate-in fade-in slide-in-from-bottom-6 flex flex-wrap gap-2 duration-700">
                    {heroTags.map((tag) => (
                        <Badge
                            key={tag}
                            variant="outline"
                            className="rounded-full bg-white/70 px-3 py-1"
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>

                <div className="animate-in fade-in slide-in-from-bottom-7 flex flex-wrap gap-3 duration-700">
                    {heroActions.map((action) => (
                        <Button
                            key={action.href}
                            variant={action.variant}
                            asChild
                            className={
                                action.variant === 'outline'
                                    ? 'border-white/60 bg-white/70 transition-transform hover:-translate-y-0.5'
                                    : 'transition-transform hover:-translate-y-0.5'
                            }
                        >
                            <Link href={action.href}>{action.label}</Link>
                        </Button>
                    ))}
                </div>
            </div>
        </section>
    );
}
