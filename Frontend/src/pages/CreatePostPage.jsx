import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function CreatePostPage() {
  const { token, user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("You must be logged in to create a post");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await createPost({ title, content }, token);
      navigate("/dashboard"); // redirect to dashboard home
    } catch (err) {
      console.error("Error creating post:", err);
      setError("Failed to create post. Make sure you have permission.");
    } finally {
      setLoading(false);
    }
  };

  // Optional: check if user is allowed to create posts
  if (!user || (user.role !== "ADMIN" && user.role !== "AUTHOR")) {
    return <p>You do not have permission to create posts.</p>;
  }

  return (
    <div>
      <h3>Create a New Post</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}

export default CreatePostPage;
