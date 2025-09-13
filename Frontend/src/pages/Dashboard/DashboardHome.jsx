import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPosts, togglePublish, deletePost } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function DashboardHome() {
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
      await deletePost(id, token); // pass token
      refreshPosts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete post: " + err.message);
    }
  }


  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Your Posts</h2>
      <Link to="posts/create">+ New Post</Link>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>
            <strong>{p.title}</strong>{" "}
            {p.published ? "(Published)" : "(Draft)"}
            {" - "}
            <Link to={`posts/edit/${p.id}`}>Edit</Link>
            <button onClick={() => handleTogglePublish(p.id)}>
              {p.published ? "Unpublish" : "Publish"}
            </button>{" "}
            <button onClick={() => handleDelete(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DashboardHome;
