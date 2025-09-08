const API_BASE = "http://localhost:3000"; //backend url

export async function getPosts() {
  const res = await fetch(`${API_BASE}/posts`);
  if (!res.ok) throw new Error("Failed to get posts");
  return res.json();
}

export async function getPostById(id) {
  const res = await fetch(`${API_BASE}/posts/${id}`);
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