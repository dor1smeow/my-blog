import { publicCategoryApi } from '@/api/public-category';
import { publicPostApi } from '@/api/public-post';
import { publicTagApi } from '@/api/public-tag';
import { PaginationNav } from '@/components/shared/pagination';

import { PostList } from './item';
import { BlogSidebar } from './sidebar';
import $styles from './style.module.css';

interface BlogIndexPageProps {
    currentCategory?: string;
    currentTag?: string;
    currentPage: number;
}

export const BlogIndexPage = async ({
    currentCategory,
    currentTag,
    currentPage,
}: BlogIndexPageProps) => {
    const [postResult, categories, tags] = await Promise.all([
        publicPostApi.list({
            page: currentPage,
            pageSize: 6,
            category: currentCategory,
            tag: currentTag,
        }),
        publicCategoryApi.list(),
        publicTagApi.list(),
    ]);

    return (
        <section className={$styles.section}>
            <div className={$styles.blogIndex}>
                <div className={$styles.mobileSidebar}>
                    <BlogSidebar
                        categories={categories}
                        currentCategory={currentCategory}
                        tags={tags}
                        currentTag={currentTag}
                        showAbout={false}
                    />
                </div>
                <div className={$styles.container}>
                    <PostList items={postResult.data} />
                    <PaginationNav
                        className={$styles.pagination}
                        pathname="/posts"
                        page={postResult.meta.page}
                        totalPages={postResult.meta.totalPages}
                        hasPrev={postResult.meta.hasPrev}
                        hasNext={postResult.meta.hasNext}
                        query={
                            currentCategory
                                ? {
                                      category: currentCategory,
                                      ...(currentTag ? { tag: currentTag } : {}),
                                  }
                                : currentTag
                                  ? { tag: currentTag }
                                  : undefined
                        }
                    />
                </div>
                <div className={$styles.desktopSidebar}>
                    <BlogSidebar
                        categories={categories}
                        currentCategory={currentCategory}
                        tags={tags}
                        currentTag={currentTag}
                    />
                </div>
            </div>
        </section>
    );
};
