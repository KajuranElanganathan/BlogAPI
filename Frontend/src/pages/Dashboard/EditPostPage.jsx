import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, updatePost } from "../../services/api";

function EditPostPage() {
  const { id } = useParams(); // post id from URL
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getPostById(id)
      .then((post) => {
        setTitle(post.title);
        setContent(post.content);
      })
      .catch(() => setError("Failed to load post"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await updatePost(id, { title, content });
      navigate("/dashboard"); // back to list
    } catch (err) {
      console.error(err);
      setError("Failed to update post");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h2>Edit Post</h2>
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
          placeholder="Update your post"
          required
        />
        <br />
        <button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export default EditPostPage;
