// app/posts/page.tsx

import PostCard from '@/components/post/postCard';
import { posts } from '@/data/posts';

export default function PostsPage() {
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">我的文章列表</h1>
      <p className="text-gray-600 mb-8">
        这里是所有文章的集合，你可以通过筛选查看不同类别的文章。
      </p>

      <div className="flex mb-8">
        <button className="mr-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          全部
        </button>
        <button className="mr-4 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded">
          Next.js
        </button>
        <button className="mr-4 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded">
          React
        </button>
        <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded">
          TypeScript
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
