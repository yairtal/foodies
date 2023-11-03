const API_BASE_URL = "http://localhost:8081";

export async function signup(phoneNumber) {
  const response = await fetch(`${API_BASE_URL}/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phoneNumber }),
  });

  if (!response.ok) {
    throw new Error("Failed to sign up or log in");
  }

  return await response.json();
}
