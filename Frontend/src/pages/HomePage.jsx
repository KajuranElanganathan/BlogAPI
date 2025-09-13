import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../services/api";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
        <p className="text-xl text-gray-500 animate-pulse font-semibold">
          Loading posts...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-32 px-6 text-center">
        <h1 className="text-6xl font-extrabold mb-6 drop-shadow-lg">
          Explore the Latest Insights
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto drop-shadow-md">
          Dive into our curated blog posts and stay ahead with tech trends,
          tutorials, and updates from the industry.
        </p>
        <Link
          to="#posts"
          className="inline-block bg-white text-blue-600 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all"
        >
          Browse Posts
        </Link>
      </section>

      {/* Posts Section */}
      <section id="posts" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Latest Blog Posts
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col"
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
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
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

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-24 text-center text-white">
        <h3 className="text-3xl font-bold mb-4 drop-shadow-lg">
          Want to share your own story?
        </h3>
        <p className="mb-6 max-w-xl mx-auto drop-shadow-md">
          Join our community of authors and publish your own posts in minutes.
        </p>
        <Link
          to="/dashboard/posts/create"
          className="inline-block bg-white text-purple-600 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all"
        >
          Create a Post
        </Link>
      </section>
    </div>
  );
}

export default HomePage;
