import { publicCategoryApi } from '@/api/public-category';
import { AdminPageTitle } from '@/components/admin/admin-page-title';
import { TaxonomyManager } from '@/components/admin/taxonomy-manager';

export default async function AdminCategoriesPage() {
    const categories = await publicCategoryApi.list();

    return (
        <div>
            <AdminPageTitle
                title="分类管理"
                description="整理站点的内容归档，让文章列表和筛选保持清晰。"
            />

            <TaxonomyManager
                title="分类"
                resourcePath="categories"
                description="分类会出现在文章列表和详情页里，建议保持名称稳定、slug 简洁。"
                emptyText="还没有分类，先补一个常用栏目吧。"
                items={categories}
            />
        </div>
    );
}
