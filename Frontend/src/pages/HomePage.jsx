import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../services/api";
import { useAuth } from "../context/AuthContext";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Extract unique categories from posts
  const categories = [...new Set(posts.map(p => p.category).filter(Boolean))];
  const featuredPosts = posts.slice(0, 3);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a]">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-white/20 border-t-white/60 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    );

  const isAuthorOrAdmin = user && (user.role === "ADMIN" || user.role === "AUTHOR");

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Complex Atmospheric Background */}
      <div className="fixed inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a0f2e] to-[#0a0a0a]"></div>
        
        {/* Volumetric lighting layers */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(120,119,198,0.4),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(139,69,19,0.15),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.2),transparent_70%)]"></div>
        
        {/* Animated mesh gradient overlay */}
        <div className="absolute inset-0 opacity-30" style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(120,119,198,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139,69,19,0.08) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(79,70,229,0.1) 0%, transparent 50%)',
        }}></div>
        
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-6 py-32">
          <div className="max-w-7xl mx-auto w-full">
            {/* Main Hero Content */}
            <div className="max-w-4xl mx-auto text-center mb-20">
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight">
                <span className="block bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  McMaster
                </span>
                <span className="block bg-gradient-to-r from-purple-300 via-white to-purple-200 bg-clip-text text-transparent mt-2">
                  Student Hub
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
                A centralized platform where student-run organizations share events, updates, and stories with the campus community.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/"
                  className="group relative px-8 py-4 bg-white text-[#0a0a0a] rounded-lg font-semibold hover:bg-white/90 transition-all transform hover:scale-105 overflow-hidden"
                >
                  <span className="relative z-10">Explore Events</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-blue-200 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </Link>
                {!user && (
                  <Link
                    to="/user/register"
                    className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-lg font-semibold hover:bg-white/20 transition-all transform hover:scale-105"
                  >
                    Register Your Club
                  </Link>
                )}
                {isAuthorOrAdmin && (
                  <Link
                    to="/dashboard/posts/create"
                    className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-lg font-semibold hover:bg-white/20 transition-all transform hover:scale-105"
                  >
                    Create Post
                  </Link>
                )}
              </div>
            </div>

            {/* Feature Showcase Cards */}
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-32">
              {featuredPosts.length > 0 ? (
                featuredPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/posts/${post.id}`}
                    className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10"
                  >
                    {/* Card glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:via-purple-500/5 group-hover:to-blue-500/10 transition-all opacity-0 group-hover:opacity-100"></div>
                    
                    <div className="relative z-10">
                      {post.category && (
                        <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-semibold text-purple-400 bg-purple-500/20 border border-purple-500/30">
                          {post.category}
                        </span>
                      )}
                      <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-white/60 mb-6 line-clamp-3 leading-relaxed">
                        {post.content.length > 120
                          ? post.content.slice(0, 120) + "..."
                          : post.content}
                      </p>
                      <div className="flex items-center justify-between text-sm text-white/40">
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
                    </div>
                  </Link>
                ))
              ) : (
                // Placeholder cards when no posts
                <>
                  <div className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:to-blue-500/10 transition-all opacity-0 group-hover:opacity-100"></div>
                    <div className="relative z-10">
                      <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-semibold text-purple-400 bg-purple-500/20 border border-purple-500/30">
                        Engineering
                      </span>
                      <h3 className="text-2xl font-bold mb-3 text-white">Engineering Mixer</h3>
                      <p className="text-white/60 mb-6 line-clamp-3 leading-relaxed">
                        Join us for an evening of networking and innovation. Connect with fellow engineers and industry professionals.
                      </p>
                      <div className="flex items-center justify-between text-sm text-white/40">
                        <span>Nov 12</span>
                        <span>6:00 PM</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:to-blue-500/10 transition-all opacity-0 group-hover:opacity-100"></div>
                    <div className="relative z-10">
                      <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-semibold text-blue-400 bg-blue-500/20 border border-blue-500/30">
                        Debate Club
                      </span>
                      <h3 className="text-2xl font-bold mb-3 text-white">Debate Club Finals</h3>
                      <p className="text-white/60 mb-6 line-clamp-3 leading-relaxed">
                        Watch the final round of our annual debate championship. Topics range from policy to philosophy.
                      </p>
                      <div className="flex items-center justify-between text-sm text-white/40">
                        <span>Nov 15</span>
                        <span>7:00 PM</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:to-blue-500/10 transition-all opacity-0 group-hover:opacity-100"></div>
                    <div className="relative z-10">
                      <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-semibold text-purple-400 bg-purple-500/20 border border-purple-500/30">
                        Cultural
                      </span>
                      <h3 className="text-2xl font-bold mb-3 text-white">Cultural Festival</h3>
                      <p className="text-white/60 mb-6 line-clamp-3 leading-relaxed">
                        Celebrate diversity with food, music, and performances from around the world. All students welcome.
                      </p>
                      <div className="flex items-center justify-between text-sm text-white/40">
                        <span>Nov 20</span>
                        <span>12:00 PM</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Category Navigation - Sticky */}
        {categories.length > 0 && (
          <nav className="sticky top-0 z-40 backdrop-blur-xl bg-black/30 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  to="/"
                  className="px-5 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all backdrop-blur-sm border border-white/0 hover:border-white/20"
                >
                  All Posts
                </Link>
                {categories.map((category) => (
                  <Link
                    key={category}
                    to={`/clubs/${encodeURIComponent(category)}`}
                    className="px-5 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all backdrop-blur-sm border border-white/0 hover:border-white/20"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        )}

        {/* Posts Feed Section */}
        {posts.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 py-20">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all hover:transform hover:scale-[1.02]"
                >
                  {post.category && (
                    <Link
                      to={`/clubs/${encodeURIComponent(post.category)}`}
                      className="inline-block mb-3 text-xs font-semibold text-purple-400 uppercase tracking-wider"
                    >
                      {post.category}
                    </Link>
                  )}
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
          </section>
        )}

        {/* Footer */}
        <footer className="border-t border-white/10 bg-black/20 backdrop-blur-xl mt-20">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <p className="text-center text-white/50 text-sm">
              For McMaster Club purposes/interest, please contact{" "}
              <a 
                href="mailto:Kajuran65@gmail.com" 
                className="text-purple-400 hover:text-purple-300 underline transition-colors"
              >
                Kajuran65@gmail.com
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default HomePage;
