import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPosts, togglePublish, deletePost } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function DashBoard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    refreshPosts();
  }, []);

  async function refreshPosts() {
    try {
      setLoading(true);
      const data = await getAllPosts();
      setPosts(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  }

  async function handleTogglePublish(id) {
    try {
      await togglePublish(id, token);
      refreshPosts();
    } catch (err) {
      console.error(err);
      alert("Failed to toggle publish");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await deletePost(id, token);
      refreshPosts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete post");
    }
  }

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a]">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-white/20 border-t-white/60 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a]">
        <div className="p-6 rounded-xl bg-red-500/20 border border-red-500/30">
          <p className="text-red-300 font-semibold">{error}</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Your Posts
            </h2>
            <p className="text-white/60">Manage your posts and content</p>
          </div>
          <Link
            to="create"
            className="px-6 py-3 bg-white text-[#0a0a0a] rounded-lg font-semibold hover:bg-white/90 transition-all transform hover:scale-105"
          >
            + New Post
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
              <p className="text-white/60 text-lg mb-4">No posts yet.</p>
              <Link
                to="create"
                className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20"
              >
                Create your first post
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((p) => (
              <div
                key={p.id}
                className="p-6 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-white/50">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        p.published 
                          ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                          : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                      }`}>
                        {p.published ? "Published" : "Draft"}
                      </span>
                      {p.category && (
                        <>
                          <span className="text-white/30">•</span>
                          <span className="text-purple-400">{p.category}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 ml-6">
                    <Link
                      to={`edit/${p.id}`}
                      className="px-4 py-2 text-sm bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleTogglePublish(p.id)}
                      className={`px-4 py-2 text-sm rounded-lg transition-all border ${
                        p.published
                          ? "bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border-yellow-500/30"
                          : "bg-green-500/20 hover:bg-green-500/30 text-green-400 border-green-500/30"
                      }`}
                    >
                      {p.published ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="px-4 py-2 text-sm bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all border border-red-500/30"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DashBoard;
