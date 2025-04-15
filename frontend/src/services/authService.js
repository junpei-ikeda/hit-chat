import { apiService } from "./apiService";

export const authService = {
  login: async (email, password) => {
    return apiService.post("/api/login", { email, password });
  },

  logout: () => {
    console.log("Logged out");
  },
};
