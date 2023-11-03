const API_BASE_URL = "http://localhost:8081";

export async function fetchUsers() {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) {
    throw new Error(`Failed to fetch users with status: ${response.status}`);
  }
  return await response.json();
}
