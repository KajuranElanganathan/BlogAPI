import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../services/api";
import { createComment } from "../services/api";



function PostPage() {
  const { id } = useParams();
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

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found</p>;



async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);


  try {

    const newComment = await createComment(id, {body});
    setPost({ ...post, comments: [newComment, ...post.comments] });
    setBody("");

  } catch (err) {
    console.error(err); 
  } finally {
    setSubmitting(false);


  }


}


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

      <h3>Add a Comment</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your comment"
          required
        />
    
        <br />
        <button type="submit" disabled={submitting}>
          {submitting ? "Posting..." : "Post Comment"}
        </button>
      </form>
    </div>
  );
}


export default PostPage;
