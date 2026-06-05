import { Tag } from 'lucide-react';

import { SidebarWidget } from '../sidebar/widget';
import { TagListComponent } from './list';

interface TagItem {
    id: string;
    text: string;
}

interface TagListWidgetProps {
    active?: string;
}

export const TagListWidget = ({ active }: TagListWidgetProps) => {
    const tags: TagItem[] = [
        { id: '1', text: 'React' },
        { id: '2', text: 'Next.js' },
    ];

    return (
        <SidebarWidget
            title={
                <>
                    <Tag className="h-4 w-4" />
                    <span>标签</span>
                </>
            }
        >
            <TagListComponent items={tags} active={active} />
        </SidebarWidget>
    );
};
