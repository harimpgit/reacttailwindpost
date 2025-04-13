import { useState, useEffect } from "react";
import { getPosts, Post } from "../services/api";

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await getPosts();
        setPosts(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch posts");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="text-center p-4">Loading posts...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Posts</h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-medium text-lg">{post.title}</h3>
            <p className="text-gray-600 mt-2">{post.body}</p>
            <div className="text-sm text-gray-500 mt-2">
              User ID: {post.userId}, Post ID: {post.id}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
