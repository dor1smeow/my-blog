import { PrismaPg } from '@prisma/adapter-pg';
import { PostStatus, PrismaClient } from '@prisma/client';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('DATABASE_URL is not set');
}

const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
});

interface SeedPost {
    where: { slug: string };
    create: {
        title: string;
        slug: string;
        summary: string;
        content: string;
        status: PostStatus;
        publishedAt?: Date;
        categoryId: string;
        tags: {
            connect: Array<{ id: string }>;
        };
    };
}

function connectTags(tagIds: string[]) {
    return {
        connect: tagIds.map((id) => ({ id })),
    };
}

function joinParagraphs(...paragraphs: string[]) {
    return paragraphs.join('\n\n');
}

function expandPublishedContent(title: string, summary: string, focus: string) {
    return joinParagraphs(
        `${summary} 这篇文章围绕《${title}》展开，不追求一次把所有技巧堆满，而是先把问题、边界和目标交代清楚。`,
        `${focus} 真正开始实现时，我会先把页面层、交互层、接口层和数据层的职责拆开，再决定哪些逻辑应该复用，哪些状态应该只留在当前上下文里。`,
        '如果你是后来回看这篇内容的人，可以把它当成一次实现复盘：先理解为什么这样设计，再回头看每一层分别承担了什么责任，最后再决定哪些点值得继续抽象或增强。',
    );
}

function expandDraftContent(title: string, summary: string, focus: string) {
    return joinParagraphs(
        `${summary} 这篇《${title}》目前还停留在草稿阶段，所以重点不是把细节一次写满，而是先把问题范围、预期结构和要验证的主链路记下来。`,
        `${focus} 我通常会先列出当前已知结论，再标出还没有想清楚的地方，这样后续继续补内容时不会把旧思路完全推翻。`,
        '保留这类草稿还有一个作用：它能帮助我在后台管理里验证草稿状态、列表排序和分页行为是否正常，同时也让后续正式成文时有稳定的起点。',
    );
}

