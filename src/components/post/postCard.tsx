import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import type { Post } from '@/server/post/type';

import { Badge } from '@/components/shadcn/ui/badge';
import { Button } from '@/components/shadcn/ui/button';
import { Card, CardContent } from '@/components/shadcn/ui/card';
import { formatPostDate } from '@/lib/post-utils';

interface PostCardProps {
    post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
    const { title, slug, summary, tags, publishedAt, cover } = post;

    return (
        <Card className="h-full overflow-hidden py-0 transition hover:-translate-y-1 hover:shadow-md">
            {cover ? (
                <Image
                    src={cover}
                    alt={title}
                    width={960}
                    height={540}
                    className="h-52 w-full object-cover"
                />
            ) : null}

            <CardContent className="flex h-full flex-col gap-4 p-5">
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                            {tag}
                        </Badge>
                    ))}
                </div>

                <div className="space-y-2.5">
                    <p className="text-sm text-muted-foreground">{formatPostDate(publishedAt)}</p>
                    <h2 className="text-xl font-semibold text-foreground">{title}</h2>
                    <p className="text-sm leading-6 text-muted-foreground">{summary}</p>
                </div>

                <Button variant="ghost" size="sm" asChild className="mt-auto -ml-2 w-fit">
                    <Link href={`/posts/${slug}`}>
                        阅读全文
                        <ArrowRight className="size-4" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
};

export default PostCard;
