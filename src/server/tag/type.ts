import type { z } from 'zod';

import type { tagCreateRequestSchema, tagListSchema, tagSchema } from './schema';

export type TagItem = z.infer<typeof tagSchema>;
export type TagListResponse = z.infer<typeof tagListSchema>;
export type TagCreateData = z.output<typeof tagCreateRequestSchema>;
