import type { z } from 'zod';

import type { categoryCreateRequestSchema, categoryListSchema, categorySchema } from './schema';

export type CategoryItem = z.infer<typeof categorySchema>;
export type CategoryListResponse = z.infer<typeof categoryListSchema>;
export type CategoryCreateData = z.output<typeof categoryCreateRequestSchema>;
