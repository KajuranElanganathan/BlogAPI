import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById, createComment } from "../services/api";
import { useAuth } from "../context/AuthContext";

function PostPage() {
  const { id } = useParams();
  const { token, user } = useAuth(); 
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getPostById(id)
      .then(setPost)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg text-gray-500 animate-pulse">Loading...</p>
    </div>
  );

  if (!post) return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-xl text-red-500">Post not found</p>
    </div>
  );

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const newComment = await createComment(id, { body }, token);
      setPost({ ...post, comments: [newComment, ...post.comments] });
      setBody("");
    } catch (err) {
      console.error(err);
      alert("Failed to create comment");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
        <p className="text-gray-700 mb-6">{post.content}</p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h2>
        <ul className="space-y-4 mb-6">
          {post.comments.length > 0 ? (
            post.comments.map((c) => (
              <li
                key={c.id}
                className="border rounded-md p-3 bg-gray-50 text-gray-700"
              >
                {c.body}
                {c.author && (
                  <span className="block mt-1 text-sm text-gray-500">
                    — {c.author.username}
                  </span>
                )}
              </li>
            ))
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </ul>

        {user && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Add a Comment</h3>
            <form onSubmit={handleSubmit}>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write your comment..."
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
                required
              />
              <button
                type="submit"
                disabled={submitting}
                className={`px-6 py-2 rounded-md text-white font-semibold ${
                  submitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                } transition`}
              >
                {submitting ? "Posting..." : "Post Comment"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostPage;
