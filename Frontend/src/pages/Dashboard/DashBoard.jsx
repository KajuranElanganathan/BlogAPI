import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPosts, togglePublish, deletePost } from "../../services/api";

function DashboardHome() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      await togglePublish(id);
      refreshPosts();
    } catch (err) {
      console.error(err);
      alert("Failed to toggle publish");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await deletePost(id);
      refreshPosts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete post");
    }
  }

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500 animate-pulse">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10">

      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Your Posts</h2>
          <Link
            to="new"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            + New Post
          </Link>
        </div>

        <ul className="space-y-6">
          {posts.map((p) => (
            <li
              key={p.id}
              className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center hover:shadow-lg transition"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{p.title}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-gray-500 text-sm">{p.published ? "Published" : "Draft"}</p>
                  {p.category && (
                    <>
                      <span className="text-gray-300">•</span>
                      <span className="text-gray-500 text-sm">{p.category}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  to={`${p.id}/edit`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleTogglePublish(p.id)}
                  className="px-3 py-1 rounded-md text-white bg-green-600 hover:bg-green-700 transition"
                >
                  {p.published ? "Unpublish" : "Publish"}
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="px-3 py-1 rounded-md text-white bg-red-600 hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DashboardHome;
