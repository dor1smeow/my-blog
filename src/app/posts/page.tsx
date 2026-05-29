import type { Metadata } from 'next';

import Container from '@/components/layout/container';
import PostList from '@/components/post/postList';
import { Badge } from '@/components/shadcn/ui/badge';
import { getAllTags, getPosts } from '@/lib/posts';

export const metadata: Metadata = {
    title: '文章',
    description: '所有文章都集中在这里，按同一套卡片和数据结构展示。',
};

export default async function PostsPage() {
    const [posts, tags] = await Promise.all([getPosts(), getAllTags()]);

    return (
        <main>
            <Container className="py-16">
                <header className="max-w-3xl space-y-4">
                    <h1 className="text-4xl font-semibold tracking-tight">文章</h1>
                    <p className="text-lg leading-8 text-muted-foreground">
                        所有文章都共用同一套数据结构和展示组件，页面层只负责组合，不再内嵌额外假数据。
                    </p>
                </header>

                <div className="mt-8 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                            {tag}
                        </Badge>
                    ))}
                </div>

                <PostList posts={posts} className="mt-10 xl:grid-cols-3" />
            </Container>
        </main>
    );
}
