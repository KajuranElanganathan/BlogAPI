import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../services/api";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const postsRef = useRef(null);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const raw =
          localStorage.getItem("user") ||
          localStorage.getItem("profile") ||
          localStorage.getItem("currentUser") ||
          null;

        if (raw) {
          try {
            const parsed = JSON.parse(raw);
            const role =
              parsed?.role ||
              (Array.isArray(parsed?.roles) ? parsed.roles[0] : parsed?.roles) ||
              parsed?.user?.role;
            if (role) setUserRole(role);
          } catch {
            if (
              raw === "ADMIN" ||
              raw === "AUTHOR" ||
              raw === "USER"
            )
              setUserRole(raw);
          }
        } else if (window.__USER__) {
          setUserRole(window.__USER__.role || null);
        }
      }
    } catch (err) {
      console.warn("Could not parse stored user:", err);
    }

    getPosts()
      .then(setPosts)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleStartReading = (e) => {
    e.preventDefault();
    if (postsRef.current) {
      postsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
        <p className="text-xl text-gray-500 animate-pulse font-semibold">
          Loading posts...
        </p>
      </div>
    );

  const isAuthorOrAdmin =
    userRole === "ADMIN" ||
    userRole === "AUTHOR";

  return (
    <div className="min-h-screen bg-gray-50 m-0 p-0">

  {/* Hero Section */}
  {/* Hero Section */}
<section
  className="relative h-screen -mt-20 flex flex-col justify-center items-center text-white"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-7xl font-extrabold mb-6 drop-shadow-lg leading-tight">
      Choose Your Path,<br />
      <span className="italic font-light">Find Your Insight</span>
    </h1>
    <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-md">
      Good things take time. Explore stories, tutorials, and journeys from our community.
    </p>
    <button
      onClick={handleStartReading}
      className="inline-block bg-white text-blue-600 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all"
    >
      Start Reading
    </button>
  </div>
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-200 text-sm opacity-80">
    [Some paths aren’t meant to be rushed]
  </div>
</section>



      {/* Posts Section - Always visible */}
      <section
        ref={postsRef}
        id="posts"
        className="max-w-6xl mx-auto px-6 py-20"
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Latest Blog Posts
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              <div className="p-6 flex-1 flex flex-col">
                <Link
                  to={`/posts/${post.id}`}
                  className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-4"
                >
                  {post.title}
                </Link>
                <p className="text-gray-600 mb-6 line-clamp-4">
                  {post.content.length > 150
                    ? post.content.slice(0, 150) + "..."
                    : post.content}
                </p>
                <div className="mt-auto flex items-center justify-between text-sm text-gray-500">
                  <span>By {post.author?.username || "Unknown"}</span>
                  <span>
                    {post.createdAt
                      ? new Date(post.createdAt).toLocaleDateString()
                      : ""}
                  </span>
                </div>
              </div>
              <div className="bg-gray-100 p-5 text-right">
                <Link
                  to={`/posts/${post.id}`}
                  className="text-blue-600 font-semibold hover:text-blue-800 hover:underline transition-colors"
                >
                  Read More &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider / Accent */}
      <div className="w-full flex justify-center items-center py-2">
        <span className="block w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-60"></span>
      </div>

      {/* CTA Section - Professional, minimal, dark gradient */}
      <section
        className="relative py-32 flex flex-col items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #18181b 60%, #23272f 100%)",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
        <div className="relative z-10 text-center px-6">
          <h2 className="text-5xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
            {isAuthorOrAdmin
              ? "Share Your Perspective."
              : "Want to Share Your Perspective?"}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed drop-shadow max-w-xl mx-auto">
            {isAuthorOrAdmin
              ? "Publish your own posts and inspire others with your journey, insights, and expertise."
              : (
                <>
                  You’ll be able to write posts once you have author access.<br />
                  <span className="text-gray-400">
                    Request author access from your dashboard.
                  </span>
                </>
              )
            }
          </p>
          {isAuthorOrAdmin && (
            <Link
              to="/dashboard/posts/create"
              className="inline-block bg-white text-gray-900 font-semibold text-lg px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition-all border border-white"
            >
              Write a Post
            </Link>
          )}
        </div>
        <div className="relative z-10 mt-8 flex items-center justify-center">
          <a
            href="#"
            className="inline-flex items-center gap-4 bg-gradient-to-r from-pink-600 to-violet-600 text-white px-6 py-3 rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition"
            aria-label="Try the Author beta version for a limited time"
            title="Try the Author beta version for a limited time"
          >
            <span className="inline-flex items-center px-2 py-1 bg-white/20 rounded-full text-sm font-medium tracking-wide">
              BETA
            </span>
            <span className="font-semibold">Try Author Version — Limited time</span>
            <span className="ml-2 text-xs bg-white/10 px-2 py-0.5 rounded-full">Free trial</span>
          </a>
        </div>
      </section>
    </div>
    
      
  );
}

export default HomePage;