const API_BASE = import.meta.env.VITE_API_URL;

export async function getPosts() {
  const res = await fetch(`${API_BASE}/posts`);
  if (!res.ok) throw new Error("Failed to get posts");
  return res.json();
}

export async function getPostById(id) {
  const res = await fetch(`${API_BASE}/posts/${id}`, {
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
  });
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}

export async function createComment(postId, comment, token) {
  try {
    const res = await fetch(`${API_BASE}/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
      },
      body: JSON.stringify(comment),
    });

    if (!res.ok) throw new Error("Failed to create comment");
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function loginUser(credentials) {
  const res = await fetch(`${API_BASE}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) throw new Error("Login failed");

  return res.json(); 
}

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getAllPosts() {
  const res = await fetch(`${API_BASE}/admin/posts`, {
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
  });
  if (!res.ok) throw new Error("Failed to load posts");
  return res.json();
}

export async function createPost({ title, content }, token) {
  try {
    const res = await fetch(`${API_BASE}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content }),
    });

    if (!res.ok) throw new Error("Failed to create post");
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function updatePost(id, data) {
  const res = await fetch(`${API_BASE}/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update post");
  return res.json();
}

export async function togglePublish(id) {
  const res = await fetch(`${API_BASE}/posts/${id}/publish`, {
    method: "PATCH",
    headers: {
      ...authHeaders(),
    },
  });
  if (!res.ok) throw new Error("Failed to toggle publish");
  return res.json();
}

export async function deletePost(id) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to delete post");
  return res.json();
}

export async function registerUser({ name, email, password }) {
  try {
    const res = await fetch(`${API_BASE}/user/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) throw new Error("Registration failed");
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}
