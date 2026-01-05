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
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a]">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-white/20 border-t-white/60 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    );

  if (!post)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a]">
        <p className="text-xl text-white/60">Post not found</p>
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
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <article className="max-w-4xl mx-auto px-6 py-16">
        {/* Navigation */}
        <Link
          to={post.category ? `/clubs/${encodeURIComponent(post.category)}` : "/"}
          className="inline-flex items-center mb-8 text-white/60 hover:text-white transition-colors group"
        >
          <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
          Back
        </Link>

        {/* Category */}
        {post.category && (
          <Link
            to={`/clubs/${encodeURIComponent(post.category)}`}
            className="inline-block mb-6 px-4 py-2 rounded-lg bg-purple-500/20 text-purple-300 text-sm font-semibold hover:bg-purple-500/30 transition-all"
          >
            {post.category}
          </Link>
        )}

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent leading-tight">
          {post.title}
        </h1>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-sm text-white/50 mb-12 pb-8 border-b border-white/10">
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
        <div className="prose prose-invert prose-lg max-w-none mb-16">
          <div className="whitespace-pre-wrap text-white/80 leading-relaxed text-lg">
            {post.content}
          </div>
        </div>

        {/* Comments Section */}
        <section className="border-t border-white/10 pt-12">
          <h2 className="text-3xl font-bold mb-8">Comments</h2>

          {post.comments && post.comments.length > 0 ? (
            <ul className="space-y-6 mb-12">
              {post.comments.map((c) => (
                <li key={c.id} className="p-6 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
                  <p className="text-white/80 leading-relaxed mb-3">{c.body}</p>
                  <div className="text-sm text-white/40">
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
            <p className="text-white/50 mb-12">No comments yet.</p>
          )}

          {/* Comment Form */}
          {user ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-white/70 mb-2"
                >
                  Add a comment
                </label>
                <textarea
                  id="comment"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Write your comment..."
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-white placeholder-white/30 resize-none backdrop-blur-xl"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  submitting
                    ? "bg-white/10 text-white/50 cursor-not-allowed"
                    : "bg-white text-[#0a0a0a] hover:bg-white/90 transform hover:scale-105"
                }`}
              >
                {submitting ? "Posting..." : "Post Comment"}
              </button>
            </form>
          ) : (
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
              <p className="text-white/60 text-sm">
                <Link to="/user/login" className="text-purple-400 hover:text-purple-300 underline">
                  Sign in
                </Link>{" "}
                to leave a comment.
              </p>
            </div>
          )}
        </section>
      </article>
    </div>
  );
}

export default PostPage;
