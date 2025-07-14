import { useState } from "react";

export default function useAuth() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const login = (jwt) => {
    setToken(jwt);
    localStorage.setItem("token", jwt);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return { token, login, logout };
}
