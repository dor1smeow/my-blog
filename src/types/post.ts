export interface Post {
  id: string
  title: string
  slug: string
  summary: string
  content: string
  cover?: string | null
  publishedAt: string
  tags: string[]
}
