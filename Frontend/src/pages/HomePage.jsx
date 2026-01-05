import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getPosts } from "../services/api";
import { useAuth } from "../context/AuthContext";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPosts, setShowPosts] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-white/20 border-t-white/60 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Atmospheric Background with Mesh Gradient & Noise */}
      <div className="fixed inset-0 z-0">
        {/* Base dark canvas */}
        <div className="absolute inset-0 bg-slate-950"></div>
        
        {/* Noise texture overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        ></div>
        
        {/* Volumetric glow spots - ambient lighting */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-500/15 blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl"></div>
        
        {/* Mesh gradient overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 30% 40%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 70% 60%, rgba(59, 130, 246, 0.12) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 70%)
            `,
          }}
        ></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {!showPosts ? (
            // Hero Section
            <motion.section
              key="hero"
              initial={{ opacity: 1 }}
              exit={{ 
                opacity: 0,
                y: -100,
                transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
              }}
              className="min-h-screen flex items-center justify-center px-6"
            >
              <div className="max-w-5xl mx-auto text-center">
                {/* Main Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                  className="text-8xl md:text-9xl lg:text-[12rem] font-black mb-8 leading-none tracking-tight"
                >
                  <span className="block bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                    MacBlog
                  </span>
                </motion.h1>

                {/* CTA Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  onClick={() => setShowPosts(true)}
                  className="group relative px-12 py-5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white text-lg font-semibold hover:bg-white/20 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10">Show Posts</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.button>
              </div>
            </motion.section>
          ) : (
            // Posts Grid Section
            <motion.section
              key="posts"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="min-h-screen pt-32 pb-20 px-6"
            >
              <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => setShowPosts(false)}
                  className="mb-12 flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
                >
                  <span className="group-hover:-translate-x-1 transition-transform">←</span>
                  Back to Home
                </motion.button>

                {/* Masonry Grid */}
                {posts.length > 0 ? (
                  <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {posts.map((post, index) => (
                      <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.6, 
                          delay: index * 0.1,
                          ease: [0.4, 0, 0.2, 1]
                        }}
                        className="break-inside-avoid mb-6"
                      >
                        <Link
                          to={`/posts/${post.id}`}
                          className="group relative block p-6 rounded-2xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10"
                          style={{
                            backdropFilter: 'blur(20px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                          }}
                        >
                          {/* Card Glow Effect */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:via-purple-500/5 group-hover:to-blue-500/10 transition-all opacity-0 group-hover:opacity-100"></div>
                          
                          <div className="relative z-10">
                            {post.category && (
                              <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-semibold text-purple-400 bg-purple-500/20 border border-purple-500/30">
                                {post.category}
                              </span>
                            )}
                            <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors line-clamp-2">
                              {post.title}
                            </h2>
                            <p className="text-white/60 mb-6 line-clamp-4 leading-relaxed">
                              {post.content}
                            </p>
                            <div className="flex items-center justify-between text-sm text-white/40 pt-4 border-t border-white/10">
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
                      </motion.article>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center py-20"
                  >
                    <div 
                      className="inline-block p-8 rounded-2xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08]"
                      style={{
                        backdropFilter: 'blur(20px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                      }}
                    >
                      <p className="text-white/60 text-lg mb-4">No posts available yet.</p>
                      {user && (user.role === "ADMIN" || user.role === "AUTHOR") && (
                        <Link
                          to="/dashboard/posts/create"
                          className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20 backdrop-blur-sm"
                        >
                          Create the first post
                        </Link>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-black/20 backdrop-blur-xl z-20"
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            <p className="text-center text-white/50 text-xs">
              For McMaster Club purposes/interest, please contact{" "}
              <a 
                href="mailto:Kajuran65@gmail.com" 
                className="text-purple-400 hover:text-purple-300 underline transition-colors"
              >
                Kajuran65@gmail.com
              </a>
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}

export default HomePage;
