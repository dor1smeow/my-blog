import type { CategoryApiType } from '@/server/category/routes';

import { buildClient } from '@/lib/hono';
import { categoryPath } from '@/server/category/routes';

export const categoryClient = buildClient<CategoryApiType>(categoryPath);
