# My Blog

一个基于 `Next.js 16 + React 19 + TypeScript + Hono + Prisma` 的博客内容平台。项目同时包含前台文章展示和后台内容管理，重点验证页面组件化、接口分层、数据库建模和前后端协作闭环。

## 项目概览

当前项目已经不是单纯的静态博客，而是一套完整的内容平台：

- 前台支持首页、文章列表、文章详情、分页、分类筛选、标签筛选
- 后台支持文章管理、文章编辑、分类管理、标签管理
- 数据通过 `Hono API` 进入服务层，再由 `Prisma` 读写 PostgreSQL
- 接口层使用 `Zod` 做参数校验，并暴露 OpenAPI 文档

## 技术栈

- `Next.js 16` / `React 19`
- `TypeScript 5`
- `Hono`
- `Prisma` / `PostgreSQL`
- `Tailwind CSS 4`
- `shadcn/ui`
- `Zod`

## 目录结构

```text
src/
  app/                Next.js App Router 页面
  components/         前台与后台共享组件
  api/                前端请求封装
  server/             Hono 路由、schema、service
  database/           Prisma schema、迁移、seed
  lib/                通用工具和基础设施
```

## 已实现功能

- 前台文章列表分页展示，每页 6 篇文章
- 按分类、标签筛选文章
- 文章详情页、面包屑、阅读时长、内容段落展示
- 最新文章组件
- 列表页和详情页 `Suspense + Skeleton` 加载体验
- 后台文章创建、编辑、发布、下线、删除
- 后台分类管理、标签管理
- 标签与文章关联关系维护
- Hono API 路由聚合与 OpenAPI 文档输出

## 项目亮点

- 前台和后台共用同一套数据链路，不直接在页面层绕过 API 访问数据库
- 页面、组件、请求层、服务层职责拆分明确，便于后续扩展和维护
- 使用 `Suspense + Skeleton` 优化文章列表和详情页的异步加载体验
- 后台支持文章、分类、标签的基础管理，主链路已形成闭环
- 使用 `Zod + hono-openapi` 约束接口输入输出，降低联调歧义

## 面试可讲点

- 为什么选择 `Next.js App Router + Hono + Prisma` 这套组合
- 页面层、组件层、API 层、服务层分别负责什么，为什么这样拆
- 分页、分类、标签筛选是怎么在前后端之间串起来的
- 为什么把骨架屏改成组件级 `Suspense fallback`
- 为什么标签展示和标签筛选要统一使用 `slug` 作为前后端匹配字段
- 后台文章编辑为什么要优先抽共享表单，而不是把新增和编辑页面各写一份

## 架构说明

项目默认遵循这条链路：

1. 页面层负责路由和页面级数据组织
2. 组件层负责展示和交互复用
3. `api/` 负责前端请求封装
4. `server/` 负责 Hono 路由、校验和业务逻辑
5. `Prisma` 负责数据库读写

这样做的目的是避免页面直接耦合数据库，同时保证前台和后台都走一致的数据链路。

## 本地启动

1. 安装依赖

```bash
pnpm install
```

2. 准备环境变量

`.env` 中至少需要：

```bash
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/my_blog
```

3. 启动数据库并执行迁移 / seed

```bash
docker compose up -d
pnpm exec prisma migrate deploy
pnpm exec prisma db seed
```

4. 启动开发环境

```bash
pnpm dev
```

浏览器访问：

```text
http://localhost:3000
```

## 常用命令

```bash
pnpm dev
pnpm lint
pnpm test
pnpm test:unit
pnpm test:integration
pnpm build
pnpm start
```

## API 文档

本地启动后可访问：

- Swagger UI: `http://localhost:3000/api/swagger`
- Scalar Docs: `http://localhost:3000/api/docs`

## 测试

当前把测试拆成了两组：

- `test:unit`
  覆盖不依赖数据库的纯函数和纯逻辑：
  阅读时长与日期格式化、分页链接生成、页码展示逻辑。

- `test:integration`
  覆盖 Hono 接口入口行为：
  API 根路由、参数校验失败响应、404 响应。

运行命令：

```bash
pnpm test
pnpm test:unit
pnpm test:integration
```
