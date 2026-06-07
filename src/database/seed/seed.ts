import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const PostStatus = {
    DRAFT: 'DRAFT',
    PUBLISHED: 'PUBLISHED',
} as const;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('DATABASE_URL is not set');
}

const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
});

const seedCategories = [
    {
        name: '工程',
        slug: 'engineering',
    },
    {
        name: '前端',
        slug: 'frontend',
    },
    {
        name: '随笔',
        slug: 'notes',
    },
] as const;

const seedTags = [
    {
        name: '架构',
        slug: 'architecture',
    },
    {
        name: 'Next.js',
        slug: 'nextjs',
    },
    {
        name: 'Prisma',
        slug: 'prisma',
    },
    {
        name: 'React',
        slug: 'react',
    },
    {
        name: 'TypeScript',
        slug: 'typescript',
    },
    {
        name: '写作',
        slug: 'writing',
    },
] as const;

const seedPosts = [
    {
        title: '后台表格操作里的反馈状态怎么设计',
        slug: 'admin-table-feedback-states',
        summary: '删除、发布、下线操作都应该有清晰的禁用态和提示。',
        content:
            '删除、发布、下线操作都应该有清晰的禁用态和提示。 这篇文章围绕《后台表格操作里的反馈状态怎么设计》展开，不追求一次把所有技巧堆满，而是先把问题、边界和目标交代清楚。\n\n重点是把用户操作后的页面刷新闭环补完整。 真正开始实现时，我会先把页面层、交互层、接口层和数据层的职责拆开，再决定哪些逻辑应该复用，哪些状态应该只留在当前上下文里。\n\n如果你是后来回看这篇内容的人，可以把它当成一次实现复盘：先理解为什么这样设计，再回头看每一层分别承担了什么责任，最后再决定哪些点值得继续抽象或增强。',
        cover: null,
        status: PostStatus.PUBLISHED,
        publishedAt: new Date('2026-05-08T10:00:00Z'),
        categorySlug: 'frontend',
        tagSlugs: ['architecture', 'react'],
    },
    {
        title: '我怎么检查博客页面的间距是不是干净',
        slug: 'blog-layout-spacing-review',
        summary: '从大间距到小间距，逐层检查列表、边栏和正文区。',
        content:
            '从大间距到小间距，逐层检查列表、边栏和正文区。 这篇文章围绕《我怎么检查博客页面的间距是不是干净》展开，不追求一次把所有技巧堆满，而是先把问题、边界和目标交代清楚。\n\n这篇更偏 UI 细节，但同样服务于页面可维护性。 真正开始实现时，我会先把页面层、交互层、接口层和数据层的职责拆开，再决定哪些逻辑应该复用，哪些状态应该只留在当前上下文里。\n\n如果你是后来回看这篇内容的人，可以把它当成一次实现复盘：先理解为什么这样设计，再回头看每一层分别承担了什么责任，最后再决定哪些点值得继续抽象或增强。',
        cover: null,
        status: PostStatus.PUBLISHED,
        publishedAt: new Date('2026-04-27T09:10:00Z'),
        categorySlug: 'frontend',
        tagSlugs: ['react', 'writing'],
    },
    {
        title: '使用 Next.js 搭建个人博客的开始',
        slug: 'build-blog-with-nextjs',
        summary: '记录我从零开始使用 Next.js 搭建个人博客的过程与思考。',
        content:
            '记录我从零开始使用 Next.js 搭建个人博客的过程与思考。 这篇文章围绕《使用 Next.js 搭建个人博客的开始》展开，不追求一次把所有技巧堆满，而是先把问题、边界和目标交代清楚。\n\n这是第一篇文章内容，主要记录项目初始化、路由结构和页面组织方式。 真正开始实现时，我会先把页面层、交互层、接口层和数据层的职责拆开，再决定哪些逻辑应该复用，哪些状态应该只留在当前上下文里。\n\n如果你是后来回看这篇内容的人，可以把它当成一次实现复盘：先理解为什么这样设计，再回头看每一层分别承担了什么责任，最后再决定哪些点值得继续抽象或增强。',
        cover: null,
        status: PostStatus.PUBLISHED,
        publishedAt: new Date('2026-06-01T01:00:00Z'),
        categorySlug: 'frontend',
        tagSlugs: ['nextjs', 'typescript'],
    },
    {
        title: '分类筛选和分页一起做时，查询参数应该怎么设计',
        slug: 'category-filter-query-design',
        summary: '先定义 query 结构，再决定页面和接口怎么对齐。',
        content:
            '先定义 query 结构，再决定页面和接口怎么对齐。 这篇文章围绕《分类筛选和分页一起做时，查询参数应该怎么设计》展开，不追求一次把所有技巧堆满，而是先把问题、边界和目标交代清楚。\n\n如果分页和分类筛选分两边处理，很容易出现结果数量和页码错位。 真正开始实现时，我会先把页面层、交互层、接口层和数据层的职责拆开，再决定哪些逻辑应该复用，哪些状态应该只留在当前上下文里。\n\n如果你是后来回看这篇内容的人，可以把它当成一次实现复盘：先理解为什么这样设计，再回头看每一层分别承担了什么责任，最后再决定哪些点值得继续抽象或增强。',
        cover: null,
        status: PostStatus.PUBLISHED,
        publishedAt: new Date('2026-05-06T05:50:00Z'),
        categorySlug: 'engineering',
        tagSlugs: ['architecture', 'typescript'],
    },
    {
        title: 'Client Component 里按钮动作怎么写更稳',
        slug: 'client-component-action-patterns',
        summary: '把 pending、反馈、刷新分别收好，避免交互混乱。',
        content:
            '把 pending、反馈、刷新分别收好，避免交互混乱。 这篇文章围绕《Client Component 里按钮动作怎么写更稳》展开，不追求一次把所有技巧堆满，而是先把问题、边界和目标交代清楚。\n\n以后做后台管理功能时，这会是一类很常复用的模式。 真正开始实现时，我会先把页面层、交互层、接口层和数据层的职责拆开，再决定哪些逻辑应该复用，哪些状态应该只留在当前上下文里。\n\n如果你是后来回看这篇内容的人，可以把它当成一次实现复盘：先理解为什么这样设计，再回头看每一层分别承担了什么责任，最后再决定哪些点值得继续抽象或增强。',
        cover: null,
        status: PostStatus.PUBLISHED,
        publishedAt: new Date('2026-04-22T06:55:00Z'),
        categorySlug: 'frontend',
        tagSlugs: ['react', 'typescript'],
    },
    {
        title: '写博客摘要时，我会固定先写哪三件事',
        slug: 'content-summary-writing-patterns',
        summary: '摘要不是复制正文第一段，而是交代主题、问题和结果。',
        content:
            '摘要不是复制正文第一段，而是交代主题、问题和结果。 这篇文章围绕《写博客摘要时，我会固定先写哪三件事》展开，不追求一次把所有技巧堆满，而是先把问题、边界和目标交代清楚。\n\n这是一篇偏写作方法论的示例文章，用来补足随笔分类的数据量。 真正开始实现时，我会先把页面层、交互层、接口层和数据层的职责拆开，再决定哪些逻辑应该复用，哪些状态应该只留在当前上下文里。\n\n如果你是后来回看这篇内容的人，可以把它当成一次实现复盘：先理解为什么这样设计，再回头看每一层分别承担了什么责任，最后再决定哪些点值得继续抽象或增强。',
        cover: null,
        status: PostStatus.PUBLISHED,
        publishedAt: new Date('2026-05-10T00:10:00Z'),
        categorySlug: 'notes',
        tagSlugs: ['writing'],
    },
    {
        title: '给博客项目划清服务端边界',
        slug: 'designing-server-boundaries',
        summary: '为什么页面、API、数据访问层要各自承担清晰职责。',
        content:
            '为什么页面、API、数据访问层要各自承担清晰职责。 这篇文章围绕《给博客项目划清服务端边界》展开，不追求一次把所有技巧堆满，而是先把问题、边界和目标交代清楚。\n\n这篇示例文章强调页面负责展示，Hono 负责接口，Prisma 负责落库，避免跨层直接耦合。 真正开始实现时，我会先把页面层、交互层、接口层和数据层的职责拆开，再决定哪些逻辑应该复用，哪些状态应该只留在当前上下文里。\n\n如果你是后来回看这篇内容的人，可以把它当成一次实现复盘：先理解为什么这样设计，再回头看每一层分别承担了什么责任，最后再决定哪些点值得继续抽象或增强。',
        cover: null,
        status: PostStatus.PUBLISHED,
        publishedAt: new Date('2026-05-28T12:30:00Z'),
        categorySlug: 'engineering',
        tagSlugs: ['architecture', 'prisma'],
    },
    {
        title: '后台草稿筛选功能的实现草案',
        slug: 'draft-admin-filter-plan',
        summary: '先把状态筛选参数留好，再决定 UI 怎么落。',
        content:
            '先把状态筛选参数留好，再决定 UI 怎么落。 这篇《后台草稿筛选功能的实现草案》目前还停留在草稿阶段，所以重点不是把细节一次写满，而是先把问题范围、预期结构和要验证的主链路记下来。\n\n这是一篇草稿，用来测试后台分页时 DRAFT 数据是否会被正确统计。 我通常会先列出当前已知结论，再标出还没有想清楚的地方，这样后续继续补内容时不会把旧思路完全推翻。\n\n保留这类草稿还有一个作用：它能帮助我在后台管理里验证草稿状态、列表排序和分页行为是否正常，同时也让后续正式成文时有稳定的起点。',
        cover: null,
        status: PostStatus.DRAFT,
        publishedAt: null,
        categorySlug: 'engineering',
        tagSlugs: ['architecture'],
    },
    {
        title: '封面图处理流程草稿',
        slug: 'draft-cover-image-process',
        summary: '记录文章封面从上传到展示的可能链路。',
        content:
            '记录文章封面从上传到展示的可能链路。 这篇《封面图处理流程草稿》目前还停留在草稿阶段，所以重点不是把细节一次写满，而是先把问题范围、预期结构和要验证的主链路记下来。\n\n也是一篇草稿数据，主要用于后台分页和状态展示验证。 我通常会先列出当前已知结论，再标出还没有想清楚的地方，这样后续继续补内容时不会把旧思路完全推翻。\n\n保留这类草稿还有一个作用：它能帮助我在后台管理里验证草稿状态、列表排序和分页行为是否正常，同时也让后续正式成文时有稳定的起点。',
        cover: null,
        status: PostStatus.DRAFT,
        publishedAt: null,
        categorySlug: 'notes',
        tagSlugs: ['react', 'writing'],
    },
    {
        title: '首页内容区改版草稿',
        slug: 'draft-homepage-content-plan',
        summary: '记录首页 hero、最新文章和主题区块的调整想法。',
        content:
            '记录首页 hero、最新文章和主题区块的调整想法。 这篇《首页内容区改版草稿》目前还停留在草稿阶段，所以重点不是把细节一次写满，而是先把问题范围、预期结构和要验证的主链路记下来。\n\n继续补一篇草稿，确保后台第三页也能测到。 我通常会先列出当前已知结论，再标出还没有想清楚的地方，这样后续继续补内容时不会把旧思路完全推翻。\n\n保留这类草稿还有一个作用：它能帮助我在后台管理里验证草稿状态、列表排序和分页行为是否正常，同时也让后续正式成文时有稳定的起点。',
        cover: null,
        status: PostStatus.DRAFT,
        publishedAt: null,
        categorySlug: 'notes',
        tagSlugs: ['writing'],
    },
    {
        title: '标签整理计划草稿',
        slug: 'draft-tag-cleanup-plan',
        summary: '准备收敛掉意义不清的标签，保留真正能帮助阅读的标签。',
        content:
            '准备收敛掉意义不清的标签，保留真正能帮助阅读的标签。 这篇《标签整理计划草稿》目前还停留在草稿阶段，所以重点不是把细节一次写满，而是先把问题范围、预期结构和要验证的主链路记下来。\n\n用于补充后台草稿列表的数据量，方便测试翻页。 我通常会先列出当前已知结论，再标出还没有想清楚的地方，这样后续继续补内容时不会把旧思路完全推翻。\n\n保留这类草稿还有一个作用：它能帮助我在后台管理里验证草稿状态、列表排序和分页行为是否正常，同时也让后续正式成文时有稳定的起点。',
        cover: null,
        status: PostStatus.DRAFT,
        publishedAt: null,
        categorySlug: 'notes',
        tagSlugs: ['writing'],
    },
    {
        title: '博客内容规划草稿',
        slug: 'draft-writing-plan-for-blog',
        summary: '先列出准备写的主题，再决定哪些值得展开成正式文章。',
        content:
            '先列出准备写的主题，再决定哪些值得展开成正式文章。 这篇《博客内容规划草稿》目前还停留在草稿阶段，所以重点不是把细节一次写满，而是先把问题范围、预期结构和要验证的主链路记下来。\n\n这是一篇草稿示例，用来验证后台是否能同时处理 DRAFT 和 PUBLISHED 两种文章状态。 我通常会先列出当前已知结论，再标出还没有想清楚的地方，这样后续继续补内容时不会把旧思路完全推翻。\n\n保留这类草稿还有一个作用：它能帮助我在后台管理里验证草稿状态、列表排序和分页行为是否正常，同时也让后续正式成文时有稳定的起点。',
        cover: null,
        status: PostStatus.DRAFT,
        publishedAt: null,
        categorySlug: 'notes',
        tagSlugs: ['writing'],
    },
    {
        title: '用 Hono OpenAPI 约束接口返回结构',
        slug: 'hono-openapi-contract-review',
        summary: '接口一旦有列表和分页，响应 contract 更值得提前收口。',
        content:
            '接口一旦有列表和分页，响应 contract 更值得提前收口。 这篇文章围绕《用 Hono OpenAPI 约束接口返回结构》展开，不追求一次把所有技巧堆满，而是先把问题、边界和目标交代清楚。\n\n这里主要记录 schema、validator 和返回结构之间怎样保持一致。 真正开始实现时，我会先把页面层、交互层、接口层和数据层的职责拆开，再决定哪些逻辑应该复用，哪些状态应该只留在当前上下文里。\n\n如果你是后来回看这篇内容的人，可以把它当成一次实现复盘：先理解为什么这样设计，再回头看每一层分别承担了什么责任，最后再决定哪些点值得继续抽象或增强。',
        cover: null,
        status: PostStatus.PUBLISHED,
        publishedAt: new Date('2026-04-25T02:35:00Z'),
        categorySlug: 'engineering',
        tagSlugs: ['architecture', 'typescript'],
    },
    {
        title: 'App Router 里的路由分段怎么拆更顺手',
        slug: 'nextjs-app-router-segments',
        summary: '从博客结构出发，整理 App Router 里页面、布局和分组的拆分方式。',
        content:
            '从博客结构出发，整理 App Router 里页面、布局和分组的拆分方式。 这篇文章围绕《App Router 里的路由分段怎么拆更顺手》展开，不追求一次把所有技巧堆满，而是先把问题、边界和目标交代清楚。\n\n这一篇主要记录页面分组、布局边界和路由命名的取舍。 真正开始实现时，我会先把页面层、交互层、接口层和数据层的职责拆开，再决定哪些逻辑应该复用，哪些状态应该只留在当前上下文里。\n\n如果你是后来回看这篇内容的人，可以把它当成一次实现复盘：先理解为什么这样设计，再回头看每一层分别承担了什么责任，最后再决定哪些点值得继续抽象或增强。',
        cover: null,
        status: PostStatus.PUBLISHED,
        publishedAt: new Date('2026-05-18T02:00:00Z'),
        categorySlug: 'frontend',
        tagSlugs: ['architecture', 'nextjs'],
    },
    {
        title: '服务端组件里优先本地分发 API 的好处',
        slug: 'nextjs-local-api-dispatch',
        summary: '避免构建期再请求本地 HTTP 服务，也让类型链路更稳定。',
        content:
            '避免构建期再请求本地 HTTP 服务，也让类型链路更稳定。 这篇文章围绕《服务端组件里优先本地分发 API 的好处》展开，不追求一次把所有技巧堆满，而是先把问题、边界和目标交代清楚。\n\n这篇内容围绕 requestApi 的服务端分发设计展开。 真正开始实现时，我会先把页面层、交互层、接口层和数据层的职责拆开，再决定哪些逻辑应该复用，哪些状态应该只留在当前上下文里。\n\n如果你是后来回看这篇内容的人，可以把它当成一次实现复盘：先理解为什么这样设计，再回头看每一层分别承担了什么责任，最后再决定哪些点值得继续抽象或增强。',
        cover: null,
        status: PostStatus.PUBLISHED,
        publishedAt: new Date('2026-04-16T03:25:00Z'),
        categorySlug: 'engineering',
        tagSlugs: ['architecture', 'nextjs'],
    },
    {
        title: '给文章页补 Metadata 时要注意的几个细节',
        slug: 'nextjs-metadata-notes',
        summary: '标题、描述和 canonical 建议在页面层统一组织。',
        content:
            '标题、描述和 canonical 建议在页面层统一组织。 这篇文章围绕《给文章页补 Metadata 时要注意的几个细节》展开，不追求一次把所有技巧堆满，而是先把问题、边界和目标交代清楚。\n\n这篇文章主要记录动态页面里 metadata 的组织方式。 真正开始实现时，我会先把页面层、交互层、接口层和数据层的职责拆开，再决定哪些逻辑应该复用，哪些状态应该只留在当前上下文里。\n\n如果你是后来回看这篇内容的人，可以把它当成一次实现复盘：先理解为什么这样设计，再回头看每一层分别承担了什么责任，最后再决定哪些点值得继续抽象或增强。',
        cover: null,
        status: PostStatus.PUBLISHED,
        publishedAt: new Date('2026-05-04T08:25:00Z'),
        categorySlug: 'frontend',
        tagSlugs: ['nextjs'],
    },
    {
        title: '为什么我更偏向小范围重构',
        slug: 'notes-on-small-scope-refactor',
        summary: '先闭环当前功能，再决定是否抽象，这是内容型项目里更稳的节奏。',
        content:
            '先闭环当前功能，再决定是否抽象，这是内容型项目里更稳的节奏。 这篇文章围绕《为什么我更偏向小范围重构》展开，不追求一次把所有技巧堆满，而是先把问题、边界和目标交代清楚。\n\n这是一篇随笔，用来补前台分页列表的后续页内容。 真正开始实现时，我会先把页面层、交互层、接口层和数据层的职责拆开，再决定哪些逻辑应该复用，哪些状态应该只留在当前上下文里。\n\n如果你是后来回看这篇内容的人，可以把它当成一次实现复盘：先理解为什么这样设计，再回头看每一层分别承担了什么责任，最后再决定哪些点值得继续抽象或增强。',
        cover: null,
        status: PostStatus.PUBLISHED,
        publishedAt: new Date('2026-04-18T13:30:00Z'),
        categorySlug: 'notes',
        tagSlugs: ['architecture', 'writing'],
    },
    {
        title: '列表空态不是一句没数据就结束',
        slug: 'post-list-empty-state-design',
        summary: '空态要告诉用户当前筛选条件，以及下一步能做什么。',
        content:
            '空态要告诉用户当前筛选条件，以及下一步能做什么。 这篇文章围绕《列表空态不是一句没数据就结束》展开，不追求一次把所有技巧堆满，而是先把问题、边界和目标交代清楚。\n\n这里用博客列表作为例子，梳理空态组件的职责边界。 真正开始实现时，我会先把页面层、交互层、接口层和数据层的职责拆开，再决定哪些逻辑应该复用，哪些状态应该只留在当前上下文里。\n\n如果你是后来回看这篇内容的人，可以把它当成一次实现复盘：先理解为什么这样设计，再回头看每一层分别承担了什么责任，最后再决定哪些点值得继续抽象或增强。',
        cover: null,
        status: PostStatus.PUBLISHED,
        publishedAt: new Date('2026-05-03T01:45:00Z'),
        categorySlug: 'notes',
        tagSlugs: ['react', 'writing'],
    },
    {
        title: '列表页里怎么写 Prisma 查询才不容易失控',
        slug: 'prisma-query-shaping-for-list-pages',
        summary: '把 where、排序和分页参数收口到 service 层。',
        content:
            '把 where、排序和分页参数收口到 service 层。 这篇文章围绕《列表页里怎么写 Prisma 查询才不容易失控》展开，不追求一次把所有技巧堆满，而是先把问题、边界和目标交代清楚。\n\n这篇文章聚焦列表查询的结构化写法，而不是页面里直接拼数据库条件。 真正开始实现时，我会先把页面层、交互层、接口层和数据层的职责拆开，再决定哪些逻辑应该复用，哪些状态应该只留在当前上下文里。\n\n如果你是后来回看这篇内容的人，可以把它当成一次实现复盘：先理解为什么这样设计，再回头看每一层分别承担了什么责任，最后再决定哪些点值得继续抽象或增强。',
        cover: null,
        status: PostStatus.PUBLISHED,
        publishedAt: new Date('2026-05-12T03:40:00Z'),
        categorySlug: 'engineering',
        tagSlugs: ['architecture', 'prisma'],
    },
    {
        title: '博客项目里我会怎样组织 Prisma Seed',
        slug: 'prisma-seed-strategy-for-blog',
        summary: '既要可重复执行，也要方便补测试数据。',
        content:
            '既要可重复执行，也要方便补测试数据。 这篇文章围绕《博客项目里我会怎样组织 Prisma Seed》展开，不追求一次把所有技巧堆满，而是先把问题、边界和目标交代清楚。\n\n文章重点是如何用 upsert 保证本地 seed 多次执行仍然稳定。 真正开始实现时，我会先把页面层、交互层、接口层和数据层的职责拆开，再决定哪些逻辑应该复用，哪些状态应该只留在当前上下文里。\n\n如果你是后来回看这篇内容的人，可以把它当成一次实现复盘：先理解为什么这样设计，再回头看每一层分别承担了什么责任，最后再决定哪些点值得继续抽象或增强。',
        cover: null,
        status: PostStatus.PUBLISHED,
        publishedAt: new Date('2026-04-29T12:05:00Z'),
        categorySlug: 'engineering',
        tagSlugs: ['prisma', 'typescript'],
    },
    {
        title: '发布日期格式化的几个边界情况',
        slug: 'published-date-formatting-notes',
        summary: '空日期、非法日期和本地化展示都要考虑。',
        content:
            '空日期、非法日期和本地化展示都要考虑。 这篇文章围绕《发布日期格式化的几个边界情况》展开，不追求一次把所有技巧堆满，而是先把问题、边界和目标交代清楚。\n\n这篇文章来自最近对文章列表时间展示的整理。 真正开始实现时，我会先把页面层、交互层、接口层和数据层的职责拆开，再决定哪些逻辑应该复用，哪些状态应该只留在当前上下文里。\n\n如果你是后来回看这篇内容的人，可以把它当成一次实现复盘：先理解为什么这样设计，再回头看每一层分别承担了什么责任，最后再决定哪些点值得继续抽象或增强。',
        cover: null,
        status: PostStatus.PUBLISHED,
        publishedAt: new Date('2026-04-20T01:05:00Z'),
        categorySlug: 'frontend',
        tagSlugs: ['typescript', 'writing'],
    },
    {
        title: 'React 表单状态管理的一些实用笔记',
        slug: 'react-form-state-notes',
        summary: '整理后台表单里加载态、禁用态、成功失败提示的处理方式。',
        content:
            '整理后台表单里加载态、禁用态、成功失败提示的处理方式。 这篇文章围绕《React 表单状态管理的一些实用笔记》展开，不追求一次把所有技巧堆满，而是先把问题、边界和目标交代清楚。\n\n这是一篇偏实战的示例文章，讨论如何在 React 表单里收敛状态、错误和提交反馈。 真正开始实现时，我会先把页面层、交互层、接口层和数据层的职责拆开，再决定哪些逻辑应该复用，哪些状态应该只留在当前上下文里。\n\n如果你是后来回看这篇内容的人，可以把它当成一次实现复盘：先理解为什么这样设计，再回头看每一层分别承担了什么责任，最后再决定哪些点值得继续抽象或增强。',
        cover: null,
        status: PostStatus.PUBLISHED,
        publishedAt: new Date('2026-05-21T06:15:00Z'),
        categorySlug: 'frontend',
        tagSlugs: ['react', 'typescript'],
    },
    {
        title: 'Route Handler 和 Hono 在这个项目里怎么分工',
        slug: 'route-handler-vs-hono-notes',
        summary: 'Route Handler 只做接入，业务逻辑集中在 Hono 里。',
        content:
            'Route Handler 只做接入，业务逻辑集中在 Hono 里。 这篇文章围绕《Route Handler 和 Hono 在这个项目里怎么分工》展开，不追求一次把所有技巧堆满，而是先把问题、边界和目标交代清楚。\n\n这样页面层、本地分发和接口文档都能共用同一套路由实现。 真正开始实现时，我会先把页面层、交互层、接口层和数据层的职责拆开，再决定哪些逻辑应该复用，哪些状态应该只留在当前上下文里。\n\n如果你是后来回看这篇内容的人，可以把它当成一次实现复盘：先理解为什么这样设计，再回头看每一层分别承担了什么责任，最后再决定哪些点值得继续抽象或增强。',
        cover: null,
        status: PostStatus.PUBLISHED,
        publishedAt: new Date('2026-05-01T04:15:00Z'),
        categorySlug: 'engineering',
        tagSlugs: ['architecture', 'nextjs'],
    },
    {
        title: '把 Server Component 的数据流收干净',
        slug: 'server-component-data-flow',
        summary: '避免页面层堆逻辑，改成只做数据组织和展示组合。',
        content:
            '避免页面层堆逻辑，改成只做数据组织和展示组合。 这篇文章围绕《把 Server Component 的数据流收干净》展开，不追求一次把所有技巧堆满，而是先把问题、边界和目标交代清楚。\n\n核心是让页面只关心搜索参数、展示结构和组件拼装。 真正开始实现时，我会先把页面层、交互层、接口层和数据层的职责拆开，再决定哪些逻辑应该复用，哪些状态应该只留在当前上下文里。\n\n如果你是后来回看这篇内容的人，可以把它当成一次实现复盘：先理解为什么这样设计，再回头看每一层分别承担了什么责任，最后再决定哪些点值得继续抽象或增强。',
        cover: null,
        status: PostStatus.PUBLISHED,
        publishedAt: new Date('2026-05-16T01:30:00Z'),
        categorySlug: 'engineering',
        tagSlugs: ['architecture', 'nextjs'],
    },
    {
        title: '表单提交前先做一层 TypeScript 数据归一化',
        slug: 'typescript-form-value-normalization',
        summary: '把输入值先整理成稳定结构，再交给接口层验证。',
        content:
            '把输入值先整理成稳定结构，再交给接口层验证。 这篇文章围绕《表单提交前先做一层 TypeScript 数据归一化》展开，不追求一次把所有技巧堆满，而是先把问题、边界和目标交代清楚。\n\n这样表单字段、接口 schema 和数据库层的边界会更清楚。 真正开始实现时，我会先把页面层、交互层、接口层和数据层的职责拆开，再决定哪些逻辑应该复用，哪些状态应该只留在当前上下文里。\n\n如果你是后来回看这篇内容的人，可以把它当成一次实现复盘：先理解为什么这样设计，再回头看每一层分别承担了什么责任，最后再决定哪些点值得继续抽象或增强。',
        cover: null,
        status: PostStatus.PUBLISHED,
        publishedAt: new Date('2026-05-14T07:20:00Z'),
        categorySlug: 'frontend',
        tagSlugs: ['react', 'typescript'],
    },
] as const;

