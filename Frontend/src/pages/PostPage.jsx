import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../services/api";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPostById(id)
      .then(setPost)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      <h2>Comments</h2>
      <ul>
        {post.comments.map((c) => (
          <li key={c.id}>{c.body}</li>
        ))}
      </ul>
    </div>
  );
}

export default PostPage;
