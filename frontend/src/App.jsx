import React, { useState, createContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Routes from "./routes";
import Toast from "./components/Toast";

export const ToastContext = createContext();
export const AuthContext = createContext();

function App() {
  const [toast, setToast] = useState({ message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "success" }), 4000);
  };

  // AuthContext: récupère le rôle et l'id utilisateur depuis le localStorage
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  return (
    <AuthContext.Provider value={{ role, userId }}>
      <ToastContext.Provider value={showToast}>
        <Router>
          <Navbar />
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
  );
}

export default App;
