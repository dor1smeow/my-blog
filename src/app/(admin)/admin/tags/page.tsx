import { publicTagApi } from '@/api/public-tag';
import { AdminPageTitle } from '@/components/admin/admin-page-title';
import { TaxonomyManager } from '@/components/admin/taxonomy-manager';

export default async function AdminTagsPage() {
    const tags = await publicTagApi.list();

    return (
        <div>
            <AdminPageTitle
                title="标签管理"
                description="维护跨主题标签，方便从不同角度检索相关内容。"
            />

            <TaxonomyManager
                title="标签"
                resourcePath="tags"
                description="标签会参与前台筛选，适合补充技术栈、主题和场景关键词。"
                emptyText="还没有标签，可以先从常写主题开始整理。"
                items={tags}
            />
        </div>
    );
}
