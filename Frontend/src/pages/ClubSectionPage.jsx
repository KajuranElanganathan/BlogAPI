import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPosts } from "../services/api";
import { useAuth } from "../context/AuthContext";

function ClubSectionPage() {
  const { category } = useParams();
  const decodedCategory = decodeURIComponent(category);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    getPosts()
      .then((allPosts) => {
        // Filter posts by category on the frontend
        const filtered = allPosts.filter(
          (post) => post.category === decodedCategory
        );
        setPosts(filtered);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [decodedCategory]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading posts...</p>
      </div>
    );

  const isAuthorOrAdmin = user && (user.role === "ADMIN" || user.role === "AUTHOR");

  return (
    <div className="min-h-screen bg-white">
      {/* Section Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <Link
            to="/"
            className="inline-block mb-4 text-sm text-gray-500 hover:text-gray-900 transition"
          >
            ← Back to all posts
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif font-normal text-gray-900 mb-4 tracking-tight">
            {decodedCategory}
          </h1>
          <p className="text-lg text-gray-600 font-light">
            Posts from {decodedCategory}
          </p>
        </div>
      </header>

      {/* Posts Feed */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No posts available for {decodedCategory} yet.
            </p>
            {isAuthorOrAdmin && (
              <Link
                to="/dashboard/posts/create"
                className="inline-block mt-4 text-gray-900 hover:underline"
              >
                Create the first post
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-12">
            {posts.map((post) => (
              <article
                key={post.id}
                className="border-b border-gray-200 pb-12 last:border-b-0"
              >
                <h2 className="text-3xl md:text-4xl font-serif font-normal text-gray-900 mb-4 tracking-tight">
                  <Link
                    to={`/posts/${post.id}`}
                    className="hover:text-gray-600 transition"
                  >
                    {post.title}
                  </Link>
                </h2>
                <div className="prose prose-gray max-w-none mb-6">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {post.content.length > 300
                      ? post.content.slice(0, 300) + "..."
                      : post.content}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
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
                <Link
                  to={`/posts/${post.id}`}
                  className="inline-block mt-4 text-gray-900 font-medium hover:underline"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default ClubSectionPage;

