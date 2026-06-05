import Container from '@/components/layout/container';
import { PostDetailSkeleton } from '@/components/post/detail-skeleton';

export default function PostDetailLoading() {
    return (
        <main>
            <Container className="py-16">
                <PostDetailSkeleton />
            </Container>
        </main>
    );
}
