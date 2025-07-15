import axios from "axios";
import { LoadingContext } from "../App";

const api = axios.create({
  baseURL: "http://localhost:8085/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Ajout d'un intercepteur pour inclure le token JWT dans chaque requête
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  // Déclenche le loader global si le contexte est accessible
  if (window.setGlobalLoading) window.setGlobalLoading(true);
  return config;
});

api.interceptors.response.use(
  (response) => {
    if (window.setGlobalLoading) window.setGlobalLoading(false);
    return response;
  },
  (error) => {
    if (window.setGlobalLoading) window.setGlobalLoading(false);
    // Toast global si aucune gestion locale
    if (!error.config?.skipGlobalErrorToast && window.showGlobalToast) {
      window.showGlobalToast(
        error.response?.data?.error ||
          error.response?.data ||
          "Erreur réseau ou serveur",
        "error"
      );
    }
    return Promise.reject(error);
  }
);

export default api;
