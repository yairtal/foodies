const API_BASE_URL = "http://localhost:8081";

const headers = {
  "Content-Type": "application/json",
};

// Fetch a list of items with optional user filtering
export async function fetchItems(userId = null) {
  let url = `${`${API_BASE_URL}/items`}`;
  if (userId) {
    url += `?userId=${userId}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed with status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error.message);
  }
}

// Fetch all items without filtering
export async function fetchAllItems() {
  try {
    const response = await fetch(`${API_BASE_URL}/items/all`);
    if (!response.ok) {
      throw new Error(`Failed with status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error.message);
  }
}

// Fetch item details by ID
export async function fetchItemDetails(itemId) {
  try {
    const response = await fetch(`${API_BASE_URL}/items/${itemId}`);
    if (!response.ok) {
      throw new Error(`Failed with status: ${response.status}`);
    }
    const itemDetails = await response.json();
    return itemDetails;
  } catch (error) {
    console.error("Fetch error:", error.message);
  }
}

// Update allowed users for an item
export async function updateItemUsers(itemId, allowedUsers) {
  try {
    const response = await fetch(`${API_BASE_URL}/items/${itemId}`, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify({ allowedUsers }),
    });
    if (!response.ok) {
      throw new Error(`Failed with status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error.message);
  }
}

// Add item
export async function addItem(itemData) {
  try {
    const response = await fetch(`${API_BASE_URL}/items`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(itemData),
    });
    if (!response.ok) {
      throw new Error(`Failed with status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw error; // Rethrow the error to be handled by the calling function
  }
}
