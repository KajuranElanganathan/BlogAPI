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
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a]">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-white/20 border-t-white/60 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Loading posts...</p>
        </div>
      </div>
    );

  const isAuthorOrAdmin = user && (user.role === "ADMIN" || user.role === "AUTHOR");

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Section Header */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center mb-6 text-white/60 hover:text-white transition-colors group"
          >
            <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
            Back to all posts
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            {decodedCategory}
          </h1>
          <p className="text-xl text-white/70">
            Posts from {decodedCategory}
          </p>
        </div>
      </section>

      {/* Posts Feed */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
              <p className="text-white/60 text-lg mb-4">
                No posts available for {decodedCategory} yet.
              </p>
              {isAuthorOrAdmin && (
                <Link
                  to="/dashboard/posts/create"
                  className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20"
                >
                  Create the first post
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all hover:transform hover:scale-[1.02]"
              >
                <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors">
                  <Link to={`/posts/${post.id}`}>
                    {post.title}
                  </Link>
                </h2>
                <p className="text-white/60 mb-4 line-clamp-3 leading-relaxed">
                  {post.content.length > 150
                    ? post.content.slice(0, 150) + "..."
                    : post.content}
                </p>
                <div className="flex items-center justify-between text-sm text-white/40 mb-4">
                  <span>{post.author?.username || "Unknown"}</span>
                  <time>
                    {post.createdAt
                      ? new Date(post.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                      : ""}
                  </time>
                </div>
                <Link
                  to={`/posts/${post.id}`}
                  className="inline-flex items-center text-white/70 hover:text-white transition-colors group/link"
                >
                  Read more
                  <span className="ml-2 group-hover/link:translate-x-1 transition-transform">→</span>
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
