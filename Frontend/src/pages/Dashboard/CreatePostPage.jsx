import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../services/api";

function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await createPost({ title, content });
      navigate("/dashboard"); // back to posts list
    } catch (err) {
      console.error(err);
      setError("Failed to create post");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h2>New Post</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <br />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post here..."
          required
        />
        <br />
        <button type="submit" disabled={submitting}>
          {submitting ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}

export default CreatePostPage;
