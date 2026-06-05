import type { PostApiType } from '@/server/post/routes';

import { buildClient } from '@/lib/hono';
import { postPath } from '@/server/post/routes';

export const postClient = buildClient<PostApiType>(postPath);
