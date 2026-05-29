import 'server-only';
import { headers } from 'next/headers';

export interface AdminPostDto {
    id: string;
    title: string;
    slug: string;
    summary: string;
    publishedAt: string | null;
    status: 'DRAFT' | 'PUBLISHED';
    createdAt: string;
    categoryId: string | null;
    category: {
        id: string;
        name: string;
    } | null;
    tags: Array<{
        id: string;
        name: string;
    }>;
}

export interface AdminPostDetailDto {
    id: string;
    title: string;
    slug: string;
    summary: string;
    content: string;
    cover: string | null;
    status: 'DRAFT' | 'PUBLISHED';
    categoryId: string | null;
    category: {
        id: string;
        name: string;
    } | null;
    tags: Array<{
        id: string;
        name: string;
    }>;
}

export interface AdminOptionDto {
    id: string;
    name: string;
    slug: string;
}

interface ApiSuccessResponse<T> {
    success: true;
    data: T;
}

interface ApiErrorResponse {
    success: false;
    message?: string;
}

type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

async function getApiBaseUrl() {
    const requestHeaders = await headers();
    const protocol = requestHeaders.get('x-forwarded-proto') ?? 'http';
    const host = requestHeaders.get('host');

    if (!host) {
        throw new Error('Missing host header');
    }

    return `${protocol}://${host}`;
}

async function fetchAdminApi<T>(path: string) {
    const baseUrl = await getApiBaseUrl();
    const response = await fetch(`${baseUrl}${path}`, {
        cache: 'no-store',
    });
    const payload = (await response.json()) as ApiResponse<T>;

    if (!payload.success) {
        throw new Error(payload.message ?? `Admin API request failed: ${response.status}`);
    }

    if (!response.ok) {
        throw new Error(`Admin API request failed: ${response.status}`);
    }

    return payload.data;
}

export async function getAdminPostsFromApi() {
    return fetchAdminApi<AdminPostDto[]>('/api/admin/posts');
}

export async function getAdminPostOptionsFromApi() {
    return fetchAdminApi<{
        categories: AdminOptionDto[];
        tags: AdminOptionDto[];
    }>('/api/admin/post-options');
}

export async function getAdminPostByIdFromApi(id: string) {
    return fetchAdminApi<AdminPostDetailDto>(`/api/admin/posts/${id}`);
}
