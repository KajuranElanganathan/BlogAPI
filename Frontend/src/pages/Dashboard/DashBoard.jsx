import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPosts } from "../../services/api";

function DashboardHome() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPosts()
      .then(setPosts)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Your Posts</h2>
      <Link to="new">+ New Post</Link>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>
            {p.title} {p.published ? "(Published)" : "(Draft)"}
            {" - "}
            <Link to={`${p.id}/edit`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DashboardHome;