async function main() {
    const frontend = await prisma.category.upsert({
        where: { slug: 'frontend' },
        update: {},
        create: {
            name: '前端',
            slug: 'frontend',
        },
    });
    const engineering = await prisma.category.upsert({
        where: { slug: 'engineering' },
        update: {},
        create: {
            name: '工程',
            slug: 'engineering',
        },
    });
    const notes = await prisma.category.upsert({
        where: { slug: 'notes' },
        update: {},
        create: {
            name: '随笔',
            slug: 'notes',
        },
    });

    const nextTag = await prisma.tag.upsert({
        where: { slug: 'nextjs' },
        update: {},
        create: {
            name: 'Next.js',
            slug: 'nextjs',
        },
    });

    const tsTag = await prisma.tag.upsert({
        where: { slug: 'typescript' },
        update: {},
        create: {
            name: 'TypeScript',
            slug: 'typescript',
        },
    });
    const reactTag = await prisma.tag.upsert({
        where: { slug: 'react' },
        update: {},
        create: {
            name: 'React',
            slug: 'react',
        },
    });
    const prismaTag = await prisma.tag.upsert({
        where: { slug: 'prisma' },
        update: {},
        create: {
            name: 'Prisma',
            slug: 'prisma',
        },
    });
    const architectureTag = await prisma.tag.upsert({
        where: { slug: 'architecture' },
        update: {},
        create: {
            name: '架构',
            slug: 'architecture',
        },
    });
    const writingTag = await prisma.tag.upsert({
        where: { slug: 'writing' },
        update: {},
        create: {
            name: '写作',
            slug: 'writing',
        },
    });

    const basePosts: SeedPost[] = [
        {
            where: { slug: 'build-blog-with-nextjs' },
            create: {
                title: '使用 Next.js 搭建个人博客的开始',
                slug: 'build-blog-with-nextjs',
                summary: '记录我从零开始使用 Next.js 搭建个人博客的过程与思考。',
                content: '这是第一篇文章内容，主要记录项目初始化、路由结构和页面组织方式。',
                status: PostStatus.PUBLISHED,
                publishedAt: new Date('2026-06-01T09:00:00+08:00'),
                categoryId: frontend.id,
                tags: {
                    connect: [{ id: nextTag.id }, { id: tsTag.id }],
                },
            },
        },
        {
            where: { slug: 'designing-server-boundaries' },
            create: {
                title: '给博客项目划清服务端边界',
                slug: 'designing-server-boundaries',
                summary: '为什么页面、API、数据访问层要各自承担清晰职责。',
                content:
                    '这篇示例文章强调页面负责展示，Hono 负责接口，Prisma 负责落库，避免跨层直接耦合。',
                status: PostStatus.PUBLISHED,
                publishedAt: new Date('2026-05-28T20:30:00+08:00'),
                categoryId: engineering.id,
                tags: {
                    connect: [{ id: architectureTag.id }, { id: prismaTag.id }],
                },
            },
        },
        {
            where: { slug: 'react-form-state-notes' },
            create: {
                title: 'React 表单状态管理的一些实用笔记',
                slug: 'react-form-state-notes',
                summary: '整理后台表单里加载态、禁用态、成功失败提示的处理方式。',
                content:
                    '这是一篇偏实战的示例文章，讨论如何在 React 表单里收敛状态、错误和提交反馈。',
                status: PostStatus.PUBLISHED,
                publishedAt: new Date('2026-05-21T14:15:00+08:00'),
                categoryId: frontend.id,
                tags: {
                    connect: [{ id: reactTag.id }, { id: tsTag.id }],
                },
            },
        },
        {
            where: { slug: 'draft-writing-plan-for-blog' },
            create: {
                title: '博客内容规划草稿',
                slug: 'draft-writing-plan-for-blog',
                summary: '先列出准备写的主题，再决定哪些值得展开成正式文章。',
                content:
                    '这是一篇草稿示例，用来验证后台是否能同时处理 DRAFT 和 PUBLISHED 两种文章状态。',
                status: PostStatus.DRAFT,
                categoryId: notes.id,
                tags: {
                    connect: [{ id: writingTag.id }],
                },
            },
        },
        {
            where: { slug: 'nextjs-app-router-segments' },
            create: {
                title: 'App Router 里的路由分段怎么拆更顺手',
                slug: 'nextjs-app-router-segments',
                summary: '从博客结构出发，整理 App Router 里页面、布局和分组的拆分方式。',
                content: '这一篇主要记录页面分组、布局边界和路由命名的取舍。',
                status: PostStatus.PUBLISHED,
                publishedAt: new Date('2026-05-18T10:00:00+08:00'),
                categoryId: frontend.id,
                tags: connectTags([nextTag.id, architectureTag.id]),
            },
        },
        {
            where: { slug: 'server-component-data-flow' },
            create: {
                title: '把 Server Component 的数据流收干净',
                slug: 'server-component-data-flow',
                summary: '避免页面层堆逻辑，改成只做数据组织和展示组合。',
                content: '核心是让页面只关心搜索参数、展示结构和组件拼装。',
                status: PostStatus.PUBLISHED,
                publishedAt: new Date('2026-05-16T09:30:00+08:00'),
                categoryId: engineering.id,
                tags: connectTags([nextTag.id, architectureTag.id]),
            },
        },
        {
            where: { slug: 'typescript-form-value-normalization' },
            create: {
                title: '表单提交前先做一层 TypeScript 数据归一化',
                slug: 'typescript-form-value-normalization',
                summary: '把输入值先整理成稳定结构，再交给接口层验证。',
                content: '这样表单字段、接口 schema 和数据库层的边界会更清楚。',
                status: PostStatus.PUBLISHED,
                publishedAt: new Date('2026-05-14T15:20:00+08:00'),
                categoryId: frontend.id,
                tags: connectTags([tsTag.id, reactTag.id]),
            },
        },
        {
            where: { slug: 'prisma-query-shaping-for-list-pages' },
            create: {
                title: '列表页里怎么写 Prisma 查询才不容易失控',
                slug: 'prisma-query-shaping-for-list-pages',
                summary: '把 where、排序和分页参数收口到 service 层。',
                content: '这篇文章聚焦列表查询的结构化写法，而不是页面里直接拼数据库条件。',
                status: PostStatus.PUBLISHED,
                publishedAt: new Date('2026-05-12T11:40:00+08:00'),
                categoryId: engineering.id,
                tags: connectTags([prismaTag.id, architectureTag.id]),
            },
        },
        {
            where: { slug: 'content-summary-writing-patterns' },
            create: {
                title: '写博客摘要时，我会固定先写哪三件事',
                slug: 'content-summary-writing-patterns',
                summary: '摘要不是复制正文第一段，而是交代主题、问题和结果。',
                content: '这是一篇偏写作方法论的示例文章，用来补足随笔分类的数据量。',
                status: PostStatus.PUBLISHED,
                publishedAt: new Date('2026-05-10T08:10:00+08:00'),
                categoryId: notes.id,
                tags: connectTags([writingTag.id]),
            },
        },
        {
            where: { slug: 'admin-table-feedback-states' },
            create: {
                title: '后台表格操作里的反馈状态怎么设计',
                slug: 'admin-table-feedback-states',
                summary: '删除、发布、下线操作都应该有清晰的禁用态和提示。',
                content: '重点是把用户操作后的页面刷新闭环补完整。',
                status: PostStatus.PUBLISHED,
                publishedAt: new Date('2026-05-08T18:00:00+08:00'),
                categoryId: frontend.id,
                tags: connectTags([reactTag.id, architectureTag.id]),
            },
        },
        {
            where: { slug: 'category-filter-query-design' },
            create: {
                title: '分类筛选和分页一起做时，查询参数应该怎么设计',
                slug: 'category-filter-query-design',
                summary: '先定义 query 结构，再决定页面和接口怎么对齐。',
                content: '如果分页和分类筛选分两边处理，很容易出现结果数量和页码错位。',
                status: PostStatus.PUBLISHED,
                publishedAt: new Date('2026-05-06T13:50:00+08:00'),
                categoryId: engineering.id,
                tags: connectTags([architectureTag.id, tsTag.id]),
            },
        },
        {
            where: { slug: 'nextjs-metadata-notes' },
            create: {
                title: '给文章页补 Metadata 时要注意的几个细节',
                slug: 'nextjs-metadata-notes',
                summary: '标题、描述和 canonical 建议在页面层统一组织。',
                content: '这篇文章主要记录动态页面里 metadata 的组织方式。',
                status: PostStatus.PUBLISHED,
                publishedAt: new Date('2026-05-04T16:25:00+08:00'),
                categoryId: frontend.id,
                tags: connectTags([nextTag.id]),
            },
        },
        {
            where: { slug: 'post-list-empty-state-design' },
            create: {
                title: '列表空态不是一句没数据就结束',
                slug: 'post-list-empty-state-design',
                summary: '空态要告诉用户当前筛选条件，以及下一步能做什么。',
                content: '这里用博客列表作为例子，梳理空态组件的职责边界。',
                status: PostStatus.PUBLISHED,
                publishedAt: new Date('2026-05-03T09:45:00+08:00'),
                categoryId: notes.id,
                tags: connectTags([writingTag.id, reactTag.id]),
            },
        },
        {
            where: { slug: 'route-handler-vs-hono-notes' },
            create: {
                title: 'Route Handler 和 Hono 在这个项目里怎么分工',
                slug: 'route-handler-vs-hono-notes',
                summary: 'Route Handler 只做接入，业务逻辑集中在 Hono 里。',
                content: '这样页面层、本地分发和接口文档都能共用同一套路由实现。',
                status: PostStatus.PUBLISHED,
                publishedAt: new Date('2026-05-01T12:15:00+08:00'),
                categoryId: engineering.id,
                tags: connectTags([architectureTag.id, nextTag.id]),
            },
        },
        {
            where: { slug: 'prisma-seed-strategy-for-blog' },
            create: {
                title: '博客项目里我会怎样组织 Prisma Seed',
                slug: 'prisma-seed-strategy-for-blog',
                summary: '既要可重复执行，也要方便补测试数据。',
                content: '文章重点是如何用 upsert 保证本地 seed 多次执行仍然稳定。',
                status: PostStatus.PUBLISHED,
                publishedAt: new Date('2026-04-29T20:05:00+08:00'),
                categoryId: engineering.id,
                tags: connectTags([prismaTag.id, tsTag.id]),
            },
        },
        {
            where: { slug: 'blog-layout-spacing-review' },
            create: {
                title: '我怎么检查博客页面的间距是不是干净',
                slug: 'blog-layout-spacing-review',
                summary: '从大间距到小间距，逐层检查列表、边栏和正文区。',
                content: '这篇更偏 UI 细节，但同样服务于页面可维护性。',
                status: PostStatus.PUBLISHED,
                publishedAt: new Date('2026-04-27T17:10:00+08:00'),
                categoryId: frontend.id,
                tags: connectTags([reactTag.id, writingTag.id]),
            },
        },
        {
            where: { slug: 'draft-admin-filter-plan' },
            create: {
                title: '后台草稿筛选功能的实现草案',
                slug: 'draft-admin-filter-plan',
                summary: '先把状态筛选参数留好，再决定 UI 怎么落。',
                content: '这是一篇草稿，用来测试后台分页时 DRAFT 数据是否会被正确统计。',
                status: PostStatus.DRAFT,
                categoryId: engineering.id,
                tags: connectTags([architectureTag.id]),
            },
        },
        {
            where: { slug: 'draft-cover-image-process' },
            create: {
                title: '封面图处理流程草稿',
                slug: 'draft-cover-image-process',
                summary: '记录文章封面从上传到展示的可能链路。',
                content: '也是一篇草稿数据，主要用于后台分页和状态展示验证。',
                status: PostStatus.DRAFT,
                categoryId: notes.id,
                tags: connectTags([writingTag.id, reactTag.id]),
            },
        },
        {
            where: { slug: 'draft-tag-cleanup-plan' },
            create: {
                title: '标签整理计划草稿',
                slug: 'draft-tag-cleanup-plan',
                summary: '准备收敛掉意义不清的标签，保留真正能帮助阅读的标签。',
                content: '用于补充后台草稿列表的数据量，方便测试翻页。',
                status: PostStatus.DRAFT,
                categoryId: notes.id,
                tags: connectTags([writingTag.id]),
            },
        },
        {
            where: { slug: 'hono-openapi-contract-review' },
            create: {
                title: '用 Hono OpenAPI 约束接口返回结构',
                slug: 'hono-openapi-contract-review',
                summary: '接口一旦有列表和分页，响应 contract 更值得提前收口。',
                content: '这里主要记录 schema、validator 和返回结构之间怎样保持一致。',
                status: PostStatus.PUBLISHED,
                publishedAt: new Date('2026-04-25T10:35:00+08:00'),
                categoryId: engineering.id,
                tags: connectTags([architectureTag.id, tsTag.id]),
            },
        },
        {
            where: { slug: 'client-component-action-patterns' },
            create: {
                title: 'Client Component 里按钮动作怎么写更稳',
                slug: 'client-component-action-patterns',
                summary: '把 pending、反馈、刷新分别收好，避免交互混乱。',
                content: '以后做后台管理功能时，这会是一类很常复用的模式。',
                status: PostStatus.PUBLISHED,
                publishedAt: new Date('2026-04-22T14:55:00+08:00'),
                categoryId: frontend.id,
                tags: connectTags([reactTag.id, tsTag.id]),
            },
        },
        {
            where: { slug: 'published-date-formatting-notes' },
            create: {
                title: '发布日期格式化的几个边界情况',
                slug: 'published-date-formatting-notes',
                summary: '空日期、非法日期和本地化展示都要考虑。',
                content: '这篇文章来自最近对文章列表时间展示的整理。',
                status: PostStatus.PUBLISHED,
                publishedAt: new Date('2026-04-20T09:05:00+08:00'),
                categoryId: frontend.id,
                tags: connectTags([tsTag.id, writingTag.id]),
            },
        },
        {
            where: { slug: 'notes-on-small-scope-refactor' },
            create: {
                title: '为什么我更偏向小范围重构',
                slug: 'notes-on-small-scope-refactor',
                summary: '先闭环当前功能，再决定是否抽象，这是内容型项目里更稳的节奏。',
                content: '这是一篇随笔，用来补前台分页列表的后续页内容。',
                status: PostStatus.PUBLISHED,
                publishedAt: new Date('2026-04-18T21:30:00+08:00'),
                categoryId: notes.id,
                tags: connectTags([writingTag.id, architectureTag.id]),
            },
        },
        {
            where: { slug: 'nextjs-local-api-dispatch' },
            create: {
                title: '服务端组件里优先本地分发 API 的好处',
                slug: 'nextjs-local-api-dispatch',
                summary: '避免构建期再请求本地 HTTP 服务，也让类型链路更稳定。',
                content: '这篇内容围绕 requestApi 的服务端分发设计展开。',
                status: PostStatus.PUBLISHED,
                publishedAt: new Date('2026-04-16T11:25:00+08:00'),
                categoryId: engineering.id,
                tags: connectTags([nextTag.id, architectureTag.id]),
            },
        },
        {
            where: { slug: 'draft-homepage-content-plan' },
            create: {
                title: '首页内容区改版草稿',
                slug: 'draft-homepage-content-plan',
                summary: '记录首页 hero、最新文章和主题区块的调整想法。',
                content: '继续补一篇草稿，确保后台第三页也能测到。',
                status: PostStatus.DRAFT,
                categoryId: notes.id,
                tags: connectTags([writingTag.id]),
            },
        },
    ];

    const posts: SeedPost[] = basePosts.map((post) => ({
        ...post,
        create: {
            ...post.create,
            content:
                post.create.status === PostStatus.PUBLISHED
                    ? expandPublishedContent(
                          post.create.title,
                          post.create.summary,
                          post.create.content,
                      )
                    : expandDraftContent(
                          post.create.title,
                          post.create.summary,
                          post.create.content,
                      ),
        },
    }));

    for (const post of posts) {
        const { tags, ...rest } = post.create;

        await prisma.post.upsert({
            where: post.where,
            update: {
                ...rest,
                tags: {
                    set: [],
                    connect: tags.connect,
                },
            },
            create: post.create,
        });
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
