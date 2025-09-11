const API_BASE = "http://localhost:3000"; //backend url

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

export async function createComment(postID,comment,token = null) {

  const headers = { "Content-Type": "application/json" };
  if (token)
    { headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}/posts/${postID}/comments`, {
    method: "POST",
    headers,
    body: JSON.stringify({ body: comment }),
  });



  if (!res.ok) throw new Error("Failed to create comment");
  return res.json();


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

export async function createPost(data) {
  const res = await fetch(`${API_BASE}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create post");
  return res.json();
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
  const res = await fetch(`${API_BASE}/posts/${id}`, {
    method: "DELETE",
    headers: {
      ...authHeaders(),
    },
  });
  if (!res.ok) throw new Error("Failed to delete post");
  return res.json();
}
