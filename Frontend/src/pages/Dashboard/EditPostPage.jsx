import { useEffect, useState } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, updatePost } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function EditPostPage() {
  const { id } = useParams(); // post id from URL
  const { token } = useAuth(); // get token
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getPostById(id, token)
      .then((post) => {
        setTitle(post.title);
        setContent(post.content);
      })
      .catch(() => setError("Failed to load post"))
      .finally(() => setLoading(false));
  }, [id, token]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await updatePost(id, { title, content }, token);
      navigate("/dashboard/home"); // back to posts list
    } catch (err) {
      console.error(err);
      setError("Failed to update post");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 animate-pulse">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 font-semibold">{error}</div>
    );

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Post</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <p className="text-red-600 font-medium">{error}</p>
        )}

        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
            required
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Update your post"
            required
            rows={8}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {submitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export default EditPostPage;
