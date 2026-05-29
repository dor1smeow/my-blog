import type { z } from 'zod';

import { getPostItemCreateRequestSchema, getPostItemUpdateRequestSchema, postPaginateSchema, postSchema } from "../post/schema";

/**
 * 文章查询响应数据类型
 */
export type PostItem = z.infer<typeof postSchema>

/**
 * 文章分页查询响应数据类型
 */
export type PostPaginate = z.infer<typeof postPaginateSchema>;

/**
 * 文章操作(更新文章)时的原始请求数据类型
 * z.input 表示进入 Zod 验证前的数据,published 这类带 default 的字段可以省略
 */
export type PostUpdateInputData = z.input<ReturnType<typeof getPostItemUpdateRequestSchema>>;

/**
 * 文章操作(更新文章)时的验证后数据类型
 * z.output 表示经过 Zod 验证后的数据,published 会被 default(true) 补齐
 */
export type PostUpdateData = z.output<ReturnType<typeof getPostItemUpdateRequestSchema>>;


/**
 * 文章操作(创建文章)时的原始请求数据类型
 * z.input 表示进入 Zod 验证前的数据,published 这类带 default 的字段可以省略
 */
export type PostCreateInputData = z.input<ReturnType<typeof getPostItemCreateRequestSchema>>;



/**
 * 文章操作(创建文章)时的验证后数据类型
 * z.output 表示经过 Zod 验证后的数据,published 会被 default(true) 补齐
 */
export type PostCreateData = z.output<ReturnType<typeof getPostItemCreateRequestSchema>>;
