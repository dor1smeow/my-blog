import { Folder } from 'lucide-react';

import { publicCategoryApi } from '@/api/public-category';

import { SidebarWidget } from '../sidebar/widget';
import { CategoryListComponent } from './list';

interface CategoryListWidgetProps {
    active?: string;
}

export const CategoryListWidget = async ({ active }: CategoryListWidgetProps) => {
    const categories = await publicCategoryApi.list();

    return (
        <SidebarWidget
            title={
                <>
                    <Folder className="h-4 w-4" />
                    <span>分类</span>
                </>
            }
        >
            <CategoryListComponent items={categories} active={active} />
        </SidebarWidget>
    );
};
