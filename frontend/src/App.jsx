import React, { useState, createContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Routes from "./routes";
import Toast from "./components/Toast";

export const ToastContext = createContext();
export const AuthContext = createContext();
export const LoadingContext = createContext();

function App() {
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [loading, setLoading] = useState(false);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "success" }), 4000);
  };

  // AuthContext: récupère le rôle et l'id utilisateur depuis le localStorage
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  // Expose les fonctions globalement
  window.setGlobalLoading = setLoading;
  window.showGlobalToast = showToast;

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      <AuthContext.Provider value={{ role, userId }}>
        <ToastContext.Provider value={showToast}>
          <Router>
            <Navbar />
            {loading && (
              <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <div className="container mx-auto p-4">
              <Routes />
            </div>
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast({ message: "", type: "success" })}
            />
          </Router>
        </ToastContext.Provider>
      </AuthContext.Provider>
    </LoadingContext.Provider>
  );
}

export default App;
