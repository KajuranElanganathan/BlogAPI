import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );

  if (!post)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-700">Post not found</p>
      </div>
    );

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user || !token) return;
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
    <div className="min-h-screen bg-white">
      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Navigation */}
        <Link
          to={post.category ? `/clubs/${encodeURIComponent(post.category)}` : "/"}
          className="inline-block mb-8 text-sm text-gray-500 hover:text-gray-900 transition"
        >
          ← Back
        </Link>

        {/* Category */}
        {post.category && (
          <Link
            to={`/clubs/${encodeURIComponent(post.category)}`}
            className="inline-block mb-6 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-900 transition"
          >
            {post.category}
          </Link>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-serif font-normal text-gray-900 mb-6 tracking-tight leading-tight">
          {post.title}
        </h1>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-12 pb-8 border-b border-gray-200">
          <span>{post.author?.username || "Unknown"}</span>
          <span>•</span>
          <time>
            {post.createdAt
              ? new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : ""}
          </time>
        </div>

        {/* Content */}
        <div className="prose prose-lg prose-gray max-w-none mb-16">
          <div className="whitespace-pre-wrap text-gray-800 leading-relaxed text-lg">
            {post.content}
          </div>
        </div>

        {/* Comments Section */}
        <section className="border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-serif font-normal text-gray-900 mb-8">
            Comments
          </h2>

          {post.comments && post.comments.length > 0 ? (
            <ul className="space-y-8 mb-12">
              {post.comments.map((c) => (
                <li key={c.id} className="border-l-2 border-gray-200 pl-6">
                  <p className="text-gray-700 leading-relaxed mb-3">{c.body}</p>
                  <div className="text-sm text-gray-500">
                    {c.author ? (
                      <span>{c.author.username}</span>
                    ) : (
                      <span>{c.guestName || "Guest"}</span>
                    )}
                    <span className="mx-2">•</span>
                    <time>
                      {c.createdAt
                        ? new Date(c.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : ""}
                    </time>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mb-12">No comments yet.</p>
          )}

          {/* Comment Form */}
          {user ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Add a comment
                </label>
                <textarea
                  id="comment"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Write your comment..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className={`px-6 py-2 text-sm font-medium transition ${
                  submitting
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                {submitting ? "Posting..." : "Post Comment"}
              </button>
            </form>
          ) : (
            <p className="text-gray-500 text-sm">
              <Link to="/user/login" className="hover:underline">
                Sign in
              </Link>{" "}
              to leave a comment.
            </p>
          )}
        </section>
      </article>
    </div>
  );
}

export default PostPage;
