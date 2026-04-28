import Link from "next/link";
import Image from "next/image";

import type { Post } from "@/types/post";

const PostCard: React.FC<{ post?: Post }> = ({ post }) => {
  // 如果没有提供 post，使用默认数据
  const defaultPost: Post = {
    id: "1",
    title: "示例文章",
    slug: "example-post",
    summary: "这是示例文章的摘要内容。",
    content: "这是文章的完整内容。",
    cover: "/covers/default.jpg",
    publishedAt: "2026-01-01",
    tags: ["示例", "博客"]
  };

  const currentPost = post || defaultPost;
  const { title, slug, summary, tags, publishedAt, cover } = currentPost;

  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
   
        <Image
          src={cover}
          alt={title}
          width={960}
          height={540}
          className="h-52 w-full object-cover"
        />

        <div className="space-y-4 p-5">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-500">{publishedAt}</p>
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <p className="text-sm leading-6 text-gray-600">{summary}</p>
          </div>

          <Link href={`/posts/${slug}`} className="block">
            <span className="inline-flex text-sm font-medium text-gray-600">
              阅读全文
            </span>
          </Link>
          
        </div>
      
    </article>
  );
};

export default PostCard;
