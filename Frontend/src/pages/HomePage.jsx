import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { getPosts } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useHome } from "../context/HomeContext";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPosts, setShowPosts] = useState(false);
  const { user } = useAuth();
  const { setScrollToTop } = useHome();
  const heroRef = useRef(null);
  const postsRef = useRef(null);

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleScrollToTop = useCallback(() => {
    setShowPosts(false);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }, []);

  // Listen for home click event as fallback
  useEffect(() => {
    const handleHomeClickEvent = () => {
      handleScrollToTop();
    };
    window.addEventListener('homeClick', handleHomeClickEvent);
    return () => window.removeEventListener('homeClick', handleHomeClickEvent);
  }, [handleScrollToTop]);

  useEffect(() => {
    if (setScrollToTop) {
      setScrollToTop(() => handleScrollToTop);
    }
    return () => {
      if (setScrollToTop) {
        setScrollToTop(null);
      }
    };
  }, [setScrollToTop, handleScrollToTop]);

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
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden font-['Inter',sans-serif]">
      {/* Moving Mesh / Bento-Style Background */}
      <div className="fixed inset-0 z-0">
        {/* Base dark canvas */}
        <div className="absolute inset-0 bg-slate-950"></div>
        
        {/* Animated blur orbs - moving mesh effect */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-indigo-500/15 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-violet-500/20 blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-3xl"
          animate={{
            x: [0, 120, 0],
            y: [0, 80, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-3/4 left-1/3 w-[450px] h-[450px] rounded-full bg-charcoal-500/12 blur-3xl"
          style={{ backgroundColor: 'rgba(30, 30, 30, 0.12)' }}
          animate={{
            x: [0, -100, 0],
            y: [0, -70, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-[550px] h-[550px] rounded-full bg-blue-500/8 blur-3xl"
          animate={{
            x: [0, 90, 0],
            y: [0, -90, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Subtle noise texture */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        ></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {!showPosts ? (
            // Hero Section - Asymmetrical Layout
            <motion.section
              key="hero"
              ref={heroRef}
              initial={{ opacity: 1 }}
              exit={{ 
                opacity: 0,
                y: -100,
                transition: { 
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }
              }}
              className="min-h-screen flex items-center px-6 relative"
            >
              {/* Asymmetrical Layout - Content on Left */}
              <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Side - Text Content */}
                <div className="lg:pl-12 overflow-visible">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    className="text-7xl md:text-8xl lg:text-[10rem] font-black mb-8 leading-none tracking-tighter overflow-visible"
                    style={{
                      background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 30%, #c7d2fe 60%, #a5b4fc 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      overflow: 'visible',
                      wordBreak: 'keep-all',
                      whiteSpace: 'nowrap',
                      display: 'inline-block',
                      width: 'auto',
                      maxWidth: 'none',
                    }}
                  >
                    MacBlog
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
                    className="text-xl md:text-2xl text-white/60 mb-12 leading-relaxed max-w-xl"
                  >
                    A centralized platform where student-run organizations share events, updates, and stories with the campus community.
                  </motion.p>

                  {/* CTA Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    onClick={() => {
                      setShowPosts(true);
                      setTimeout(() => {
                        postsRef.current?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="group relative px-12 py-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white text-lg font-semibold hover:bg-white/20 transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Show Posts
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.button>
                </div>

                {/* Right Side - Abstract 3D Asset (Partially Off-Screen) */}
                <div className="hidden lg:block relative h-[600px]">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: 100 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px]"
                  >
                    {/* Abstract Glass Sphere / Digital Wave */}
                    <div className="relative w-full h-full">
                      {/* Outer glow */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-indigo-500/20 blur-3xl"></div>
                      {/* Glass sphere */}
                      <div 
                        className="absolute inset-0 rounded-full backdrop-blur-2xl border border-white/10"
                        style={{
                          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                          boxShadow: 'inset 0 0 100px rgba(139, 92, 246, 0.1), 0 0 100px rgba(99, 102, 241, 0.2)',
                        }}
                      ></div>
                      {/* Inner highlights */}
                      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>
                      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-blue-400/20 blur-xl"></div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.section>
          ) : (
            // Posts Grid Section
            <motion.section
              key="posts"
              ref={postsRef}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
              className="min-h-screen pt-32 pb-32 px-6"
            >
              <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  onClick={handleScrollToTop}
                  className="mb-12 flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Home
                </motion.button>

                {/* Masonry Grid */}
                {posts.length > 0 ? (
                  <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
                    {posts.map((post, index) => (
                      <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          type: "spring",
                          stiffness: 100,
                          damping: 15,
                          delay: index * 0.08,
                        }}
                        className="break-inside-avoid mb-6"
                      >
                        <Link
                          to={`/posts/${post.id}`}
                          className="group relative block p-6 rounded-2xl bg-white/[0.02] backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02]"
                          style={{
                            backdropFilter: 'blur(16px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                            boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05), 0 20px 40px -10px rgba(0, 0, 0, 0.3)',
                          }}
                        >
                          {/* Inner shadow for thick glass effect */}
                          <div 
                            className="absolute inset-0 rounded-2xl pointer-events-none"
                            style={{
                              boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.2)',
                            }}
                          ></div>
                          
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
                      className="inline-block p-8 rounded-2xl bg-white/[0.02] backdrop-blur-md border border-white/10"
                      style={{
                        backdropFilter: 'blur(16px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                        boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
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

        {/* Footer - Low Opacity */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="fixed bottom-0 left-0 right-0 border-t border-white/[0.05] bg-black/10 backdrop-blur-sm z-20"
        >
          <div className="max-w-7xl mx-auto px-6 py-3">
            <p className="text-center text-white/[0.25] text-xs font-light">
              For McMaster Club purposes/interest, please contact{" "}
              <a 
                href="mailto:Kajuran65@gmail.com" 
                className="text-white/[0.35] hover:text-white/[0.5] underline transition-colors"
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
