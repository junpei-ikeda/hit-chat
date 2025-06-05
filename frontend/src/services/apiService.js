export const apiService = {
  get: async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }
      return await response.json();
    } catch (error) {
      console.error("API GET Error:", error);
      throw new Error("An unexpected error occurred. Please try again later.");
    }
  },

  post: async (url, data) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to send data.");
      }
      return await response.json();
    } catch (error) {
      console.error("API POST Error:", error);
      throw new Error("An unexpected error occurred. Please try again later.");
    }
  },

  put: async (url, data) => {
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to send data.");
      }
      return await response.json();
    } catch (error) {
      console.error("API PUT Error:", error);
      throw new Error("An unexpected error occurred. Please try again later.");
    }
  },
};