async function main() {
    const categoryMap = new Map<string, { id: string }>();

    for (const category of seedCategories) {
        const record = await prisma.category.upsert({
            where: { slug: category.slug },
            update: {
                name: category.name,
            },
            create: {
                name: category.name,
                slug: category.slug,
            },
        });

        categoryMap.set(category.slug, { id: record.id });
    }

    const tagMap = new Map<string, { id: string }>();

    for (const tag of seedTags) {
        const record = await prisma.tag.upsert({
            where: { slug: tag.slug },
            update: {
                name: tag.name,
            },
            create: {
                name: tag.name,
                slug: tag.slug,
            },
        });

        tagMap.set(tag.slug, { id: record.id });
    }

    for (const post of seedPosts) {
        const category = categoryMap.get(post.categorySlug);

        if (!category) {
            throw new Error(`Category not found for slug: ${post.categorySlug}`);
        }

        const connectTags = post.tagSlugs.map((slug) => {
            const tag = tagMap.get(slug);

            if (!tag) {
                throw new Error(`Tag not found for slug: ${slug}`);
            }

            return { id: tag.id };
        });

        await prisma.post.upsert({
            where: { slug: post.slug },
            update: {
                title: post.title,
                summary: post.summary,
                content: post.content,
                cover: post.cover,
                status: post.status,
                publishedAt: post.publishedAt,
                categoryId: category.id,
                tags: {
                    set: [],
                    connect: connectTags,
                },
            },
            create: {
                title: post.title,
                slug: post.slug,
                summary: post.summary,
                content: post.content,
                cover: post.cover,
                status: post.status,
                publishedAt: post.publishedAt,
                categoryId: category.id,
                tags: {
                    connect: connectTags,
                },
            },
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
