import type { Post } from "@/types/post"

export const posts: Post[] = [
  {
    id: "1",
    title: "在 Next.js 16 里重新整理博客的路由和布局",
    slug: "nextjs-16-layout-audit",
    summary: "用一轮小型重构，把全局布局、metadata 和动态路由的职责重新划清。",
    content: `
      <p>一个内容型网站最先失控的，通常不是业务逻辑，而是页面壳层。导航、页脚、页面宽度和 metadata 如果分散在多个页面里，后续每加一个路由都会复制一次规则。</p>
      <p>这次整理里最重要的动作不是换视觉，而是把共享信息集中到站点配置里，并让 layout 只做全局壳层。这样首页、文章页、关于页的职责就清楚了：页面负责内容，layout 负责全局体验。</p>
      <h2>动态路由的边界</h2>
      <p>Next.js 新版本里，动态路由参数已经变成 Promise。继续沿用旧写法，很容易在 metadata、page 和 layout 之间出现不一致。把这一层统一以后，类型错误会明显减少。</p>
      <ul>
        <li>全局 metadata 由根布局维护</li>
        <li>文章 metadata 由 slug 页面按文章内容生成</li>
        <li>导航只保留真实存在的路由</li>
      </ul>
    `,
    cover: "/covers/nextjs-16-layout.svg",
    publishedAt: "2026-04-26",
    tags: ["Next.js", "架构"]
  },
  {
    id: "2",
    title: "把 TypeScript 当成页面边界检查器",
    slug: "typescript-as-boundary-checker",
    summary: "比起“类型越多越安全”，更重要的是让配置、数据和组件接口对齐。",
    content: `
      <p>类型系统最有价值的地方，不是给每个变量贴标签，而是在模块边界处阻止错误继续传播。博客项目里最典型的边界，是站点配置、文章数据和页面 props。</p>
      <p>当 layout 读取一个不存在的 <code>siteConfig.title</code> 时，TypeScript 应该第一时间报错；当文章卡片既能接真实数据、又能偷偷生成假数据时，类型虽然能通过，结构却已经变得模糊。</p>
      <h2>真正该类型化的地方</h2>
      <p>优先保证这些对象稳定：站点配置、路由参数、文章结构、共享组件 props。这样页面层就能保持很薄，更多时间花在内容组织上，而不是救火。</p>
      <blockquote>类型不是文档的替代品，但它是避免结构悄悄偏移的第一道闸门。</blockquote>
    `,
    cover: "/covers/typescript-boundaries.svg",
    publishedAt: "2026-04-20",
    tags: ["TypeScript", "工程化"]
  },
  {
    id: "3",
    title: "为什么内容型网站也需要组件约束",
    slug: "content-sites-need-component-rules",
    summary: "卡片、标签、按钮这些基础块如果不收口，页面越写越像临时拼装。",
    content: `
      <p>很多人会把博客项目看成“页面少、逻辑轻”，于是放松对组件边界的要求。但内容站点的维护成本，往往正是从这些细碎重复里长出来的。</p>
      <p>当标签在首页是原生 <code>span</code>，在文章页是 <code>Badge</code>，按钮有时是 UI 组件、有时是裸链接，项目会逐渐形成多个平行的视觉和交互标准。</p>
      <h2>一个简单的收口策略</h2>
      <ul>
        <li>页面只拼装，不定义新的基础交互规范</li>
        <li>通用展示块优先复用现有 UI 组件</li>
        <li>静态假数据不要藏在展示组件内部</li>
      </ul>
      <p>这样做并不会增加复杂度，反而让每个新增页面都更便宜。</p>
    `,
    cover: "/covers/component-rules.svg",
    publishedAt: "2026-04-12",
    tags: ["组件设计", "前端"]
  },
]

