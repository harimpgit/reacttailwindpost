import { useState, FormEvent, ChangeEvent } from "react";
import { createPost, Post } from "../services/api";

interface PostFormProps {
  onPostCreated?: (post: Post) => void;
}

const PostForm = ({ onPostCreated }: PostFormProps) => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [userId, setUserId] = useState<number>(1);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      setError("Title and body are required");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const response = await createPost({
        title,
        body,
        userId: Number(userId),
      });

      console.log("New post created:", response.data);

      // Reset form
      setTitle("");
      setBody("");
      setUserId(1);

      // Notify parent component
      if (onPostCreated) {
        onPostCreated(response.data);
      }
    } catch (err) {
      setError("Failed to create post");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create New Post</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="userId">
            User ID
          </label>
          <input
            type="number"
            id="userId"
            value={userId}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUserId(parseInt(e.target.value))
            }
            className="w-full px-3 py-2 border rounded"
            min="1"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="body">
            Body
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setBody(e.target.value)
            }
            className="w-full px-3 py-2 border rounded"
            rows={4}
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {submitting ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
